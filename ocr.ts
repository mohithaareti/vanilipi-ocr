import type { ProcessingStage } from '@/data/samples';

export type ProgressCallback = (stage: ProcessingStage, progress: number) => void;

export type ExtractionResult = {
  text: string;
  wordCount: number;
  pageCount: number;
  confidence: number;
};

function getImageData(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

async function extractFromImage(file: File, onProgress: ProgressCallback): Promise<ExtractionResult> {
  onProgress('preprocessing', 0.1);
  const img = await getImageData(file);
  onProgress('preprocessing', 0.5);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  // Upscale small images for better OCR
  const maxDim = 2000;
  let { width, height } = img;
  if (width < 1000 || height < 1000) {
    const scale = Math.min(maxDim / width, maxDim / height, 3);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  } else if (width > maxDim || height > maxDim) {
    const scale = Math.min(maxDim / width, maxDim / height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  onProgress('preprocessing', 0.9);

  // Get image data for contrast enhancement
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Simple contrast enhancement: grayscale + threshold
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    const enhanced = gray < 128 ? Math.max(0, gray - 30) : Math.min(255, gray + 30);
    data[i] = data[i + 1] = data[i + 2] = enhanced;
  }
  ctx.putImageData(imageData, 0, 0);

  onProgress('ocr', 0);

  // Dynamic import to avoid loading Tesseract until needed
  const { createWorker } = await import('tesseract.js');
  const worker = await createWorker('eng', 1, {
    logger: (m: { status: string; progress: number }) => {
      if (m.status === 'recognizing text') {
        onProgress('ocr', m.progress);
      }
    },
  });

  const {
    data: { text, confidence },
  } = await worker.recognize(canvas);
  await worker.terminate();

  onProgress('post-processing', 1);

  const cleanedText = text
    .replace(/\n{4,}/g, '\n\n\n')
    .replace(/[ \t]+$/gm, '')
    .trim();

  return {
    text: cleanedText,
    wordCount: cleanedText.split(/\s+/).filter(Boolean).length,
    pageCount: 1,
    confidence: Math.round(confidence),
  };
}

async function extractFromPDF(file: File, onProgress: ProgressCallback): Promise<ExtractionResult> {
  onProgress('preprocessing', 0.1);

  const dataURL = await fileToDataURL(file);
  const base64Data = dataURL.split(',')[1];
  const binaryString = atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  onProgress('preprocessing', 0.5);

  const pdfjs = await import('pdfjs-dist');
  const workerSrcModule = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrcModule.default;

  const loadingTask = pdfjs.getDocument({ data: bytes });
  const pdf = await loadingTask.promise;

  onProgress('preprocessing', 0.9);

  const numPages = pdf.numPages;
  const allText: string[] = [];
  let totalConfidence = 0;

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    onProgress('ocr', (pageNum - 1) / numPages);

    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();

    const pageText = textContent.items
      .map((item) => {
        if ('str' in item) return item.str;
        return '';
      })
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (pageText) {
      allText.push(`--- Page ${pageNum} ---\n${pageText}`);
      totalConfidence += 100; // PDF text layer is exact, no OCR needed
    } else {
      // No text layer — need to render page and OCR it
      onProgress('ocr', (pageNum - 0.5) / numPages);

      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvas, canvasContext: ctx, viewport }).promise;

      const { createWorker } = await import('tesseract.js');
      const worker = await createWorker('eng', 1, {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === 'recognizing text') {
            onProgress('ocr', (pageNum - 0.5 + m.progress * 0.5) / numPages);
          }
        },
      });
      const {
        data: { text: ocrText, confidence },
      } = await worker.recognize(canvas);
      await worker.terminate();

      if (ocrText.trim()) {
        allText.push(`--- Page ${pageNum} ---\n${ocrText.trim()}`);
        totalConfidence += confidence;
      }
    }

    onProgress('ocr', pageNum / numPages);
  }

  onProgress('post-processing', 1);

  const fullText = allText.join('\n\n').trim();
  return {
    text: fullText,
    wordCount: fullText.split(/\s+/).filter(Boolean).length,
    pageCount: numPages,
    confidence: Math.round(totalConfidence / numPages),
  };
}

export async function extractTextFromFile(
  file: File,
  onProgress: ProgressCallback
): Promise<ExtractionResult> {
  const isPDF =
    file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  const isImage =
    file.type === 'image/png' ||
    file.type === 'image/jpeg' ||
    file.type === 'image/jpg' ||
    file.name.toLowerCase().endsWith('.png') ||
    file.name.toLowerCase().endsWith('.jpg') ||
    file.name.toLowerCase().endsWith('.jpeg');

  if (!isPDF && !isImage) {
    throw new Error('Unsupported file type. Please upload a PDF or image file.');
  }

  onProgress('uploading', 1);

  if (isPDF) {
    return extractFromPDF(file, onProgress);
  }
  return extractFromImage(file, onProgress);
}
