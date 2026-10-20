import { useCallback, useRef, useState, type DragEvent } from 'react';
import { UploadCloud, FileImage, FileType2, X } from 'lucide-react';

type FileDropZoneProps = {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
  selectedFileName?: string | null;
  onClearFile: () => void;
};

const ACCEPTED_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/jpg',
];

export function FileDropZone({ onFileSelected, disabled, selectedFileName, onClearFile }: FileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSubmit = useCallback(
    (file: File) => {
      setError(null);
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      const isImage =
        file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.name.toLowerCase().endsWith('.png') ||
        file.name.toLowerCase().endsWith('.jpg') ||
        file.name.toLowerCase().endsWith('.jpeg');

      if (!isPdf && !isImage) {
        setError('Please upload a PDF or image file (.png, .jpg).');
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        setError('File size must be under 20 MB.');
        return;
      }
      onFileSelected(file);
    },
    [onFileSelected]
  );

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSubmit(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSubmit(file);
    e.target.value = '';
  };

  if (selectedFileName) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
          {selectedFileName.toLowerCase().endsWith('.pdf') ? (
            <FileType2 className="h-6 w-6" />
          ) : (
            <FileImage className="h-6 w-6" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{selectedFileName}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">File uploaded and ready for processing</p>
        </div>
        <button
          onClick={onClearFile}
          disabled={disabled}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50 dark:hover:bg-red-950/40"
          aria-label="Remove file"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
          isDragging
            ? 'border-primary-500 bg-primary-50 scale-[1.01] dark:bg-primary-950/30'
            : 'border-slate-300 bg-slate-50 hover:border-primary-400 hover:bg-primary-50/50 dark:border-slate-700 dark:bg-slate-800/30 dark:hover:border-primary-600 dark:hover:bg-primary-950/20'
        } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />
        <div
          className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ${
            isDragging
              ? 'bg-primary-500 text-white scale-110'
              : 'bg-primary-100 text-primary-600 group-hover:scale-105 dark:bg-primary-900/40 dark:text-primary-400'
          }`}
        >
          <UploadCloud className="h-8 w-8" />
        </div>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {isDragging ? 'Drop your file here' : 'Drag and drop your document'}
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          or <span className="font-medium text-primary-600 dark:text-primary-400">browse files</span>
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-950/40 dark:text-red-300">
            <FileType2 className="h-3 w-3" /> PDF
          </span>
          <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
            <FileImage className="h-3 w-3" /> PNG
          </span>
          <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
            <FileImage className="h-3 w-3" /> JPG
          </span>
        </div>
      </div>
      {error && (
        <p className="mt-3 text-sm text-red-500 animate-fade-in" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
