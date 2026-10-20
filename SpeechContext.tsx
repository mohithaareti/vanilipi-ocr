import { createContext, useContext, type ReactNode } from 'react';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

type SpeechContextValue = ReturnType<typeof useSpeechSynthesis>;

const SpeechContext = createContext<SpeechContextValue | undefined>(undefined);

export function SpeechProvider({ children }: { children: ReactNode }) {
  const speech = useSpeechSynthesis();
  return <SpeechContext.Provider value={speech}>{children}</SpeechContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSpeech() {
  const ctx = useContext(SpeechContext);
  if (!ctx) throw new Error('useSpeech must be used within SpeechProvider');
  return ctx;
}
