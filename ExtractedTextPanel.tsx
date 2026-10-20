import { useRef } from 'react';
import { ScanText, Eraser, Copy, Check } from 'lucide-react';
import { useState } from 'react';

type ExtractedTextPanelProps = {
  text: string;
  onChange: (text: string) => void;
  disabled?: boolean;
};

export function ExtractedTextPanel({ text, onChange, disabled }: ExtractedTextPanelProps) {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5 dark:border-slate-700/60">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
            <ScanText className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Extracted Text</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">OCR output — editable</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            disabled={!text}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-40 dark:hover:bg-slate-700/60 dark:hover:text-slate-200"
            title="Copy text"
            aria-label="Copy extracted text"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
          <button
            onClick={handleClear}
            disabled={!text || disabled}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-40 dark:hover:bg-red-950/40"
            title="Clear text"
            aria-label="Clear extracted text"
          >
            <Eraser className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 p-4">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Extracted text will appear here after OCR processing. You can also paste or type text directly into this field."
          className="h-64 w-full resize-none rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 transition-all focus:border-primary-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:opacity-60 dark:border-slate-700/60 dark:bg-slate-900/40 dark:text-slate-200 dark:focus:border-primary-700 dark:focus:bg-slate-900 dark:focus:ring-primary-900/40"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>{text.trim() ? `${text.trim().split(/\s+/).length} words` : 'No text yet'}</span>
          <span>{text.length} characters</span>
        </div>
      </div>
    </div>
  );
}
