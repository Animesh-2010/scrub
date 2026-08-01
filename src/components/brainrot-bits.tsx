import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* 1. emoji splat — click anywhere, get gunk                            */
/* ------------------------------------------------------------------ */

const SPLAT = ["🫧", "💧", "🐟", "🥤", "🩴", "🦆", "🧴", "♻️", "🌊", "🤖"];

export function EmojiSplat() {
  const [bits, setBits] = useState<{ id: number; x: number; y: number; e: string; dx: number }[]>(
    [],
  );

  useEffect(() => {
    let id = 0;
    const onClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement;
      if (target.closest("input,textarea,select")) return;
      const made = Array.from({ length: 5 }, () => ({
        id: id++,
        x: ev.clientX,
        y: ev.clientY,
        e: SPLAT[Math.floor(Math.random() * SPLAT.length)],
        dx: (Math.random() - 0.5) * 160,
      }));
      setBits((b) => [...b.slice(-40), ...made]);
      window.setTimeout(() => {
        setBits((b) => b.filter((x) => !made.some((m) => m.id === x.id)));
      }, 1100);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99] overflow-hidden">
      {bits.map((b) => (
        <span
          key={b.id}
          style={{
            left: b.x,
            top: b.y,
            // @ts-expect-error custom prop
            "--dx": `${b.dx}px`,
          }}
          className="splat-bit absolute text-[19px]"
        >
          {b.e}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. brainrot meter — scroll progress with escalating diagnosis        */
/* ------------------------------------------------------------------ */

const DIAGNOSIS = [
  { at: 0, label: "brainrot: 0% · you're normal", e: "🧠" },
  { at: 0.15, label: "mild scrollitis detected", e: "😐" },
  { at: 0.35, label: "you're locked in bestie", e: "😳" },
  { at: 0.55, label: "certified lake nerd", e: "🤓" },
  { at: 0.75, label: "brainrot: terminal", e: "💀" },
  { at: 0.92, label: "congrats you learned something", e: "🏆" },
];

export function BrainrotMeter() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const d = [...DIAGNOSIS].reverse().find((x) => p >= x.at) ?? DIAGNOSIS[0];

  return (
    <>
      <div className="fixed inset-x-0 top-[58px] z-40 h-[6px] bg-ink/10">
        <div
          className="h-full bg-live transition-[width] duration-150"
          style={{ width: `${p * 100}%` }}
        />
      </div>
      <div className="pointer-events-none fixed left-1/2 top-[66px] z-40 -translate-x-1/2">
        <span className="wobble inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-paper px-3 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] shadow-[3px_3px_0_0_var(--ink)]">
          <span className="text-[12px]">{d.e}</span> {d.label}
        </span>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 3. which bot are you — chaotic quiz                                  */
/* ------------------------------------------------------------------ */

const QUESTIONS = [
  {
    q: "it's 3am. you are:",
    a: ["scrolling", "still working", "outside somehow", "asleep like a normal"],
  },
  {
    q: "trash in front of you. you:",
    a: ["pick it up", "post about it", "step over it", "send a robot"],
  },
  {
    q: "your energy source:",
    a: ["sunlight", "cold brew", "spite", "pure vibes"],
  },
];

const RESULTS = [
  {
    id: "V1",
    title: "you are V1",
    line: "flagship menace. loud, tested, patent-published. people rely on you and you hate that they're right to.",
    e: "🛥️",
  },
  {
    id: "V2",
    title: "you are V2",
    line: "lazy genius. you removed the motors and let physics do your homework. respectfully: goated.",
    e: "🌀",
  },
  {
    id: "V3",
    title: "you are V3",
    line: "the bouncer. you sit at the chokepoint and nothing gets past you. trash: not on the list.",
    e: "🚧",
  },
  {
    id: "V4",
    title: "you are V4",
    line: "nerd emoji bot. 20+ sensors of pure opinion. you WILL tell everyone the pH.",
    e: "🤓",
  },
];

export function WhichBot() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const result = useMemo(() => RESULTS[score % 4], [score]);

  if (step >= QUESTIONS.length) {
    return (
      <div className="wobble rounded-[28px] border-2 border-ink bg-live p-7 text-center shadow-[8px_8px_0_0_var(--ink)]">
        <p className="text-5xl">{result.e}</p>
        <p className="mt-3 text-[32px] font-bold leading-none tracking-[-0.04em]">{result.title}</p>
        <p className="mx-auto mt-3 max-w-[34ch] text-[15px] leading-relaxed opacity-80">
          {result.line}
        </p>
        <button
          onClick={() => {
            setStep(0);
            setScore(0);
          }}
          className="mt-6 rounded-full border-2 border-ink bg-paper px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] shadow-[4px_4px_0_0_var(--ink)]"
        >
          run it back 🔁
        </button>
      </div>
    );
  }

  const q = QUESTIONS[step];

  return (
    <div className="rounded-[28px] border-2 border-ink bg-paper p-7 shadow-[8px_8px_0_0_var(--ink)]">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] opacity-55">
        q{step + 1} / {QUESTIONS.length}
      </p>
      <p className="mt-3 text-[26px] font-bold leading-tight tracking-[-0.035em]">{q.q}</p>
      <div className="mt-5 grid gap-2.5">
        {q.a.map((a, i) => (
          <button
            key={a}
            onClick={() => {
              setScore((s) => s + i + step);
              setStep((s) => s + 1);
            }}
            className="rounded-2xl border-2 border-ink bg-canvas px-4 py-3 text-left text-[15px] font-semibold transition hover:bg-live hover:shadow-[4px_4px_0_0_var(--ink)]"
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. comment section — fake reels comments that keep loading           */
/* ------------------------------------------------------------------ */

const COMMENTS = [
  { u: "@lakepilled", t: "bro really said 'send a robot' and sent a robot", l: "12.4k" },
  { u: "@auntyinHSR", t: "the foam reached my balcony once. never recovered.", l: "8.1k" },
  { u: "@ml_gremlin", t: "training on trash datasets is such a flex", l: "5.6k" },
  { u: "@notabot9000", t: "the robot has a better work ethic than me", l: "22.9k" },
  { u: "@ward_office", t: "we are looking into it (2019)", l: "44.2k" },
  { u: "@vibes_only", t: "solar powered?? no diesel?? that's crazy work", l: "3.3k" },
  { u: "@grandpa_swam", t: "we used to swim in this exact lake", l: "19.7k" },
  { u: "@doomscroller", t: "came for memes stayed for dissolved oxygen", l: "31.0k" },
  { u: "@fish_pov", t: "on behalf of the fish: thank you", l: "51.5k" },
  { u: "@ceo_of_nothing", t: "undergrads built this and I can't build a shelf", l: "27.8k" },
];

export function CommentSection() {
  const [count, setCount] = useState(4);
  const [liked, setLiked] = useState<string[]>([]);
  const timer = useRef<number | null>(null);

  const more = useCallback(() => setCount((c) => Math.min(COMMENTS.length, c + 3)), []);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="rounded-[28px] border-2 border-ink bg-paper p-5 shadow-[8px_8px_0_0_var(--ink)] md:p-6">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] opacity-55">
        comments ({COMMENTS.length * 137})
      </p>
      <div className="mt-4 flex flex-col gap-3.5">
        {COMMENTS.slice(0, count).map((c) => {
          const on = liked.includes(c.u);
          return (
            <div key={c.u} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-azure text-[13px]">
                {c.u[1].toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] opacity-60">
                  {c.u}
                </p>
                <p className="mt-1 text-[15px] leading-snug">{c.t}</p>
              </div>
              <button
                onClick={() => setLiked((l) => (on ? l.filter((x) => x !== c.u) : [...l, c.u]))}
                aria-label={`like comment by ${c.u}`}
                className="shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.1em] opacity-70"
              >
                <span className={`block text-[15px] transition-transform ${on ? "scale-125" : ""}`}>
                  {on ? "❤️" : "🤍"}
                </span>
                {c.l}
              </button>
            </div>
          );
        })}
      </div>
      {count < COMMENTS.length && (
        <button
          onClick={more}
          className="mt-5 w-full rounded-2xl border-2 border-ink bg-canvas py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition hover:bg-live"
        >
          load more cope ↓
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. hot takes — swipe/tap agree-disagree with live tally              */
/* ------------------------------------------------------------------ */

const TAKES = [
  "the lake is someone else's problem",
  "a robot cleaning water is peak 2026",
  "i could name 3 lakes near me right now",
  "foam on a lake is normal, actually",
  "undergrads can't build real hardware",
];

export function HotTakes() {
  const [i, setI] = useState(0);
  const [tally, setTally] = useState({ y: 0, n: 0 });
  const done = i >= TAKES.length;

  return (
    <div className="rounded-[28px] border-2 border-ink bg-ink p-7 text-paper shadow-[8px_8px_0_0_var(--live)]">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-live">
        hot takes · be honest
      </p>
      {done ? (
        <>
          <p className="mt-4 text-[26px] font-bold leading-tight tracking-[-0.035em]">
            you agreed with {tally.y}/{TAKES.length}.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-paper/70">
            {tally.y >= 3
              ? "respectfully… we have work to do. keep scrolling."
              : "ok you actually get it. tell three people."}
          </p>
          <button
            onClick={() => {
              setI(0);
              setTally({ y: 0, n: 0 });
            }}
            className="mt-5 rounded-full border-2 border-live px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-live"
          >
            again 🔁
          </button>
        </>
      ) : (
        <>
          <p className="mt-4 min-h-[3.2em] text-[26px] font-bold leading-tight tracking-[-0.035em]">
            "{TAKES[i]}"
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                setTally((t) => ({ ...t, y: t.y + 1 }));
                setI((x) => x + 1);
              }}
              className="flex-1 rounded-2xl border-2 border-live bg-live px-4 py-3 text-[15px] font-bold text-ink"
            >
              real 👍
            </button>
            <button
              onClick={() => {
                setTally((t) => ({ ...t, n: t.n + 1 }));
                setI((x) => x + 1);
              }}
              className="flex-1 rounded-2xl border-2 border-live px-4 py-3 text-[15px] font-bold text-live"
            >
              nah 👎
            </button>
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/50">
            {i + 1} / {TAKES.length}
          </p>
        </>
      )}
    </div>
  );
}
