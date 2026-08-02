import { useEffect, useRef } from "react";

/**
 * Ambient "nature" background: slow interference ripples + drifting pollen motes,
 * drawn on a low-opacity canvas behind all content.
 */
export function WaterField({ tone = "light" }: { tone?: "light" | "dark" }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const stroke = tone === "dark" ? "rgba(120, 226, 196," : "rgba(15, 164, 124,";
    const dot = tone === "dark" ? "rgba(160, 226, 255," : "rgba(46, 155, 216,";

    type Mote = { x: number; y: number; r: number; vx: number; vy: number; a: number };
    const motes: Mote[] = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.00016,
      vy: -0.00006 - Math.random() * 0.00012,
      a: 0.16 + Math.random() * 0.36,
    }));

    const centers = [
      { x: 0.18, y: 0.22, s: 1 },
      { x: 0.78, y: 0.42, s: 0.72 },
      { x: 0.5, y: 0.85, s: 0.86 },
    ];

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const time = t * 0.00016;

      // concentric ripple rings — like rain hitting still water
      for (const c of centers) {
        const cx = c.x * w;
        const cy = c.y * h;
        const max = Math.max(w, h) * 0.85 * c.s;
        for (let i = 0; i < 9; i++) {
          const phase = (time * 0.5 + i / 9) % 1;
          const r = phase * max;
          const alpha = (1 - phase) * 0.17 * c.s;
          ctx.beginPath();
          ctx.strokeStyle = `${stroke}${alpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // horizontal current lines with a gentle wave
      ctx.lineWidth = 1;
      for (let i = 0; i < 7; i++) {
        const baseY = (h / 8) * (i + 1);
        ctx.beginPath();
        ctx.strokeStyle = `${stroke}0.1)`;
        for (let x = 0; x <= w; x += 12) {
          const y =
            baseY +
            Math.sin(x * 0.006 + time * 2 + i) * 10 +
            Math.sin(x * 0.013 - time * 1.4 + i * 0.7) * 5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // drifting motes
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -0.05) m.y = 1.05;
        if (m.x < -0.05) m.x = 1.05;
        if (m.x > 1.05) m.x = -0.05;
        ctx.beginPath();
        ctx.fillStyle = `${dot}${m.a})`;
        ctx.arc(m.x * w, m.y * h, m.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      draw(0);
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [tone]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
