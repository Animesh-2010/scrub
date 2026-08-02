import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/* 1. MEME BREAK — POV cards, chaotic tape, wobble on hover            */
/* ------------------------------------------------------------------ */

const MEMES = [
  {
    tag: "POV",
    top: "you throw a chips packet in the lake",
    bottom: "our robot: 'noted. logged. GPS tagged. 📍'",
    c: "bg-live text-ink",
    r: -3,
  },
  {
    tag: "NOBODY:",
    top: "absolutely nobody:",
    bottom: "the lake at 4am: *bubbling ominously*",
    c: "bg-paper text-ink",
    r: 2.5,
  },
  {
    tag: "IT'S GIVING",
    top: "solar powered. zero diesel.",
    bottom: "it's giving main character energy 🌞",
    c: "bg-azure text-ink",
    r: -2,
  },
  {
    tag: "REAL ONES KNOW",
    top: "your city has ~1,200 water bodies",
    bottom: "you can name… two? be so fr rn",
    c: "bg-ink text-live",
    r: 3,
  },
];

export function MemeBreak() {
  return (
    <section className="relative overflow-hidden border-y-2 border-ink bg-surface py-16 md:py-24">
      <div className="aurora aurora-soft" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-[18ch] text-4xl font-medium leading-[0.9] tracking-[-0.04em] md:text-6xl">
            Doomscroll, but it's{" "}
            <span className="wonky font-serif italic text-gradient">actually useful</span>
          </h2>
          <span className="sticker sticker-live rotate-3">no cap · certified</span>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MEMES.map((m) => (
            <article
              key={m.tag}
              style={{ rotate: `${m.r}deg` }}
              className={`${m.c} wobble relative rounded-2xl border-2 border-ink p-6 shadow-[6px_6px_0_0_var(--ink)]`}
            >
              <span className="tape" aria-hidden="true" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] opacity-70">
                {m.tag}
              </span>
              <p className="mt-4 text-[19px] font-medium leading-[1.15] tracking-[-0.02em]">
                {m.top}
              </p>
              <p className="mt-3 text-[14px] leading-snug opacity-80">{m.bottom}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. VIBE CHECK — silly interactive poll                              */
/* ------------------------------------------------------------------ */

const OPTIONS = [
  { k: "😐", label: "haven't looked at a lake in years", res: "same. that's the whole problem." },
  { k: "🤢", label: "it smells from the main road", res: "that's ammonia. we measure it. hourly." },
  {
    k: "🫠",
    label: "there used to be one here",
    res: "1,200 of Bengaluru's are gone. we're late but not too late.",
  },
  { k: "🌱", label: "honestly? kinda clean", res: "lucky. now help us make that the default." },
];

export function VibeCheck() {
  const [pick, setPick] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-paper md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(55%_90%_at_20%_0%,rgba(34,192,138,0.2),transparent_70%),radial-gradient(50%_90%_at_85%_100%,rgba(46,155,216,0.18),transparent_72%)]" />
      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <span className="sticker sticker-azure -rotate-2">vibe check</span>
        <h2 className="mt-6 text-4xl font-medium leading-[0.95] tracking-[-0.04em] md:text-6xl">
          How's the water <span className="font-serif italic text-gradient">near you?</span>
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {OPTIONS.map((o, i) => (
            <button
              key={o.k}
              onClick={() => setPick(i)}
              className={`group flex items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-1deg] ${
                pick === i
                  ? "border-live bg-live text-ink shadow-[6px_6px_0_0_var(--live)]"
                  : "border-paper/25 bg-white/5 text-paper hover:border-live"
              }`}
            >
              <span className="text-3xl transition-transform duration-300 group-hover:scale-125">
                {o.k}
              </span>
              <span className="text-[14.5px] font-medium leading-snug">{o.label}</span>
            </button>
          ))}
        </div>

        <p
          className={`mx-auto mt-8 max-w-[40ch] font-serif text-2xl italic transition-all duration-500 md:text-3xl ${
            pick === null ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          {pick === null ? "…" : OPTIONS[pick].res}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. SCROLL RANK — gamified floating badge                            */
/* ------------------------------------------------------------------ */

const RANKS = [
  { at: 0, t: "just vibing 🫧" },
  { at: 18, t: "curious tadpole 🐸" },
  { at: 38, t: "certified lake nerd 🔬" },
  { at: 58, t: "touch-grass tier 🌾" },
  { at: 78, t: "board member energy 💼" },
  { at: 94, t: "you finished. legend. 🏆" },
];

export function ScrollRank() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setP((h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const rank = [...RANKS].reverse().find((r) => p >= r.at) ?? RANKS[0];

  return (
    <div
      className={`pointer-events-none fixed bottom-5 left-1/2 z-[55] -translate-x-1/2 transition-all duration-500 ${
        p > 6 ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 rounded-full border-2 border-ink bg-paper px-4 py-2 shadow-[4px_4px_0_0_var(--ink)]">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-50">
          scroll rank
        </span>
        <span className="text-[12.5px] font-semibold tracking-tight">{rank.t}</span>
        <span className="h-1.5 w-14 overflow-hidden rounded-full bg-ink/10">
          <span
            className="block h-full rounded-full bg-live transition-[width] duration-200"
            style={{ width: `${p}%` }}
          />
        </span>
      </div>
    </div>
  );
}
