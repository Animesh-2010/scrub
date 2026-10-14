import { useCallback, useRef, useState } from "react";

/** Drag-to-reveal before/after slider. */
export function LakeCompare({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState(52);
  const drag = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setP(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={wrap}
      className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border border-ink/10"
      onPointerDown={(e) => {
        drag.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => {
        if (drag.current) move(e.clientX);
      }}
      onPointerUp={() => (drag.current = false)}
      onPointerLeave={() => (drag.current = false)}
    >
      <img src={after} alt={afterLabel} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${p}%` }}>
        <img
          src={before}
          alt={beforeLabel}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: wrap.current?.clientWidth ?? "100%", maxWidth: "none" }}
        />
        <div className="absolute inset-0 bg-ink/25" />
      </div>

      <span className="absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper glass-dark">
        {beforeLabel}
      </span>
      <span className="absolute right-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink glass">
        {afterLabel}
      </span>

      <div className="absolute inset-y-0 w-px bg-paper/90" style={{ left: `${p}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
          <span className="text-xs font-semibold tracking-tight">↔</span>
        </div>
      </div>
    </div>
  );
}
