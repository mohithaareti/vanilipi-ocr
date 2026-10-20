import { Globe2, ChevronDown } from 'lucide-react';
import { LANGUAGES, type TargetLanguage } from '@/data/samples';

type LanguageSelectorProps = {
  value: TargetLanguage;
  onChange: (lang: TargetLanguage) => void;
  disabled?: boolean;
};

export function LanguageSelector({ value, onChange, disabled }: LanguageSelectorProps) {
  const selected = LANGUAGES.find((l) => l.value === value) ?? LANGUAGES[0];

  return (
    <div className="relative">
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
        <Globe2 className="h-4 w-4 text-primary-500" />
        Target Language
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as TargetLanguage)}
          disabled={disabled}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm font-medium text-slate-800 transition-all hover:border-primary-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-primary-700 dark:focus:ring-primary-900"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label} ({lang.nativeLabel})
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      </div>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        Translated text will appear in{' '}
        <span className={`font-semibold ${selected.fontClass}`}>{selected.nativeLabel}</span>
      </p>
    </div>
  );
}
