import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { DoomFeed, BANK, shuffle } from "@/components/meme-mode";
import {
  EmojiSplat,
  BrainrotMeter,
  WhichBot,
  HotTakes,
  CommentSection,
} from "@/components/brainrot-bits";
import { ModeSwitch, useMode } from "@/components/mode";

import memeShrug from "@/assets/memes/meme_shrug.jpg";
import memeShock from "@/assets/memes/meme_shock.jpg";
import memeBuff from "@/assets/memes/meme_buff.jpg";
import memeCry from "@/assets/memes/meme_cry.jpg";

import v1Img from "@/assets/media/v1.jpg.asset.json";
import v2Img from "@/assets/media/v2.jpg.asset.json";
import heroVid from "@/assets/media/hero.mp4.asset.json";
import trial1 from "@/assets/media/trial1.mp4.asset.json";
import trial2 from "@/assets/media/trial2.mp4.asset.json";
import trial3 from "@/assets/media/trial3.mp4.asset.json";

import krishna from "@/assets/team/krishna.jpg.asset.json";
import siddhant from "@/assets/team/siddhant.jpg.asset.json";
import animesh from "@/assets/team/animesh.jpg.asset.json";
import atharva from "@/assets/team/atharva.jpg.asset.json";
import dishita from "@/assets/team/dishita.jpg.asset.json";
import farhan from "@/assets/team/farhan.jpg.asset.json";
import varsha from "@/assets/team/varsha.jpg.asset.json";
import lakshay from "@/assets/team/lakshay.jpg.asset.json";
import skanda from "@/assets/team/skanda.jpg.asset.json";
import siddiq from "@/assets/team/siddiq.jpg.asset.json";

/* ------------------------------------------------------------------ data */

const MARQUEE = [
  "patent published (yes really)",
  "zero diesel · full sun",
  "69,485 water bodies",
  "BBMP knows us",
  "built by undergrads",
  "no cap · no foam",
];

const NUMBERS = [
  { n: "69,485", cap: "water bodies in india", sub: "you can name 2. be so fr." },
  { n: "₹2,800 Cr", cap: "spent yearly on lakes", sub: "the lakes: still cooked 💀" },
  { n: "80%", cap: "of bengaluru's lake area gone", sub: "since 1970. canon event." },
  { n: "4", cap: "robots in the fleet", sub: "each one built different" },
];

const TIER = [
  {
    id: "V1",
    tier: "S",
    name: "the flagship menace",
    line: "twin-hull catamaran that eats plastic for breakfast. field-tested. patent-published.",
    real: "Lake Cleaning Platform · developed & field-validated",
    img: v1Img.url,
  },
  {
    id: "V2",
    tier: "A",
    name: "lazy genius build",
    line: "no motors for intake. it just… vibes forward and the water does the work.",
    real: "Passive Intake Robot · developed & validated",
    img: v2Img.url,
  },
  {
    id: "V3",
    tier: "A",
    name: "the bouncer",
    line: "sits at the river chokepoint like security at a club. trash: not on the list.",
    real: "River Waste Interceptor · in development",
    img: null,
  },
  {
    id: "V4",
    tier: "S",
    name: "nerd emoji bot 🤓",
    line: "20+ sensors, patrols in patterns, snitches on the water quality live.",
    real: "Water Analytics Bot · in development",
    img: null,
  },
];

const SQUAD = [
  { name: "Krishna", role: "makes metal float", img: krishna.url },
  { name: "Siddhant", role: "talks to microcontrollers", img: siddhant.url },
  { name: "Animesh", role: "teaches robots to see trash", img: animesh.url },
  { name: "Atharva", role: "IoT wizard", img: atharva.url },
  { name: "Dishita", role: "AI/ML gremlin", img: dishita.url },
  { name: "Farhan", role: "sensor whisperer", img: farhan.url },
  { name: "Suraj", role: "algorithm arc", img: "/assets/images/team/Suraj.jpeg" },
  { name: "Varsha", role: "embedded chaos", img: varsha.url },
  { name: "Lakshay", role: "IoT plumbing", img: lakshay.url },
  { name: "Hariharan", role: "mech brain", img: "/assets/images/team/Hariharan.jpeg" },
  { name: "Shivansh", role: "SCRUB crew", img: "/assets/images/team/Shivansh.jpeg" },
  { name: "Skanda", role: "CAD monster", img: skanda.url },
  { name: "Siddiq", role: "mech design", img: siddiq.url },
];

const CLIPS = [
  { src: trial1.url, cap: "kengeri lake, take one" },
  { src: trial2.url, cap: "conveyor doing conveyor things" },
  { src: trial3.url, cap: "raw footage. no renders." },
];

/* ------------------------------------------------------------------ bits */

function Sticker({
  children,
  rot = -3,
  c = "bg-live text-ink",
}: {
  children: React.ReactNode;
  rot?: number;
  c?: string;
}) {
  return (
    <span
      style={{ rotate: `${rot}deg` }}
      className={`${c} inline-block rounded-full border-2 border-ink px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] shadow-[3px_3px_0_0_var(--ink)]`}
    >
      {children}
    </span>
  );
}

function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <div className={`overflow-hidden border-y-2 border-ink py-2.5 ${dark ? "bg-ink" : "bg-live"}`}>
      <div
        className={`marquee-track flex w-max gap-8 whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-[0.2em] ${
          dark ? "text-live" : "text-ink"
        }`}
      >
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i}>{t} ✦</span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ page */

export function BrainrotSite() {
  const { setMode } = useMode();
  const [randomMemes, setRandomMemes] = useState(() => shuffle(BANK).slice(0, 6));

  useEffect(() => {
    setRandomMemes(shuffle(BANK).slice(0, 6));
  }, []);

  return (
    <div id="top" className="min-h-screen bg-paper text-ink">
      <EmojiSplat />
      <BrainrotMeter />
      <DoomFeed onKonami={() => setMode("brainrot")} />
      <ModeSwitch />

      {/* nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8">
          <a href="#top" className="text-[19px] font-bold tracking-[-0.04em]">
            SCRUB<span className="text-live">.</span>{" "}
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
              brainrot ed.
            </span>
          </a>
          <nav className="hidden items-center rounded-full border-2 border-ink bg-paper p-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] md:flex">
            <a href="#tier" className="rounded-full px-3 py-1.5 transition-colors hover:bg-live">
              fleet
            </a>
            <a href="#footage" className="rounded-full px-3 py-1.5 transition-colors hover:bg-live">
              footage
            </a>
            <a href="#squad" className="rounded-full px-3 py-1.5 transition-colors hover:bg-live">
              squad
            </a>
            <Link to="/blog" className="rounded-full px-3 py-1.5 transition-colors hover:bg-live">
              the zine
            </Link>
            <a href="/links.html" className="rounded-full px-3 py-1.5 transition-colors hover:bg-live">
              links
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full border-2 border-ink px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] shadow-[3px_3px_0_0_var(--ink)] sm:inline-block"
            >
              get in touch
            </a>
          </div>
        </div>
      </header>

      <div className="pt-[58px]">
        <Marquee items={MARQUEE} />

        {/* hero */}
        <section className="relative overflow-hidden px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap gap-2">
              <Sticker rot={-4}>pov: your city's lake</Sticker>
              <Sticker rot={3} c="bg-azure text-ink">
                it's giving foam
              </Sticker>
              <Sticker rot={-2} c="bg-clay text-ink">
                we sent a robot
              </Sticker>
            </div>

            <h1 className="mt-6 text-[15vw] font-bold leading-[0.85] tracking-[-0.055em] md:text-[9.5rem]">
              the lake
              <br />
              is <span className="font-serif italic text-live">cooked</span>
              <span className="text-live">.</span>
            </h1>

            <p className="mt-6 max-w-[38ch] text-[17px] leading-relaxed opacity-75">
              so we built a solar robot that skims the trash out, reads the water like a group chat,
              and does not doomscroll. you, however, may continue scrolling. it's educational now.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#tier"
                className="wobble rounded-full border-2 border-ink bg-live px-5 py-3 text-[14px] font-bold shadow-[5px_5px_0_0_var(--ink)]"
              >
                meet the fleet ↓
              </a>
              <button
                onClick={() => setMode("pro")}
                className="rounded-full border-2 border-ink bg-paper px-5 py-3 text-[14px] font-bold shadow-[5px_5px_0_0_var(--ink)]"
              >
                i'm an investor, be serious 🧠
              </button>
            </div>

            <div className="mt-10 overflow-hidden rounded-[28px] border-2 border-ink shadow-[10px_10px_0_0_var(--ink)]">
              <video
                src={heroVid.url}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* PROBLEMS? — the shrug spread */}
        <section className="border-y-2 border-ink bg-canvas px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
            <div className="relative">
              <div className="wobble w-fit rounded-[30px] border-2 border-ink bg-paper px-6 py-4 shadow-[6px_6px_0_0_var(--ink)]">
                <p className="font-mono text-[13px] font-bold uppercase leading-snug tracking-[0.1em]">
                  not my problem…
                </p>
              </div>
              <div className="ml-8 mt-1 flex gap-1.5">
                <span className="h-3 w-3 rounded-full border-2 border-ink bg-paper" />
                <span className="h-2 w-2 rounded-full border-2 border-ink bg-paper" />
              </div>
              <img
                src={memeShrug}
                alt="Shrugging doodle character"
                loading="lazy"
                className="mt-2 w-full rounded-[26px] border-2 border-ink bg-white object-cover"
              />
            </div>

            <div>
              <h2 className="text-[13vw] font-bold leading-[0.85] tracking-[-0.05em] md:text-[6.5rem]">
                problems?
              </h2>
              <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed opacity-80">
                70% of india's surface water is unfit to drink. 45% of urban water bodies have never
                been repaired. everyone agrees it's bad. everyone assumes it's someone else's ward
                office. the shrug is the whole problem.
              </p>

              <div className="mt-7 flex items-start gap-3">
                <span className="mt-1 text-2xl">↘</span>
                <div>
                  <p className="font-mono text-[12px] font-bold uppercase tracking-[0.2em]">
                    example
                  </p>
                  <p className="mt-2 max-w-[40ch] text-[15px] leading-relaxed opacity-75">
                    bellandur lake foamed onto the road. then it caught fire. repeatedly. four
                    election cycles later, the foam still shows up after every first rain.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                <Sticker rot={-3} c="bg-ink text-live">
                  the shrug ends here
                </Sticker>
                <Sticker rot={4}>send the robot</Sticker>
              </div>
            </div>
          </div>
        </section>

        {/* numbers */}
        <section className="px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-[10vw] font-bold leading-[0.9] tracking-[-0.05em] md:text-[4.5rem]">
              the numbers are <span className="font-serif italic text-live">not numbering</span>
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {NUMBERS.map((s, i) => (
                <div
                  key={s.n}
                  style={{ rotate: `${[-2, 1.5, -1, 2.5][i % 4]}deg` }}
                  className={`${["bg-live", "bg-azure", "bg-clay", "bg-paper"][i % 4]} wobble relative rounded-[24px] border-2 border-ink p-5 shadow-[6px_6px_0_0_var(--ink)]`}
                >
                  <span className="tape" aria-hidden="true" />
                  <p className="text-[38px] font-bold leading-none tracking-[-0.04em]">{s.n}</p>
                  <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] opacity-70">
                    {s.cap}
                  </p>
                  <p className="mt-2 text-[14px] leading-snug opacity-80">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* tier list */}
        <section
          id="tier"
          className="border-y-2 border-ink bg-ink px-4 py-14 text-paper md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[11vw] font-bold leading-[0.85] tracking-[-0.05em] text-paper md:text-[5rem]">
                fleet <span className="font-serif italic text-live">tier list</span>
              </h2>
              <Sticker rot={3} c="bg-live text-ink">
                all four. no debate.
              </Sticker>
            </div>

            <div className="mt-9 grid gap-5 md:grid-cols-2">
              {TIER.map((p, i) => (
                <article
                  key={p.id}
                  style={{ rotate: `${[-1.2, 1, 1.4, -1.6][i % 4]}deg` }}
                  className="wobble overflow-hidden rounded-[26px] border-2 border-live bg-paper text-ink shadow-[8px_8px_0_0_var(--live)]"
                >
                  {p.img ? (
                    <img
                      src={p.img}
                      alt={p.real}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[16/10] w-full items-center justify-center bg-azure">
                      <span className="font-serif text-[26vw] italic leading-none opacity-25 md:text-[9rem]">
                        {p.id}
                      </span>
                    </div>
                  )}
                  <div className="border-t-2 border-ink p-5">
                    <div className="flex items-center gap-3">
                      <span className="rounded-xl border-2 border-ink bg-live px-2.5 py-1 font-mono text-[12px] font-bold">
                        {p.tier}
                      </span>
                      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] opacity-60">
                        {p.id}
                      </span>
                    </div>
                    <h3 className="mt-3 text-[26px] font-bold leading-tight tracking-[-0.035em]">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed opacity-80">{p.line}</p>
                    <p className="mt-4 border-t border-ink/15 pt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] opacity-55">
                      irl: {p.real}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* random meme wall (randomised every load) */}
        <section className="px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-[10vw] font-bold leading-[0.9] tracking-[-0.05em] md:text-[4.5rem]">
                today's <span className="font-serif italic text-live">deck</span>
              </h2>
              <button
                onClick={() => setRandomMemes(shuffle(BANK).slice(0, 6))}
                className="wobble rounded-full border-2 border-ink bg-paper px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] shadow-[4px_4px_0_0_var(--ink)]"
              >
                reshuffle 🔀
              </button>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {randomMemes.map((m, i) => (
                <div
                  key={m.tag + i}
                  style={{ rotate: `${[-2, 1.6, -1.2, 2.2, -1.8, 1][i % 6]}deg` }}
                  className={`${["bg-live", "bg-paper", "bg-azure", "bg-clay", "bg-paper", "bg-live"][i % 6]} wobble relative rounded-[24px] border-2 border-ink p-5 shadow-[6px_6px_0_0_var(--ink)]`}
                >
                  <span className="tape" aria-hidden="true" />
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
                    {m.tag}
                  </p>
                  {i % 3 === 0 && (
                    <img
                      src={[memeShock, memeBuff, memeCry, memeShrug][i % 4]}
                      alt=""
                      loading="lazy"
                      className="mt-3 w-full rounded-2xl border-2 border-ink bg-white object-cover"
                    />
                  )}
                  <p className="mt-4 text-[21px] font-medium leading-[1.1] tracking-[-0.03em]">
                    {m.top}
                  </p>
                  <p className="mt-2 text-[15px] leading-snug opacity-75">{m.bottom}</p>
                  {m.fact && (
                    <p className="mt-4 rounded-xl border-2 border-current/20 px-3 py-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] opacity-70">
                      {m.fact}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* quiz + hot takes */}
        <section className="border-y-2 border-ink bg-canvas px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-[10vw] font-bold leading-[0.9] tracking-[-0.05em] md:text-[4.5rem]">
                be <span className="font-serif italic text-live">honest</span> for 20 seconds
              </h2>
              <Sticker rot={-3} c="bg-azure text-ink">
                nobody's watching (we are)
              </Sticker>
            </div>
            <div className="mt-8 grid items-start gap-6 md:grid-cols-2">
              <WhichBot />
              <HotTakes />
            </div>
          </div>
        </section>

        <Marquee
          items={["raw footage", "no renders", "the robot works at night", "it doesn't doomscroll"]}
          dark
        />

        {/* clips */}
        <section id="footage" className="px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-[10vw] font-bold leading-[0.9] tracking-[-0.05em] md:text-[4.5rem]">
              caught in <span className="font-serif italic text-live">4k</span>
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {CLIPS.map((c, i) => (
                <figure
                  key={c.src}
                  style={{ rotate: `${[-1.5, 1, -1][i % 3]}deg` }}
                  className="wobble overflow-hidden rounded-[24px] border-2 border-ink bg-ink shadow-[7px_7px_0_0_var(--ink)]"
                >
                  <video
                    src={c.src}
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                    className="aspect-[9/12] w-full bg-ink object-contain"
                  />
                  <figcaption className="border-t-2 border-live/40 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/70">
                    {c.cap}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* comment section */}
        <section className="px-4 pb-14 md:px-8 md:pb-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-[10vw] font-bold leading-[0.9] tracking-[-0.05em] md:text-[4rem]">
                the <span className="font-serif italic text-live">comments</span>
              </h2>
              <Sticker rot={3} c="bg-clay text-ink">
                not real. but they could be.
              </Sticker>
            </div>
            <CommentSection />
          </div>
        </section>

        {/* squad */}
        <section id="squad" className="border-y-2 border-ink bg-canvas px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-[10vw] font-bold leading-[0.9] tracking-[-0.05em] md:text-[4.5rem]">
              the <span className="font-serif italic text-live">squad</span> (undergrads, btw)
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {SQUAD.map((p, i) => (
                <div
                  key={p.name}
                  style={{ rotate: `${[-2, 1.4, -1, 2][i % 4]}deg` }}
                  className="wobble overflow-hidden rounded-[22px] border-2 border-ink bg-paper shadow-[5px_5px_0_0_var(--ink)]"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                  <div className="border-t-2 border-ink px-3 py-2.5">
                    <p className="text-[15px] font-bold tracking-tight">{p.name}</p>
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] opacity-60">
                      {p.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* doomfeed CTA + contact */}
        <section id="contact" className="px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-6xl">📱</p>
            <h2 className="mt-4 text-[11vw] font-bold leading-[0.88] tracking-[-0.05em] md:text-[5rem]">
              doomscroll, but you{" "}
              <span className="font-serif italic text-live">learn something</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[44ch] text-[16px] leading-relaxed opacity-75">
              {BANK.length}+ meme cards, shuffled fresh every single time you open it. tap any card
              for the real water fact hiding behind the joke.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <DoomFeed trigger="inline" />
              <a
                href="mailto:scrubrobotics@gmail.com"
                className="wobble rounded-full border-2 border-ink bg-paper px-5 py-3 text-[14px] font-bold shadow-[5px_5px_0_0_var(--ink)]"
              >
                talk to humans ✉
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t-2 border-ink bg-ink px-4 py-10 text-paper md:px-8">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
            <p className="text-[19px] font-bold tracking-[-0.04em]">
              SCRUB<span className="text-live">.</span>
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60">
              bengaluru · patent 202541085700 A · zero diesel
            </p>
            <a
              href="https://instagram.com/team_.scrub"
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-live transition-colors hover:text-paper"
            >
              @team_.scrub
            </a>
            <button
              onClick={() => setMode("pro")}
              className="rounded-full border-2 border-live px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-live"
            >
              back to pro mode 🧠
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
