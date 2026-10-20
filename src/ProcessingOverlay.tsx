import { useEffect, useState } from 'react';
import { Upload, Image, ScanText, FileText, Languages, CheckCircle2, AlertCircle } from 'lucide-react';
import { PROCESS_STAGES, type ProcessingStage } from '@/data/samples';

type ProcessingOverlayProps = {
  isVisible: boolean;
  activeStage: ProcessingStage;
  stageProgress: number;
  fileName?: string;
  error?: string | null;
};

export function ProcessingOverlay({
  isVisible,
  activeStage,
  stageProgress,
  fileName,
  error,
}: ProcessingOverlayProps) {
  const [completedStages, setCompletedStages] = useState<Set<ProcessingStage>>(new Set());

  useEffect(() => {
    if (!isVisible) {
      setCompletedStages(new Set());
      return;
    }
    const stageOrder: ProcessingStage[] = ['uploading', 'preprocessing', 'ocr', 'post-processing', 'translating'];
    const activeIdx = stageOrder.indexOf(activeStage);
    if (activeIdx > 0) {
      const completed = new Set(stageOrder.slice(0, activeIdx));
      setCompletedStages(completed);
    }
  }, [activeStage, isVisible]);

  if (!isVisible) return null;

  const stageIcons: Record<string, typeof Upload> = {
    upload: Upload,
    image: Image,
    scan: ScanText,
    'file-text': FileText,
    languages: Languages,
  };

  // Map ProcessingStage to PROCESS_STAGES index
  const stageOrder: ProcessingStage[] = ['uploading', 'preprocessing', 'ocr', 'post-processing', 'translating'];
  const activeIdx = stageOrder.indexOf(activeStage);
  const overallProgress = error
    ? 0
    : Math.min(((activeIdx + stageProgress) / stageOrder.length) * 100, 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 glass animate-fade-in p-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-700 bg-white p-8 shadow-2xl dark:bg-slate-800">
        {error ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Extraction Failed</h2>
            <p className="mt-2 text-sm text-red-500 dark:text-red-400">{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/30">
                <ScanText className="h-8 w-8 animate-pulse-soft" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Processing Document</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {fileName ? fileName : 'Running OCR and neural translation pipeline'}
              </p>
            </div>

            {/* Overall progress bar */}
            <div className="mb-6">
              <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-400 dark:text-slate-500">
                <span>Overall Progress</span>
                <span>{Math.round(overallProgress)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500 ease-out"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            {/* Stages */}
            <div className="space-y-2">
              {PROCESS_STAGES.map((stage) => {
                const Icon = stageIcons[stage.icon] ?? Upload;
                const isComplete = completedStages.has(stage.stage);
                const isActive = stage.stage === activeStage;
                const isUpcoming = !isComplete && !isActive;

                // Per-stage progress (0-1)
                const stagePct =
                  isComplete ? 100 : isActive ? Math.round(stageProgress * 100) : 0;

                return (
                  <div
                    key={stage.stage}
                    className={`flex items-center gap-3 rounded-xl p-3 transition-all duration-300 ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-950/30'
                        : isComplete
                        ? 'opacity-60'
                        : 'opacity-30'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all ${
                        isComplete
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400'
                          : isActive
                          ? 'bg-primary-500 text-white'
                          : 'bg-slate-100 text-slate-400 dark:bg-slate-700'
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : isActive ? (
                        <Icon className="h-5 w-5 animate-pulse-soft" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-semibold ${
                            isActive
                              ? 'text-primary-700 dark:text-primary-300'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {stage.label}
                        </p>
                        {isActive && stagePct > 0 && (
                          <span className="text-xs font-medium text-primary-500 dark:text-primary-400">
                            {stagePct}%
                          </span>
                        )}
                      </div>
                      <p className="truncate text-xs text-slate-400 dark:text-slate-500">
                        {stage.description}
                      </p>
                      {isActive && stagePct > 0 && (
                        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-600">
                          <div
                            className="h-full rounded-full bg-primary-500 transition-all duration-200"
                            style={{ width: `${stagePct}%` }}
                          />
                        </div>
                      )}
                    </div>
                    {isActive && stagePct === 0 && (
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-bounce-subtle"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
