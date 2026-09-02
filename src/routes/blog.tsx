import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { WaterField } from "@/components/water-field";

import monsoon from "@/assets/media/monsoon.png.asset.json";
import robotZine from "@/assets/media/robot_zine.jpg.asset.json";
import debrisZine from "@/assets/media/debris_zine.jpg.asset.json";
import aiPatternZine from "@/assets/media/ai_pattern_zine.jpg.asset.json";
import heroPoster from "@/assets/blog_hero_poster.jpg.asset.json";
import trashZine from "@/assets/blog_trash.jpg.asset.json";
import cadZine from "@/assets/blog_cad_zine.jpg.asset.json";
import fieldZine from "@/assets/blog_field_zine.jpg.asset.json";

const HERO = monsoon.url;

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Field Notes — SCRUB Robotics dispatches from the water line" },
      {
        name: "description",
        content:
          "Unfiltered build logs from the team putting autonomous robots on India's dying lakes. Failures, telemetry dumps, AI experiments and 4am field trials.",
      },
      { property: "og:title", content: "Field Notes — SCRUB Robotics Blog" },
      {
        property: "og:description",
        content:
          "Build logs, failures and field trials from the crew cleaning India's urban lakes with autonomous robots.",
      },
      { property: "og:image", content: HERO },
      { name: "twitter:image", content: HERO },
      { name: "twitter:title", content: "Field Notes — SCRUB Robotics Blog" },
      {
        name: "twitter:description",
        content: "Raw build logs from an autonomous lake-cleaning robot startup.",
      },
    ],
  }),
  component: Blog,
});

/* ------------------------------------------------------------------ data */

export type Post = {
  kicker: string;
  title: string;
  titleParts?: [string, string];
  dek: string;
  read: string;
  date: string;
  img: string;
  n?: string;
  tone?: string;
  body: string[];
};

const featured: Post = {
  kicker: "Issue 08 · Telemetry",
  title: "What actually happens to a lake in a Bengaluru monsoon.",
  titleParts: ["What actually happens to a lake in a", "Bengaluru monsoon."],
  dek: "Four hours of rain. Dissolved oxygen fell off a cliff, turbidity tripled, and the lake told us exactly what nobody was recording.",
  read: "9 min",
  date: "18 Jul 2026",
  img: HERO,
  body: [
    "At 15:40 the first drop hit the hull. By 19:55 our sensor stack had logged 3,780 rows and Kengeri Lake had become a different water body entirely.",
    "Turbidity went from 18.6 NTU to 61.4 NTU in under ninety minutes — storm drains flushing four months of street silt, packaging and oil straight into the basin. Dissolved oxygen collapsed from 3.2 mg/L to 1.1 mg/L. Below 2 mg/L, fish start dying. Nobody was measuring this. There is no public dataset for what a Bengaluru lake does during rain.",
    "The interesting part is the recovery curve. DO clawed back to 2.4 mg/L after eleven hours, then flatlined — the organic load from the inflow kept eating oxygen for three more days. That lag is the whole argument for continuous monitoring: a monthly grab sample would have shown you a boring, normal lake.",
    "We're publishing the full CSV. If you want to model it, take it. The point of Field Notes is that the data leaves the building.",
  ],
};

const side: Post[] = [
  {
    kicker: "Issue 07 · Field log",
    title: "We put a robot in a lake that hasn't been cleaned since 2011.",
    dek: "Six hours. 41 kg of plastic. One motor that gave up. Everything that went wrong before anything went right.",
    read: "8 min",
    date: "12 Jul 2026",
    img: heroPoster.url,
    tone: "clay",
    body: [
      "The lake had a crust. Not a film — a crust. Thermocol, chip packets and water hyacinth matted thick enough that the first pass barely parted it.",
      "Hour one: the conveyor jammed on a submerged tarpaulin. Hour two: we cut the tarp free by hand, waist-deep, and learned why marine-grade fasteners cost what they cost. Hour three through six: the robot did exactly what it was built to do and pulled 41 kg aboard without a single human in the water.",
      "The starboard drive motor died at 17:20 — a sealing failure we'd flagged as low-risk and were wrong about. V2 gets a redesigned housing.",
      "Six hours of runtime beat a two-person manual crew's full day, at zero fuel and zero risk to anyone's lungs. That's the number we take to BBMP.",
    ],
  },
  {
    kicker: "Issue 06 · AI",
    title: "Our model thought a dead pigeon was a Coke bottle.",
    dek: "Debris detection from 61% to 90% — 4,000 hand-labelled frames, zero GPU budget, one very confused neural net.",
    read: "6 min",
    date: "28 Jun 2026",
    img: debrisZine.url,
    tone: "forest",
    body: [
      "Open-source litter datasets are shot on pavements in daylight. Lakes are none of those things: everything is half-submerged, glare-blown, and moving.",
      "Our first YOLOv8 run hit 61% precision and hallucinated confidently — sun glint became white plastic, a dead pigeon became a bottle, hyacinth flowers became foam.",
      "The fix wasn't clever. It was 4,000 frames of our own footage, hand-labelled across eleven classes, plus aggressive augmentation for glare and motion blur. Precision landed at 90.4% at 24 fps on an edge board.",
      "What we'd do differently: label the reflections as their own class from day one. Teaching the model what water lies like matters more than teaching it what trash looks like.",
    ],
  },
];

const rest: Post[] = [
  {
    n: "05",
    kicker: "Hardware",
    title: "The conveyor broke. Twice. On camera.",
    dek: "SS316L, a 3D-printed sprocket, and the exact moment we stopped trusting hardware-store bearings.",
    read: "5 min",
    date: "09 Jun 2026",
    img: robotZine.url,
    body: [
      "Failure one: a PLA sprocket sheared under wet load. Predictable in hindsight, printed at 30% infill because we were in a hurry the night before a demo.",
      "Failure two: the replacement held, and the bearing behind it didn't. Non-marine bearings in lake water last about four hours before the grit wins.",
      "We moved the whole drive train to SS316L, sealed the bearings, and added a slip clutch so a jam stalls the belt instead of destroying it.",
      "Both failures are in the trial footage. We left them in.",
    ],
  },
  {
    n: "04",
    kicker: "Data",
    title: "A lake's pH is a mood ring. We logged it every 4 seconds.",
    dek: "What 2.1 million telemetry rows say about a water body nobody is watching.",
    read: "7 min",
    date: "22 May 2026",
    img: trashZine.url,
    body: [
      "pH swings 0.9 units across a single day at Kengeri — photosynthesis pulls it up through the afternoon, respiration drags it down overnight.",
      "A grab sample at 11 AM tells you the lake is fine. A grab sample at 5 AM tells you it's in trouble. Both are 'the data'.",
      "Across 2.1 million rows the eutrophication signature is unmistakable: rising chlorophyll-a, widening diel pH swing, oxygen minimums creeping earlier each week.",
      "You can forecast the algal bloom roughly fourteen days out. That's enough time to act, if anyone is watching.",
    ],
  },
  {
    n: "03",
    kicker: "Field",
    title: "4:40 AM. Waist-deep. Battery at 11%.",
    dek: "The unglamorous choreography of testing a 25 kg robot before the city wakes up.",
    read: "4 min",
    date: "03 May 2026",
    img: fieldZine.url,
    body: [
      "Permissions are easier at dawn, the water is calmer, and nobody films you failing.",
      "A trial day is: 4:00 load-out, 4:40 launch, three runs, one thing breaks, 8:30 pack-up, class at 9.",
      "The 11% battery moment was a telemetry bug — the pack was fine, the reporting wasn't. We spent two hours diagnosing a robot that was never in danger.",
      "Field work is 80% logistics. Anyone who shows you only the highlight reel is selling something.",
    ],
  },
  {
    n: "02",
    kicker: "Policy",
    title: "We read the BBMP lake tender. It's worse than you think.",
    dek: "Manual cleanup contracts, monthly at best, measured by nothing. This is the gap.",
    read: "8 min",
    date: "14 Apr 2026",
    img: aiPatternZine.url,
    body: [
      "The tenders pay for labour-days, not for outcomes. There is no clause tying payment to water quality, debris mass, or any measurable delta.",
      "Cleanup frequency is monthly on paper. In practice, plenty of listed water bodies haven't been touched in years — 45.2% have never been repaired or maintained at all.",
      "₹2,800–3,400 Cr a year moves through this system nationally with almost no instrumentation attached to it.",
      "Our pitch to a ULB isn't 'buy a robot'. It's 'get a number you can defend in an audit'.",
    ],
  },
  {
    n: "01",
    kicker: "Origin",
    title: "A CAD file, a college lab, and a lake we couldn't unsee.",
    dek: "How a semester project turned into a patent-published robot with a municipal partner.",
    read: "6 min",
    date: "02 Mar 2026",
    img: cadZine.url,
    body: [
      "It started as a coursework brief and a lake three kilometres from campus that smelled like a warning.",
      "The first CAD model was a single-hull skimmer that would have capsized on day one. The catamaran came from a professor asking one blunt question about stability.",
      "Eighteen months later: patent 202541085700 published, TRL 4, field validation with BBMP, and a team of seventeen.",
      "Nothing about this was a straight line, and none of it happened in a pitch deck.",
    ],
  },
];


const tickerWords = [
  "BUILD LOGS",
  "NO PR SPEAK",
  "THINGS THAT BROKE",
  "TELEMETRY DUMPS",
  "4AM FIELD TRIALS",
  "RAW FOOTAGE",
];

/* ------------------------------------------------------------------ ui */

function ScrollProgress() {
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
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div className="h-full bg-clay" style={{ width: `${p}%` }} />
    </div>
  );
}

function ZineNav() {
  return (
    <header className="sticky top-0 z-50 bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src="/favicon.svg" alt="SCRUB Logo" className="h-9 w-9 rounded-lg" />
          <div className="flex flex-col leading-none">
            <span className="text-lg font-medium tracking-tight">Scrub</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink-40">
              Field Notes · Zine
            </span>
          </div>
        </Link>

        <nav className="hidden items-center rounded-full bg-ink px-2 py-2 text-paper md:flex">
          <Link
            to="/"
            className="rounded-full px-4 py-1.5 text-[13px] text-paper/80 transition-colors hover:bg-paper/10 hover:text-paper"
          >
            Home
          </Link>
          {[
            ["Products", "/#products"],
            ["Technology", "/#technology"],
            ["Team", "/#team"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-4 py-1.5 text-[13px] text-paper/80 transition-colors hover:bg-paper/10 hover:text-paper"
            >
              {label}
            </a>
          ))}
          <span className="rounded-full bg-paper px-4 py-1.5 text-[13px] font-medium text-ink">
            Blog
          </span>
        </nav>

        <a
          href="mailto:team.scrub0415@gmail.com?subject=SCRUB%20Field%20Notes"
          className="group hidden items-center gap-2 rounded-full bg-surface px-5 py-2.5 text-[13px] font-medium ring-1 ring-ink/10 transition-colors hover:bg-ink hover:text-paper md:inline-flex"
        >
          Subscribe
          <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </header>
  );
}

function Ticker() {
  return (
    <div className="overflow-hidden border-y border-ink-10 bg-ink text-paper">
      <div className="marquee-track flex whitespace-nowrap py-2.5 font-mono text-[10px] uppercase tracking-[0.3em]">
        {[...tickerWords, ...tickerWords, ...tickerWords, ...tickerWords].map((w, i) => (
          <span key={i} className="mx-6 flex items-center gap-6">
            <span className="text-clay">✳</span>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

function Masthead() {
  return (
    <section className="relative overflow-hidden px-5 pb-8 pt-12 md:px-8 md:pt-16">
      <div className="aurora aurora-soft" />
      <WaterField />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-40">
              Vol. 01 — Dispatches from the water line
            </p>
            <h1 className="mt-4 text-[16vw] font-medium leading-[0.82] tracking-[-0.04em] md:text-[9.5rem]">
              FIELD
              <br />
              <span className="font-serif italic text-gradient">notes</span>
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {["no PR voice", "receipts only", "built in public"].map((t, i) => (
                <span
                  key={t}
                  className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${
                    i === 1 ? "bg-ink text-paper" : "bg-clay text-paper"
                  } ${i % 2 ? "rotate-[2deg]" : "rotate-[-3deg]"}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <p className="max-w-xs rotate-[-1deg] rounded-2xl bg-paper p-4 text-sm leading-relaxed text-ink-70 ring-1 ring-ink/10">
            We're building an autonomous robot for lakes nobody funds. This is the unedited paper
            trail — the breakages, the data, the 90%-accurate hallucinations.
          </p>

        </div>
        <div className="mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-40">
          <span className="h-px w-10 bg-ink-30" />
          Keep scrolling. It gets worse (better).
        </div>
      </div>
    </section>
  );
}

function FeaturedRow({ onOpen }: { onOpen: (p: Post) => void }) {
  return (
    <section className="px-5 pb-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.35fr_1fr]">
        <button
            type="button"
            onClick={() => onOpen(featured)}
            className="group relative block overflow-hidden rounded-3xl bg-ink p-2 text-left ring-1 ring-ink/10"
          >
            <div className="relative overflow-hidden rounded-[1.35rem]">
              <img
                src={featured.img}
                alt="Zine poster: monsoon telemetry from a Bengaluru lake"
                width={1024}
                height={1536}
                className="h-[62vh] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] md:h-[80vh]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

              <span className="absolute left-5 top-5 rounded-full bg-clay px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-paper">
                {featured.kicker}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6 text-paper md:p-9">
                <h2 className="max-w-[16ch] text-[8.5vw] font-medium leading-[0.88] tracking-[-0.035em] md:text-6xl">
                  {featured.titleParts?.[0]}{" "}
                  <span className="font-serif italic text-clay">{featured.titleParts?.[1]}</span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-paper/70">{featured.dek}</p>
                <div className="mt-6 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/60">
                  <span>{featured.date}</span>
                  <span className="h-px w-6 bg-paper/30" />
                  <span>{featured.read} read</span>
                  <span className="ml-auto inline-flex items-center gap-2 text-paper transition-transform group-hover:translate-x-1">
                    Read it →
                  </span>
                </div>
              </div>
            </div>
          </button>

        <div className="flex flex-col gap-5">
          {side.map((p) => (
            <button
              type="button"
              key={p.title}
              onClick={() => onOpen(p)}
              className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl bg-surface text-left ring-1 ring-ink/10 transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="relative min-h-[9rem] flex-1 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <span
                  className={`absolute left-4 top-4 rotate-[-4deg] rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper ${
                    p.tone === "clay" ? "bg-clay" : "bg-forest"
                  }`}
                >
                  {p.kicker}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-medium leading-[1.04] tracking-[-0.02em] transition-colors group-hover:text-clay md:text-[1.75rem]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-60">{p.dek}</p>
                <div className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-40">
                  <span>{p.date}</span>
                  <span className="h-px w-5 bg-ink-30" />
                  <span>{p.read}</span>
                  <span className="ml-auto text-ink transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

function Pullquote() {
  return (
    <section className="relative overflow-hidden border-y border-ink-10 bg-surface px-5 py-16 md:px-8 md:py-24">
      <WaterField />
      <div className="relative mx-auto max-w-5xl text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-40">
          Overheard at trial 14
        </p>
        <p className="mt-6 text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-5xl">
          “Nobody is coming to fix this lake.{" "}
          <span className="font-serif italic text-clay">So we built the thing that would.</span>”
        </p>
      </div>
    </section>
  );
}

function Archive({ onOpen }: { onOpen: (p: Post) => void }) {
  return (
    <section id="latest" className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-4xl font-medium tracking-[-0.03em] md:text-6xl">The back issues</h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-40">
            {rest.length} entries
          </span>
        </div>

        <div className="mt-10 divide-y divide-ink-10 border-y border-ink-10">
          {rest.map((p) => (
            <button
              type="button"
              key={p.n}
              onClick={() => onOpen(p)}
              className="group grid w-full gap-5 py-7 text-left transition-colors md:grid-cols-[7rem_1fr_14rem] md:items-center"
            >
              <div className="flex items-center gap-3">
                <span className="font-serif text-4xl italic text-clay transition-transform group-hover:-rotate-6">
                  {p.n}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-40">
                  {p.kicker}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-medium leading-[1.08] tracking-[-0.02em] transition-colors group-hover:text-clay md:text-[2rem]">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-ink-60">{p.dek}</p>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-40">
                  {p.date} · {p.read}
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl ring-1 ring-ink/10 transition-transform duration-500 group-hover:rotate-1">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-36 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-28"
                />
              </div>
            </button>
          ))}

        </div>
      </div>
    </section>
  );
}

function SubscribeStrip() {
  return (
    <section className="px-5 pb-20 md:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-ink px-6 py-14 text-paper md:px-14 md:py-20">
        <WaterField tone="dark" />
        <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/50">
              One dispatch a fortnight
            </p>
            <h2 className="mt-5 text-4xl font-medium leading-[0.95] tracking-[-0.035em] md:text-6xl">
              Get the log before <span className="font-serif italic text-clay">the launch.</span>
            </h2>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-paper/60">
              Raw build notes, telemetry dumps and trial footage. No newsletter voice, no growth-hack
              subject lines.
            </p>
            <a
              href="mailto:team.scrub0415@gmail.com?subject=Subscribe%20to%20SCRUB%20Field%20Notes"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-[13px] font-medium text-ink transition-transform hover:translate-x-0.5"
            >
              Put me on the list →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ reader */

function PostReader({ post, onClose }: { post: Post | null; onClose: () => void }) {
  useEffect(() => {
    if (!post) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm md:items-center md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
      onClick={onClose}
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className="quiet-rise relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] border-2 border-ink bg-canvas shadow-[8px_8px_0_0_var(--ink)] md:rounded-[2rem]"
      >
        <div className="relative h-56 overflow-hidden border-b-2 border-ink md:h-72">
          <img src={post.img} alt={post.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
          <span className="absolute left-5 top-5 rotate-[-3deg] rounded-full border-2 border-ink bg-live px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
            {post.kicker}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-paper text-ink transition-transform hover:rotate-90"
          >
            ✕
          </button>
          <h2 className="absolute inset-x-0 bottom-0 p-6 text-3xl font-medium leading-[0.95] tracking-[-0.03em] text-paper md:text-4xl">
            {post.title}
          </h2>
        </div>

        <div className="px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-40">
            <span>{post.date}</span>
            <span className="h-px w-6 bg-ink-30" />
            <span>{post.read} read</span>
          </div>
          <p className="mt-6 text-lg leading-snug tracking-[-0.01em] text-ink">{post.dek}</p>
          <div className="mt-6 space-y-5">
            {post.body.map((para, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-ink-70">
                {para}
              </p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t-2 border-ink pt-6">
            <a
              href="mailto:team.scrub0415@gmail.com?subject=SCRUB%20Field%20Notes"
              className="rounded-full border-2 border-ink bg-live px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink shadow-[4px_4px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5"
            >
              Get the next dispatch
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border-2 border-ink px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Back to the zine
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

function Blog() {
  const [open, setOpen] = useState<Post | null>(null);
  return (
    <div className="min-h-screen bg-canvas">
      <ScrollProgress />
      <ZineNav />
      <Ticker />
      <Masthead />
      <FeaturedRow onOpen={setOpen} />
      <Pullquote />
      <Archive onOpen={setOpen} />
      <SubscribeStrip />
      <PostReader post={open} onClose={() => setOpen(null)} />
    </div>
  );
}

