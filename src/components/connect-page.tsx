import { useEffect, useRef, useState } from "react";

import heroVid from "@/assets/media/hero.mp4.asset.json";
import trial2 from "@/assets/media/trial2.mp4.asset.json";
import v1Img from "@/assets/media/v1.jpg.asset.json";

/* --------------------------------------------------------------- data */

const WEB = "https://www.scrubrobotics.in";

type Intent = {
  id: string;
  emoji: string;
  ask: string;
  sub: string;
  cta: string;
  href: string;
  tint: string;
};

const INTENTS: Intent[] = [
  {
    id: "dirty",
    emoji: "🗑️",
    ask: "show me how we're dirtying lakes",
    sub: "field dispatches, foam, dead pigeons mistaken for coke bottles. raw notes from the water.",
    cta: "read the field notes",
    href: "/blog",
    tint: "var(--azure)",
  },
  {
    id: "clean",
    emoji: "🛥️",
    ask: "show me how you're cleaning them",
    sub: "four autonomous robots, real trial footage, live water telemetry, no diesel.",
    cta: "see the fleet",
    href: "/",
    tint: "var(--live)",
  },
  {
    id: "support",
    emoji: "🫶",
    ask: "i want to support / follow",
    sub: "daily chaos, build logs and lake rescues. it's free and it genuinely helps.",
    cta: "follow on instagram",
    href: "https://instagram.com/team_.scrub",
    tint: "#F5C542",
  },
  {
    id: "work",
    emoji: "🤝",
    ask: "i want to work with you",
    sub: "ward officer, lake trust, investor, or someone who just knows a very cooked lake.",
    cta: "email the team",
    href: "mailto:team.scrub0415@gmail.com",
    tint: "#FF8A5C",
  },
];

const LINKS = [
  { key: "Instagram", value: "team_.scrub", href: "https://instagram.com/team_.scrub", e: "📸" },
  { key: "Website", value: "scrubrobotics.in", href: WEB, e: "🌊" },
  { key: "YouTube", value: "@scrub-robotics", href: "https://youtube.com/@scrub-robotics", e: "▶️" },
  { key: "Blog", value: "field notes / dispatches", href: "/blog", e: "📰" },
  { key: "Email", value: "team.scrub0415@gmail.com", href: "mailto:team.scrub0415@gmail.com", e: "✉️" },
];

const CALLS = [
  { name: "Krishna Purwar", num: "+91 73761 51772" },
  { name: "Siddhant Singh", num: "+91 70076 33541" },
];

const TICKER = [
  "you scanned a sticker. respect.",
  "85% of india's sewage enters water untreated",
  "the lake is cooked 🍳",
  "solar powered · zero diesel",
  "built by undergrads, btw",
  "touch grass. then clean a lake.",
  "bellandur foamed. twice.",
  "trash doesn't disappear, it relocates",
];

/* --------------------------------------------------------------- bits */

function Splat() {
  const [bits, setBits] = useState<{ id: number; x: number; y: number; e: string; dx: number }[]>([]);
  useEffect(() => {
    let id = 0;
    const pool = ["🫧", "💧", "🐟", "🥤", "🦆", "♻️", "🌊"];
    const onClick = (ev: MouseEvent) => {
      const made = Array.from({ length: 4 }, () => ({
        id: id++,
        x: ev.clientX,
        y: ev.clientY,
        e: pool[Math.floor(Math.random() * pool.length)],
        dx: (Math.random() - 0.5) * 150,
      }));
      setBits((b) => [...b.slice(-24), ...made]);
      window.setTimeout(() => setBits((b) => b.filter((x) => !made.some((m) => m.id === x.id))), 1100);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-[99] overflow-hidden">
      {bits.map((b) => (
        <span
          key={b.id}
          // @ts-expect-error custom prop
          style={{ left: b.x, top: b.y, "--dx": `${b.dx}px` }}
          className="splat-bit absolute text-[18px]"
        >
          {b.e}
        </span>
      ))}
    </div>
  );
}

function Ticker() {
  const row = [...TICKER, ...TICKER];
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-ink py-2">
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-live"
          >
            {t} <span className="opacity-40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- page */

export function ConnectPage() {
  const [funk, setFunk] = useState(true);
  const [open, setOpen] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [eggs, setEggs] = useState(0);
  const taps = useRef(0);

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(text);
    window.setTimeout(() => setCopied(null), 1400);
  };

  return (
    <main className={`relative min-h-screen bg-canvas ${funk ? "meme-on" : ""}`}>
      {funk && <Splat />}
      <div className="aurora aurora-soft fixed inset-0 -z-10" />

      {/* hero */}
      <section className="relative overflow-hidden border-b-2 border-ink">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-[0.28]"
          src={heroVid.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="relative mx-auto w-full max-w-[720px] px-5 pb-10 pt-12 md:pt-16">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="sticker sticker-live">scanned ✅ you're in</span>
            <button
              onClick={() => {
                setFunk((f) => !f);
                taps.current += 1;
                if (taps.current === 5) setEggs((e) => Math.max(e, 1));
              }}
              className={`rounded-full border-2 border-ink px-3.5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] shadow-[3px_3px_0_0_var(--ink)] transition ${
                funk ? "bg-live text-ink" : "bg-paper text-ink"
              }`}
            >
              {funk ? "🤪 funk: on" : "🧠 funk: off"}
            </button>
          </div>

          <h1 className="mt-6 text-[46px] font-bold leading-[0.92] tracking-[-0.05em] md:text-[68px]">
            why are you
            <br />
            <span className="wonky font-serif italic">here?</span>
          </h1>
          <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-ink-70">
            you scanned a QR on a sticker, a boat, or someone's laptop. pick a reason — we'll
            take you exactly where you need to go.
          </p>
          <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-50">
            no wrong answers · every path ends at a cleaner lake
          </p>
        </div>
      </section>

      <Ticker />

      {/* intents */}
      <section className="mx-auto w-full max-w-[720px] px-5 py-10">
        <div className="grid gap-4">
          {INTENTS.map((it, i) => {
            const on = open === it.id;
            const external = it.href.startsWith("http") || it.href.startsWith("mailto");
            return (
              <div
                key={it.id}
                style={{ background: on ? it.tint : undefined }}
                className={`wobble rounded-[26px] border-2 border-ink p-5 shadow-[6px_6px_0_0_var(--ink)] transition-colors ${
                  on ? "" : "bg-paper"
                }`}
              >
                <button
                  onClick={() => setOpen(on ? null : it.id)}
                  aria-expanded={on}
                  className="flex w-full items-center gap-4 text-left"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-2 border-ink bg-canvas text-[22px]">
                    {it.emoji}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] opacity-55">
                      option {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 block text-[21px] font-bold leading-tight tracking-[-0.035em] md:text-[24px]">
                      {it.ask}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-[18px] transition-transform ${on ? "rotate-45" : ""}`}
                  >
                    ✚
                  </span>
                </button>

                {on && (
                  <div className="quiet-rise mt-4 border-t-2 border-ink/15 pt-4">
                    <p className="text-[15px] leading-relaxed">{it.sub}</p>
                    <a
                      href={it.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-live shadow-[4px_4px_0_0_var(--ink)]"
                    >
                      {it.cta} ↗
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* proof strip */}
      <section className="mx-auto w-full max-w-[720px] px-5 pb-10">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-[26px] border-2 border-ink shadow-[6px_6px_0_0_var(--ink)]">
            <video
              className="h-[210px] w-full object-cover"
              src={trial2.url}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <span className="absolute bottom-3 left-3 sticker sticker-ink">real trial footage</span>
          </div>
          <div className="relative overflow-hidden rounded-[26px] border-2 border-ink shadow-[6px_6px_0_0_var(--ink)]">
            <img
              src={v1Img.url}
              alt="SCRUB V1 autonomous lake-cleaning robot on the water"
              className="h-[210px] w-full object-cover"
              loading="lazy"
            />
            <span className="absolute bottom-3 left-3 sticker sticker-paper">V1 · in the water</span>
          </div>
        </div>
      </section>

      {/* links */}
      <section className="mx-auto w-full max-w-[720px] px-5 pb-10">
        <p className="sticker sticker-azure">every link, one place</p>
        <div className="mt-4 overflow-hidden rounded-[26px] border-2 border-ink bg-paper shadow-[6px_6px_0_0_var(--ink)]">
          {LINKS.map((l) => {
            const external = l.href.startsWith("http") || l.href.startsWith("mailto");
            return (
              <a
                key={l.key}
                href={l.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 border-b-2 border-ink/10 px-5 py-4 last:border-b-0 transition hover:bg-live"
              >
                <span className="text-[18px]">{l.e}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] opacity-50">
                    {l.key}
                  </span>
                  <span className="mt-0.5 block truncate text-[17px] font-semibold tracking-[-0.02em]">
                    {l.value}
                  </span>
                </span>
                <span className="text-[15px] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* call */}
      <section className="mx-auto w-full max-w-[720px] px-5 pb-10">
        <p className="sticker sticker-live">or just call us, we pick up</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {CALLS.map((c) => (
            <div
              key={c.num}
              className="rounded-[24px] border-2 border-ink bg-canvas p-5 shadow-[6px_6px_0_0_var(--ink)]"
            >
              <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] opacity-55">
                {c.name}
              </p>
              <p className="mt-1.5 text-[19px] font-bold tracking-[-0.02em]">{c.num}</p>
              <div className="mt-3 flex gap-2">
                <a
                  href={`tel:${c.num.replace(/\s/g, "")}`}
                  className="rounded-full border-2 border-ink bg-ink px-4 py-2 font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-live"
                >
                  call ☎️
                </a>
                <button
                  onClick={() => copy(c.num)}
                  className="rounded-full border-2 border-ink bg-paper px-4 py-2 font-mono text-[9.5px] font-bold uppercase tracking-[0.16em]"
                >
                  {copied === c.num ? "copied ✅" : "copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* footer + egg */}
      <footer className="border-t-2 border-ink bg-ink px-5 py-10 text-paper">
        <div className="mx-auto w-full max-w-[720px]">
          <p className="text-[26px] font-bold leading-none tracking-[-0.04em] text-live">
            SCRUB Robotics
          </p>
          <p className="mt-2 text-[14px] text-paper/65">
            Autonomous robotics for cleaner water bodies. Bengaluru, India.
          </p>
          <button
            onClick={() => setEggs((e) => Math.max(e, 2))}
            aria-label="hidden duck"
            className="mt-6 text-[13px] opacity-25 transition hover:opacity-100"
          >
            🦆
          </button>
          {eggs > 0 && (
            <p className="quiet-rise mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-live">
              {eggs === 1 ? "easter egg 1/2 · toggle gremlin unlocked" : "easter egg 2/2 · you found the duck 🦆"}
            </p>
          )}
        </div>
      </footer>
    </main>
  );
}

export const connectMeta = [
  { title: "SCRUB Robotics — Connect · one link, every lake" },
  {
    name: "description",
    content:
      "Scanned our QR? Pick your reason: see how lakes get dirty, watch our robots clean them, or back the squad. Every SCRUB link in one place.",
  },
  { property: "og:title", content: "SCRUB Robotics — Connect" },
  {
    property: "og:description",
    content:
      "One link for everything SCRUB: the blog, the robots, Instagram, YouTube, email and direct lines.",
  },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "robots", content: "noindex" },
];
