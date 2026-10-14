import { useEffect, useRef, useState } from "react";

const LAYERS = [
  {
    depth: "0.0 m",
    title: "Surface",
    body: "Floating plastic, thermocol, water hyacinth. The conveyor mouth swallows a 1.2 m wide lane at 0.6 m/s.",
    tint: "rgba(34,192,138,0.18)",
    read: [["Lane width", "1.2 m"], ["Sweep speed", "0.6 m/s"], ["Intake", "passive"]],
  },
  {
    depth: "0.3 m",
    title: "Skim line",
    body: "Vision model segments debris from reflection and glare at 90% precision — 24 fps on an edge board.",
    tint: "rgba(46,155,216,0.2)",
    read: [["Precision", "90.4%"], ["Inference", "24 fps"], ["Classes", "11"]],
  },
  {
    depth: "1.0 m",
    title: "Sensor column",
    body: "pH, dissolved oxygen, turbidity, TDS and temperature sampled every 5 seconds, geotagged to the metre.",
    tint: "rgba(29,127,140,0.24)",
    read: [["pH", "7.4"], ["DO", "5.8 mg/L"], ["Turbidity", "38 NTU"]],
  },
  {
    depth: "2.5 m",
    title: "Benthic story",
    body: "Trend models flag the eutrophication curve weeks before the lake visibly turns. The proof ships to the ULB dashboard.",
    tint: "rgba(8,34,32,0.4)",
    read: [["Chlorophyll-a", "rising"], ["Forecast", "14 days"], ["Alert", "sent to ULB"]],
  },
];

/** Scroll-driven descent through the water column — sticky stage, layered parallax. */
export function DepthDive() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setProg(Math.min(1, Math.max(0, -r.top / (total || 1))));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  const idx = Math.min(LAYERS.length - 1, Math.floor(prog * LAYERS.length));

  return (
    <section ref={ref} className="relative h-[340vh] bg-ink text-paper">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{
            background: `linear-gradient(180deg, ${LAYERS[idx].tint} 0%, rgba(4,22,20,0.96) 100%)`,
          }}
        />
        {/* descending rule lines */}
        <div className="absolute inset-0 opacity-40">
          {Array.from({ length: 26 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 h-px w-full bg-white/12"
              style={{ top: `${(i / 26) * 200 - prog * 100}%` }}
            />
          ))}
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 md:grid-cols-[auto_1fr_minmax(0,300px)] md:items-center md:px-8">
          <div className="flex gap-4 md:flex-col md:gap-6">
            {LAYERS.map((l, i) => (
              <div key={l.depth} className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 rounded-full transition-all duration-500 ${
                    i === idx ? "scale-150 bg-live" : "bg-white/25"
                  }`}
                />
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.22em] transition-colors ${
                    i === idx ? "text-paper" : "text-paper/35"
                  }`}
                >
                  {l.depth}
                </span>
              </div>
            ))}
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-live">
              Dive — depth {LAYERS[idx].depth}
            </span>
            <h3
              key={LAYERS[idx].title}
              className="quiet-rise mt-5 text-[13vw] font-medium leading-[0.86] tracking-[-0.05em] md:text-[7rem]"
            >
              {LAYERS[idx].title}
            </h3>
            <p
              key={LAYERS[idx].body}
              className="quiet-rise mt-6 max-w-lg text-[15px] leading-relaxed text-paper/65"
            >
              {LAYERS[idx].body}
            </p>
            <div className="mt-10 h-[3px] w-full max-w-lg overflow-hidden rounded-full bg-white/12">
              <div
                className="h-full rounded-full bg-gradient-to-r from-clay to-azure"
                style={{ width: `${prog * 100}%` }}
              />
            </div>
          </div>

          <div className="hidden rounded-3xl p-6 glass-dark md:block">
            <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.22em] text-paper/50">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-live" />
              live readout
            </div>
            <div className="mt-5 space-y-4">
              {LAYERS[idx].read.map(([k, v]) => (
                <div key={k} className="border-b border-white/10 pb-3">
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-paper/45">
                    {k}
                  </div>
                  <div className="mt-1 text-xl font-medium tracking-tight text-paper">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-paper/35">
              Kengeri Lake · 12.9081°N 77.4855°E
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
