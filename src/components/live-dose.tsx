import { useEffect, useRef, useState } from "react";

/**
 * "Since you started scrolling" — a live guilt/urgency counter that ties the
 * user's own session time to real waste-flow rates. Built to hook doomscrollers.
 */
const RATES = [
  { key: "kg", label: "kg of plastic entered Indian urban lakes", perSec: 41.2, unit: "" },
  { key: "l", label: "litres of untreated sewage discharged", perSec: 878, unit: "" },
  { key: "m2", label: "m² of water surface choked by weed", perSec: 3.4, unit: "" },
];

function useElapsed() {
  const start = useRef<number | null>(null);
  const [s, setS] = useState(0);
  useEffect(() => {
    start.current = performance.now();
    const id = window.setInterval(() => {
      if (start.current != null) setS((performance.now() - start.current) / 1000);
    }, 120);
    return () => window.clearInterval(id);
  }, []);
  return s;
}

export function LiveDose() {
  const secs = useElapsed();

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-paper md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(60%_100%_at_10%_0%,rgba(34,192,138,0.22),transparent_70%),radial-gradient(50%_100%_at_90%_100%,rgba(46,155,216,0.2),transparent_72%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-2xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] md:text-6xl">
            You've been on this page for{" "}
            <span className="font-serif italic text-gradient tabular-nums">{secs.toFixed(1)}s</span>
            .
          </h2>
          <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-paper/60">
            counting in real time
          </span>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-3">
          {RATES.map((r) => {
            const val = r.perSec * secs;
            return (
              <div key={r.key} className="relative bg-ink/95 p-7 md:p-9">
                <div className="text-5xl font-medium tabular-nums tracking-[-0.04em] text-gradient md:text-6xl">
                  {Math.round(val).toLocaleString("en-IN")}
                </div>
                <p className="mt-3 max-w-[22ch] text-[12.5px] leading-relaxed text-paper/55">
                  {r.label}
                </p>
                <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-live"
                    style={{ width: `${Math.min((secs / 30) * 100, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-paper/50">
          Keep scrolling — the numbers don't stop. That's exactly the problem we automated away.
        </p>
      </div>
    </section>
  );
}
