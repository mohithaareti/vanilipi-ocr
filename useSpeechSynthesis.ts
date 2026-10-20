import { useCallback, useEffect, useRef, useState } from 'react';

type SpeechState = 'idle' | 'playing' | 'paused';

type SpeechOptions = {
  lang: string;
  rate: number;
  pitch: number;
  volume: number;
};

export function useSpeechSynthesis() {
  const [state, setState] = useState<SpeechState>('idle');
  const [supported, setSupported] = useState(true);
  const [progress, setProgress] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const totalWordsRef = useRef(0);
  const intervalRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const currentRateRef = useRef<number>(1);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        voicesRef.current = voices;
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      window.speechSynthesis?.cancel();
    };
  }, []);

  const stopProgressTimer = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const pickVoice = useCallback((lang: string): SpeechSynthesisVoice | null => {
    const voices = voicesRef.current;
    if (voices.length === 0) return null;

    // Exact BCP-47 match (e.g. "te-IN")
    const exact = voices.find((v) => v.lang === lang);
    if (exact) return exact;

    // Language prefix match (e.g. "te")
    const prefix = lang.split('-')[0].toLowerCase();
    const prefixMatch = voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
    if (prefixMatch) return prefixMatch;

    return null;
  }, []);

  const speak = useCallback(
    (text: string, options: Partial<SpeechOptions> = {}) => {
      if (!window.speechSynthesis || !text.trim()) return;

      // Cancel any ongoing speech first
      window.speechSynthesis.cancel();
      stopProgressTimer();

      // Small delay to let cancel settle (Chrome bug workaround)
      const doSpeak = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        const lang = options.lang ?? 'te-IN';
        utterance.lang = lang;
        utterance.rate = options.rate ?? 1;
        utterance.pitch = options.pitch ?? 1;
        utterance.volume = options.volume ?? 1;
        currentRateRef.current = utterance.rate;

        // Explicitly select a matching voice — critical for non-English languages
        const voice = pickVoice(lang);
        if (voice) {
          utterance.voice = voice;
        }

        totalWordsRef.current = text.trim().split(/\s+/).length || 1;
        pausedAtRef.current = 0;
        setProgress(0);

        utterance.onstart = () => {
          setState('playing');
          const startTime = Date.now();
          const estimatedDuration = (totalWordsRef.current / (currentRateRef.current * 2.5)) * 1000;

          intervalRef.current = window.setInterval(() => {
            const elapsed = Date.now() - startTime;
            const pct = Math.min((elapsed / estimatedDuration) * 100, 99);
            setProgress(pct);
          }, 100);
        };

        utterance.onend = () => {
          stopProgressTimer();
          setProgress(100);
          setState('idle');
          setTimeout(() => setProgress(0), 500);
        };

        utterance.onerror = (e) => {
          stopProgressTimer();
          setState('idle');
          setProgress(0);
          // Don't log "interrupted" or "canceled" — those happen on stop/rate change
          if (e.error !== 'interrupted' && e.error !== 'canceled') {
            console.warn('Speech synthesis error:', e.error);
          }
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      };

      // Use a microtask delay to avoid Chrome's "cancel then immediately speak" race
      setTimeout(doSpeak, 50);
    },
    [pickVoice]
  );

  const pause = useCallback(() => {
    if (!window.speechSynthesis) return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      pausedAtRef.current = progress;
      stopProgressTimer();
      setState('paused');
    }
  }, [progress]);

  const resume = useCallback(() => {
    if (!window.speechSynthesis) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      const startTime = Date.now();
      const remainingPct = 100 - pausedAtRef.current;
      const remainingDuration =
        ((totalWordsRef.current * remainingPct) / 100 / (currentRateRef.current * 2.5)) * 1000;

      intervalRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(pausedAtRef.current + (elapsed / remainingDuration) * remainingPct, 99);
        setProgress(pct);
      }, 100);
      setState('playing');
    }
  }, []);

  const stop = useCallback(() => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    stopProgressTimer();
    setState('idle');
    setProgress(0);
  }, []);

  const setRate = useCallback(
    (rate: number) => {
      currentRateRef.current = rate;
      if (state === 'playing' || state === 'paused') {
        const text = utteranceRef.current?.text;
        const lang = utteranceRef.current?.lang;
        if (text && lang) {
          speak(text, { lang, rate, volume: 1 });
        }
      }
    },
    [state, speak]
  );

  return { state, supported, progress, speak, pause, resume, stop, setRate };
}
