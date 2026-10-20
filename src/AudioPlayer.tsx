import { Play, Pause, Square, Volume2, Gauge, Waves, Copy, Download, Check } from 'lucide-react';
import { useState } from 'react';
import { useSpeech } from '@/context/SpeechContext';
import { LANGUAGES, type TargetLanguage } from '@/data/samples';

type AudioPlayerProps = {
  text: string;
  targetLanguage: TargetLanguage;
  onDownload: () => void;
};

const SPEED_OPTIONS = [0.75, 1, 1.25];

export function AudioPlayer({ text, targetLanguage, onDownload }: AudioPlayerProps) {
  const { state, supported, progress, speak, pause, resume, stop, setRate } = useSpeech();
  const [rate, setRateState] = useState(1);
  const [copied, setCopied] = useState(false);
  const lang = LANGUAGES.find((l) => l.value === targetLanguage) ?? LANGUAGES[0];

  const handlePlayPause = () => {
    if (!text) return;
    if (state === 'playing') {
      pause();
    } else if (state === 'paused') {
      resume();
    } else {
      speak(text, { lang: lang.bcp47, rate, volume: 1 });
    }
  };

  const handleSpeedChange = (newRate: number) => {
    setRateState(newRate);
    if (state === 'playing' || state === 'paused') {
      setRate(newRate);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const isPlaying = state === 'playing';
  const isPaused = state === 'paused';
  const hasText = text.trim().length > 0;

  // Waveform bars
  const bars = Array.from({ length: 32 }, (_, i) => i);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-sm dark:border-slate-700 dark:from-slate-800/50 dark:to-slate-900/30">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5 dark:border-slate-700/60">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
            <Volume2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Audio Player</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Text-to-Speech — {lang.label}
            </p>
          </div>
        </div>
        {!supported && (
          <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 dark:bg-red-950/40 dark:text-red-400">
            Not supported
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Waveform visualization */}
        <div className="mb-5 flex h-16 items-center justify-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800/60">
          {bars.map((i) => {
            const height = 20 + Math.sin(i * 0.5) * 30 + (i % 3) * 8;
            const active = isPlaying && i < (progress / 100) * bars.length;
            return (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all duration-300 ${
                  active
                    ? 'bg-primary-500'
                    : isPlaying || isPaused
                    ? 'bg-primary-200 dark:bg-primary-800'
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
                style={{
                  height: isPlaying && Math.abs(Math.sin(i + Date.now() / 500)) * 0.5 > 0.3 ? `${height}%` : `${height * 0.4}%`,
                  animation: isPlaying ? `wave 1.2s ease-in-out ${i * 0.05}s infinite` : 'none',
                }}
              />
            );
          })}
        </div>

        {/* Progress bar */}
        {(isPlaying || isPaused) && (
          <div className="mb-5">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
              <span>{Math.round(progress)}%</span>
              <span className="flex items-center gap-1">
                <Waves className="h-3 w-3" />
                {state === 'paused' ? 'Paused' : 'Playing'}
              </span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handlePlayPause}
            disabled={!hasText || !supported}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary-500/40 disabled:scale-100 disabled:opacity-40 disabled:shadow-none"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" fill="currentColor" />
            ) : (
              <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
            )}
          </button>

          <button
            onClick={stop}
            disabled={!isPlaying && !isPaused}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all hover:scale-105 hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:scale-100 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-red-800 dark:hover:bg-red-950/40"
            aria-label="Stop"
          >
            <Square className="h-4 w-4" fill="currentColor" />
          </button>
        </div>

        {/* Speed control */}
        <div className="mt-5">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            <Gauge className="h-3.5 w-3.5" />
            Playback Speed
          </div>
          <div className="flex items-center gap-2">
            {SPEED_OPTIONS.map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                disabled={!hasText}
                className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-all disabled:opacity-40 ${
                  rate === speed
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Export buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={handleCopy}
            disabled={!hasText}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-primary-200 hover:bg-primary-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-primary-700 dark:hover:bg-primary-950/30"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Text
              </>
            )}
          </button>
          <button
            onClick={onDownload}
            disabled={!hasText}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-primary-200 hover:bg-primary-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-primary-700 dark:hover:bg-primary-950/30"
          >
            <Download className="h-4 w-4" />
            Download .txt
          </button>
        </div>
      </div>
    </div>
  );
}
