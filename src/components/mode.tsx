import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Mode = "pro" | "brainrot";

const ModeCtx = createContext<{ mode: Mode; setMode: (m: Mode) => void; toggle: () => void }>({
  mode: "pro",
  setMode: () => {},
  toggle: () => {},
});

export function useMode() {
  return useContext(ModeCtx);
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("pro");

  useEffect(() => {
    localStorage.setItem("scrub-mode", mode);
    document.documentElement.classList.toggle("meme-on", mode === "brainrot");
  }, [mode]);

  const toggle = useCallback(() => setMode((m) => (m === "pro" ? "brainrot" : "pro")), []);
  const value = useMemo(() => ({ mode, setMode, toggle }), [mode, toggle]);

  return <ModeCtx.Provider value={value}>{children}</ModeCtx.Provider>;
}

/** Light/dark-style switch between the serious site and the brainrot site. */
export function ModeSwitch({ floating = true }: { floating?: boolean }) {
  const { mode, toggle } = useMode();
  const on = mode === "brainrot";

  return (
    <div
      className={
        floating
          ? "fixed bottom-4 right-4 z-[80] md:bottom-6 md:right-6"
          : "inline-block"
      }
    >
      <button
        onClick={toggle}
        aria-pressed={on}
        aria-label="Switch between Pro mode and Brainrot mode"
        className={`group relative flex items-center gap-1 rounded-full border-2 border-ink p-1 shadow-[4px_4px_0_0_var(--ink)] transition-colors duration-300 ${
          on ? "bg-ink" : "bg-paper"
        }`}
      >
        <span
          className={`rounded-full px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 ${
            on ? "text-paper/50" : "bg-live text-ink"
          }`}
        >
          🧠 pro
        </span>
        <span
          className={`rounded-full px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 ${
            on ? "bg-live text-ink" : "text-ink/45"
          }`}
        >
          🤪 brainrot
        </span>
      </button>
    </div>
  );
}
