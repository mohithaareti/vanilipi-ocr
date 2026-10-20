import { useState } from 'react';
import { Languages, Copy, Check, Download, RefreshCw } from 'lucide-react';
import { LANGUAGES, type TargetLanguage } from '@/data/samples';

type TranslationPanelProps = {
  translatedText: string;
  targetLanguage: TargetLanguage;
  onReTranslate: () => void;
  isTranslating: boolean;
};

export function TranslationPanel({
  translatedText,
  targetLanguage,
  onReTranslate,
  isTranslating,
}: TranslationPanelProps) {
  const [copied, setCopied] = useState(false);
  const lang = LANGUAGES.find((l) => l.value === targetLanguage) ?? LANGUAGES[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([translatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vanilipi-translation-${targetLanguage}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5 dark:border-slate-700/60">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-100 text-accent-600 dark:bg-accent-900/40 dark:text-accent-400">
            <Languages className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Translated Text
            </h3>
            <p className={`text-xs ${lang.fontClass} text-slate-400 dark:text-slate-500`}>
              {lang.label} — {lang.nativeLabel}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onReTranslate}
            disabled={isTranslating}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-40 dark:hover:bg-slate-700/60 dark:hover:text-slate-200"
            title="Re-translate"
            aria-label="Re-translate text"
          >
            <RefreshCw className={`h-4 w-4 ${isTranslating ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleCopy}
            disabled={!translatedText}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-40 dark:hover:bg-slate-700/60 dark:hover:text-slate-200"
            title="Copy translation"
            aria-label="Copy translated text"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
          <button
            onClick={handleDownload}
            disabled={!translatedText}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-40 dark:hover:bg-slate-700/60 dark:hover:text-slate-200"
            title="Download translation"
            aria-label="Download translated text as txt file"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 p-4">
        {isTranslating ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4">
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-3 w-3 rounded-full bg-accent-400 animate-bounce-subtle"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Translating text...</p>
          </div>
        ) : translatedText ? (
          <div
            className={`h-64 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-loose text-slate-700 dark:border-slate-700/60 dark:bg-slate-900/40 dark:text-slate-200 ${lang.fontClass}`}
          >
            {translatedText}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
            <Languages className="h-10 w-10 text-slate-300 dark:text-slate-600" />
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Translation will appear here after processing
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
