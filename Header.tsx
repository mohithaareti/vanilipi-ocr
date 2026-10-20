import { FileText, Languages, Accessibility, Sparkles, BookOpen, HeartPulse, GraduationCap } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SAMPLE_DOCUMENTS } from '@/data/samples';

type HeaderProps = {
  onSelectSample: (index: number) => void;
  showSampleMenu: boolean;
  onToggleSampleMenu: () => void;
};

const CATEGORY_ICONS = [FileText, HeartPulse, GraduationCap];

export function Header({ onSelectSample, showSampleMenu, onToggleSampleMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 glass dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/25">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
                VaniLipi
              </h1>
              <p className="hidden text-xs font-medium text-slate-500 dark:text-slate-400 sm:block">
                Document OCR, Translation & Speech Synthesizer
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Accessibility badge */}
            <div className="hidden items-center gap-1.5 rounded-full border border-accent-200 bg-accent-50 px-3 py-1.5 text-xs font-semibold text-accent-700 dark:border-accent-800 dark:bg-accent-950/40 dark:text-accent-300 sm:flex">
              <Accessibility className="h-3.5 w-3.5" />
              WCAG Accessible
            </div>

            {/* Feature badges */}
            <div className="hidden items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 dark:border-primary-800 dark:bg-primary-950/40 dark:text-primary-300 lg:flex">
              <Languages className="h-3.5 w-3.5" />
              Multilingual
            </div>
            <div className="hidden items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300 lg:flex">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered
            </div>

            {/* Load Sample */}
            <div className="relative">
              <button
                onClick={onToggleSampleMenu}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-primary-500/25 transition-all hover:from-primary-700 hover:to-primary-800 hover:shadow-lg hover:shadow-primary-500/30 sm:px-4"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Load Sample Document</span>
                <span className="sm:hidden">Sample</span>
              </button>

              {showSampleMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={onToggleSampleMenu} />
                  <div className="absolute right-0 top-full z-20 mt-2 w-80 origin-top-right animate-fade-in-up rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-800">
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                      Choose a sample document
                    </p>
                    {SAMPLE_DOCUMENTS.map((doc, idx) => {
                      const Icon = CATEGORY_ICONS[idx] ?? FileText;
                      return (
                        <button
                          key={doc.id}
                          onClick={() => {
                            onSelectSample(idx);
                            onToggleSampleMenu();
                          }}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/60"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                              {doc.title}
                            </p>
                            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                              {doc.description}
                            </p>
                          </div>
                          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                            {doc.category}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Theme toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
