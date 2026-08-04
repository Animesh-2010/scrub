import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { Reveal, useInView } from "@/components/reveal";
import { WaterField } from "@/components/water-field";
import { DepthDive } from "@/components/depth-dive";
import { StickerWall } from "@/components/sticker-wall";
import { ImpactCalc } from "@/components/impact-calc";
import { MemeBreak, VibeCheck, ScrollRank } from "@/components/funky";
import { ModeProvider, ModeSwitch, useMode } from "@/components/mode";
const BrainrotSite = lazy(() =>
  import("@/components/brainrot-site").then(({ BrainrotSite }) => ({ default: BrainrotSite })),
);

import v1Img from "@/assets/media/v1.jpg.asset.json";
import v2Img from "@/assets/media/v2.jpg.asset.json";
import heroVid from "@/assets/media/hero.mp4.asset.json";
import robotZine from "@/assets/media/robot_zine.jpg.asset.json";

import shanta from "@/assets/team/shanta.jpg.asset.json";
import badari from "@/assets/team/badari.jpg.asset.json";
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

const OG_IMG = robotZine.url;
const HERO_POSTER = "/assets/videos/hero-lake-poster.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SCRUB Robotics — Autonomous cleanup for India's urban lakes" },
      {
        name: "description",
        content:
          "SCRUB builds autonomous, solar-powered robots that pull waste out of India's urban lakes and stream live water-quality data. Patent published. Field-tested at Kengeri Lake with BBMP.",
      },
      { property: "og:title", content: "SCRUB Robotics — Autonomous cleanup for India's urban lakes" },
      {
        property: "og:description",
        content:
          "Four robot platforms. 90% AI debris detection. Live water telemetry. India-built for 69,485 urban water bodies.",
      },
      { property: "og:image", content: OG_IMG },
      { name: "twitter:image", content: OG_IMG },
      { name: "twitter:title", content: "SCRUB Robotics — Autonomous lake cleaning, built in India" },
      {
        name: "twitter:description",
        content: "Solar robots cleaning India's lakes while streaming live water-quality data.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.scrubrobotics.in/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SCRUB Robotics",
          url: "https://www.scrubrobotics.in",
          email: "team.scrub0415@gmail.com",
          telephone: "+91-9569886982",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bengaluru",
            postalCode: "560059",
            addressCountry: "IN",
          },
          description:
            "Autonomous, solar-powered surface robots for continuous urban water body cleanup and real-time water-quality monitoring.",
        }),
      },
    ],
  }),
  component: Home,
});

/* ---------------------------------------------------------------- data */

const NAV = [
  ["Problem", "#problem"],
  ["Products", "#products"],
  ["Team", "#team"],
];

const TICKER = [
  "PATENT 202541085700 A · PUBLISHED",
  "TRL 4 · FIELD VALIDATED",
  "BBMP · KENGERI LAKE",
  "90% AI DEBRIS PRECISION",
  "RVCE INCUBATED",
  "ZERO EMISSIONS",
];

const STATS = [
  { v: 4, suffix: "", label: "robot variants across water body types" },
  
  { v: 2800, prefix: "₹", suffix: "Cr+", label: "annual government spend on lake remediation" },
  { v: 69485, suffix: "", label: "urban water bodies in India" },
];

const PRODUCTS = [
  {
    id: "V1",
    name: "Lake Cleaning Platform",
    status: "Developed & field-validated",
    media: { type: "img" as const, src: v1Img.url },
    blurb:
      "A semi-industrial floating catamaran that removes floating plastic, organic debris, and aquatic weeds from urban lakes and reservoirs. The flagship — field-tested, patent-published.",
    points: [
      "Twin-hull catamaran · maximum stability",
      "Continuous conveyor · 50 kg+ per cycle target",
      "Solar-assisted · 9.9 h autonomous runtime",
      "YOLOv8 AI debris detection · 90%+ precision",
    ],
  },
  {
    id: "V2",
    name: "Passive Intake Robot",
    status: "Developed & validated",
    media: { type: "img" as const, src: v2Img.url },
    blurb:
      "A conveyor-less design that uses hydrodynamics to collect waste — no actuators, no motors for intake. Forward motion opens the door; reversing closes it.",
    points: [
      "Zero intake power consumption",
      "Minimal moving parts · low maintenance",
      "Lightweight · easily transportable",
      "Scalable foundation for autonomous fleets",
    ],
  },
  {
    id: "V3",
    name: "River Waste Interceptor",
    status: "In development",
    media: null,
    blurb:
      "A static shore installation for rivers and canals. Anchored at pollution chokepoints, a floating boom funnels waste into an inclined conveyor — delivering debris directly to the riverbank.",
    points: [
      "Static installation · no boat required",
      "100% solar powered · continuous operation",
      "Floating boom guides waste to intake",
      "Modular · scalable across pollution hotspots",
    ],
  },
  {
    id: "V4",
    name: "Water Analytics Bot",
    status: "In development",
    media: null,
    blurb:
      "A compact, agile floating bot carrying a fully customisable sensor payload. Patrols in systematic patterns, collecting high-density spatial data and streaming it live to a cloud dashboard.",
    points: [
      "20+ sensor payload · pH, DO, TDS, turbidity & more",
      "Real-time transmission · cloud dashboard",
      "Accesses shallow & confined zones",
      "Standalone or paired with the V1–V3 fleet",
    ],
  },
];

const BARS = [
  { label: "Urban water bodies non-functional", pct: 16.3, display: "16.3%" },
  { label: "Water bodies never repaired or maintained", pct: 45.2, display: "45.2%" },
  { label: "Surface water unfit for consumption", pct: 70, display: "70%" },
  { label: "Bengaluru lake area lost since 1970", pct: 80, display: "80%" },
  { label: "Cities at risk of groundwater exhaustion", pct: 60, display: "21 major" },
];


const TIMELINE = [
  {
    group: "Validated",
    items: [
      ["Sep 2024", "Design Initiated", "Engineering design begins, targeting Bengaluru's urban lake pollution crisis.", ""],
      ["Jan 2025", "Prototype V1 — Pool Trial", "Conveyor mechanism validated. Onboard AI debris detection confirmed functional.", "TRL 3"],
      ["Sep 2025", "Patent Filed", "Application filed with the Indian Patent Office — navigation, conveyor and IoT monitoring as one system.", "Filed"],
      ["Oct 2025", "Patent Published", "Indian Patent Office publishes the application.", "Published"],
      ["Apr 2026", "Kengeri Lake Trial", "Autonomous run with BBMP coordination. 20+ hours of cumulative field testing.", "TRL 4"],
    ],
  },
  {
    group: "In motion",
    items: [
      ["Jun 2026", "Commercial Prototype · Field Trial 2", "Custom PCB v2 in fabrication alongside a redesigned 3D-printed chassis. Second Kengeri trial underway.", "In fabrication"],
    ],
  },
  {
    group: "Roadmap",
    items: [
      ["+12 Months", "Municipal Pilot Deployments", "Pilots with municipalities, alongside the launch of V2, V3 and V4 with early commercial customers.", ""],
      ["+2 Years", "Fleet Operations, Multi-City", "Coordinated fleet deployments across Indian cities, unified under one monitoring dashboard.", ""],
      ["+5 Years", "Beyond the Surface", "Underwater inspection, desilting, and a nationwide environmental data infrastructure layer.", ""],
    ],
  },
];

const FACULTY = [
  { name: "Dr. Shanta Rangaswamy", role: "HoD, Computer Science", dept: "RVCE Bengaluru", img: shanta.url },
  { name: "Dr. K. Badari Nath", role: "Professor, Computer Science", dept: "RVCE Bengaluru", img: badari.url },
];

const LEADS = [
  { name: "Krishna Purwar", role: "Hardware Development", dept: "EIE · RVCE", img: krishna.url },
  { name: "Siddhant Singh", role: "Embedded Systems", dept: "EIE · RVCE", img: siddhant.url },
  { name: "Animesh Sapra", role: "Software · AI/ML", dept: "CSE · RVCE", img: animesh.url },
  { name: "Atharva Agrawal", role: "Software · IoT", dept: "ISE · RVCE", img: atharva.url },
];

const CREW = [
  { name: "Dishita", role: "Software · AI/ML", img: dishita.url },
  { name: "Farhan", role: "Software · Sensor Integration", img: farhan.url },
  { name: "Suraj", role: "Software · Algorithms", img: "/assets/images/team/Suraj.jpeg" },
  { name: "Varsha", role: "Hardware · Embedded Systems", img: varsha.url },
  { name: "Lakshay", role: "Hardware · IoT", img: lakshay.url },
  { name: "Hariharan", role: "Mechanical Design", img: "/assets/images/team/Hariharan.jpeg" },
  { name: "Shivansh", role: "Team Member", img: "/assets/images/team/Shivansh.jpeg" },
  { name: "Skanda", role: "Mechanical Design", img: skanda.url },
  { name: "Siddiq", role: "Mechanical Design", img: siddiq.url },
];

/* ---------------------------------------------------------------- bits */

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const { ref, seen } = useInView<HTMLSpanElement>(0.4);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!seen) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);

  const shown = to >= 1000 ? Math.round(n).toLocaleString("en-IN") : Math.round(n).toString();
  return (
    <span ref={ref}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="sticker sticker-live inline-block -rotate-2 whitespace-pre-line text-center">
      {children}
    </span>
  );
}


/* ---------------------------------------------------------------- nav */

function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-colors duration-500 ${
          solid
            ? "border-b border-ink-10 bg-canvas/85 text-ink backdrop-blur-xl"
            : "border-b border-transparent text-paper"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <span
              className={`grid h-8 w-8 place-items-center rounded-full text-[15px] font-bold italic ${
                solid ? "bg-ink text-paper" : "bg-paper text-ink"
              }`}
            >
              S
            </span>
            <span className="text-[17px] font-medium tracking-tight">Scrub</span>
          </a>

          <nav
            className={`hidden items-center rounded-full p-1 backdrop-blur md:flex ${
              solid ? "bg-ink/[0.055] ring-1 ring-ink/10" : "bg-white/10 ring-1 ring-white/20"
            }`}
          >
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className={`rounded-full px-3.5 py-1.5 text-[12.5px] transition-colors ${
                  solid
                    ? "text-ink-60 hover:bg-paper hover:text-ink"
                    : "text-paper/75 hover:bg-white/15 hover:text-paper"
                }`}
              >
                {label}
              </a>
            ))}
            <Link
              to="/blog"
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] transition-colors ${
                solid
                  ? "text-ink-60 hover:bg-paper hover:text-ink"
                  : "text-paper/75 hover:bg-white/15 hover:text-paper"
              }`}
            >
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="btn-glow hidden rounded-full px-5 py-2 text-[12.5px] font-semibold sm:inline-flex"
            >
              Get in touch →
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className={`rounded-full p-2 md:hidden ${
                solid ? "ring-1 ring-ink/10" : "ring-1 ring-white/25"
              }`}
            >
              <span className="block h-px w-4 bg-current" />
              <span className="mt-1 block h-px w-4 bg-current" />
            </button>
          </div>
        </div>
      </div>


      {open && (
        <div className="border-b border-ink-10 bg-canvas px-5 pb-5 md:hidden">
          {[...NAV, ["Contact", "#contact"]].map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block border-b border-ink-10 py-3 text-sm"
            >
              {label}
            </a>
          ))}
          <Link to="/blog" className="block py-3 text-sm">
            Blog
          </Link>
        </div>
      )}
    </header>
  );
}

function Ticker() {
  return (
    <div className="overflow-hidden border-y border-ink-10 bg-ink text-paper">
      <div className="marquee-track flex whitespace-nowrap py-2 font-mono text-[9.5px] uppercase tracking-[0.28em]">
        {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
          <span key={i} className="mx-5 flex items-center gap-5 text-paper/70">
            <span className="text-clay">✳</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- hero */

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink pt-24 text-paper"
    >
      <div className="absolute inset-0">
        <video
          className="h-full w-full scale-105 object-cover"
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={heroVid.url} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#04201B]/85 via-[#04201B]/45 to-[#04201B]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_20%,rgba(15,164,124,0.35),transparent_70%),radial-gradient(60%_50%_at_85%_35%,rgba(46,155,216,0.32),transparent_72%)]" />
        <WaterField tone="dark" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pb-20">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/80 glass-dark">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
            </span>
            Patent 202541085700 A · BBMP field-endorsed · Bengaluru
          </span>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mt-7 text-[14vw] font-medium leading-[0.84] tracking-[-0.05em] md:text-[9.5rem]">
            Clean water,
            <br />
            <span className="font-serif italic text-gradient">on autopilot.</span>
          </h1>
        </Reveal>

        <div className="mt-10">
          <Reveal delay={160}>
            <p className="max-w-xl text-[16px] leading-relaxed text-paper/75">
              India has <span className="text-paper">69,485</span> urban water bodies and almost no
              way to keep them clean. SCRUB deploys solar robots that skim the waste, read the water,
              and stream the proof — every single day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#products"
                className="btn-glow rounded-full px-7 py-3.5 text-[13.5px] font-semibold"
              >
                See the fleet →
              </a>
              <a
                href="#contact"
                className="rounded-full px-7 py-3.5 text-[13.5px] font-medium text-paper transition-colors glass-dark hover:bg-white/15"
              >
                Partner with us
              </a>
              <span className="ml-1 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45 sm:inline">
                Live at Kengeri Lake
              </span>
            </div>
          </Reveal>
        </div>


        <div className="mt-12 flex items-center gap-3 text-paper/45">
          <span className="scroll-cue block h-6 w-px bg-paper/50" />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.28em]">Scroll</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- stats */

function StatBand() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 bg-[radial-gradient(55%_120%_at_15%_0%,rgba(15,164,124,0.22),transparent_70%),radial-gradient(50%_120%_at_85%_100%,rgba(46,155,216,0.2),transparent_72%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-px bg-white/10 md:grid-cols-3">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="group bg-ink p-7 md:p-9">
            <div className="text-5xl font-medium tracking-[-0.035em] text-gradient md:text-6xl">
              <Counter to={s.v} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <p className="mt-3 max-w-[24ch] text-[12.5px] leading-relaxed text-paper/55">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}


/* ---------------------------------------------------------------- products */

function Products() {
  return (
    <section id="products" className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <div className="aurora aurora-soft" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Product lineup</SectionLabel>
          <h2 className="mt-5 max-w-[18ch] text-6xl font-medium leading-[0.9] tracking-[-0.04em] md:text-8xl">
            Four platforms.{" "}
            <span className="font-serif italic text-gradient">One ecosystem.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-60">
            Every SCRUB product is designed for a specific water body type and deployment scenario —
            from still urban lakes to fast-flowing rivers. They operate independently or as a
            coordinated fleet.
          </p>
        </Reveal>

        <div className="mt-14 space-y-6 md:space-y-8">
          {PRODUCTS.map((p, i) => (
            <Reveal
              key={p.id}
              delay={40}
              className={`grid gap-6 ${p.media ? "lg:grid-cols-[1.25fr_1fr]" : ""}`}
            >
              {p.media ? (
                <div
                  className={`group lift relative min-h-[320px] overflow-hidden rounded-[2rem] bg-ink ring-1 ring-ink/10 md:min-h-[420px] ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  {p.media.type === "img" ? (
                    <img
                      src={p.media.src}
                      alt={`SCRUB ${p.id} — ${p.name}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                    />
                  ) : (
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    >
                      <source src={p.media.src} type="video/mp4" />
                    </video>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04201B]/70 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper glass-dark">
                    {p.status}
                  </span>
                  <span className="pointer-events-none absolute bottom-3 right-6 font-serif text-[9rem] italic leading-none text-paper/15">
                    {p.id}
                  </span>
                </div>
              ) : null}

              <div
                className={`lift relative overflow-hidden rounded-[2rem] bg-paper p-7 ring-1 ring-ink/10 md:p-9 ${
                  p.media ? "flex flex-col justify-between" : ""
                }`}
              >
                {!p.media ? (
                  <span className="pointer-events-none absolute -right-4 -top-8 select-none font-serif text-[11rem] italic leading-none text-ink-05">
                    {p.id}
                  </span>
                ) : null}
                <div className={p.media ? "" : "relative grid gap-8 lg:grid-cols-[1fr_1fr]"}>
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-6xl italic text-gradient">{p.id}</span>
                      {!p.media ? (
                        <span className="rotate-[-3deg] rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper">
                          {p.status}
                        </span>
                      ) : (
                        <span className="h-px flex-1 bg-ink-10" />
                      )}
                    </div>
                    <h3 className="mt-4 text-3xl font-medium tracking-[-0.03em] md:text-4xl">
                      {p.name}
                    </h3>
                    <p className="mt-4 text-[14px] leading-relaxed text-ink-60">{p.blurb}</p>
                  </div>
                  <ul
                    className={`space-y-3 ${
                      p.media ? "mt-7 border-t border-ink-10 pt-6" : "lg:mt-3"
                    }`}
                  >
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[13px] text-ink-70">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-azure" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>


      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- problem */

function Problem() {
  const { ref, seen } = useInView<HTMLDivElement>(0.25);
  return (
    <section id="problem" className="relative overflow-hidden border-y border-ink-10 bg-paper px-5 py-20 md:px-8 md:py-28">
      <div className="aurora aurora-soft" />
      <WaterField />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>The problem</SectionLabel>
          <h2 className="mt-5 max-w-[16ch] text-5xl font-medium leading-[0.92] tracking-[-0.035em] md:text-7xl">
            India's urban water bodies are{" "}
            <span className="font-serif italic text-clay">in crisis.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.05fr]">
          <Reveal delay={80} className="space-y-6 text-[14.5px] leading-relaxed text-ink-60">
            <p>
              India has 2.4 million water bodies — yet 16.3% are non-functional due to pollution and
              encroachment, and 45.2% have never been repaired or maintained. The 69,485 urban water
              bodies face the sharpest pressure.
            </p>
            <p>
              Current remediation relies on manual labour: slow, hazardous, seasonal, and producing
              no usable data on water health. Municipal bodies have no continuous, scalable or
              autonomous alternative.
            </p>
            <p className="border-l-2 border-clay pl-5 text-ink-70">
              The National Green Tribunal has issued hundreds of orders against civic bodies for lake
              pollution. BBMP faces court-ordered deadlines for water quality compliance — demand for
              an autonomous solution is no longer optional.
            </p>
          </Reveal>

          <div ref={ref} className="space-y-6">
            {BARS.map((b, i) => (
              <div key={b.label}>
                <div className="flex items-end justify-between gap-4">
                  <span className="text-[13px] text-ink-70">{b.label}</span>
                  <span className="font-mono text-[13px] text-clay">{b.display}</span>
                </div>
                <div className="mt-2.5 h-[3px] w-full bg-ink-10">
                  <div
                    className="h-full bg-ink transition-[width] duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)]"
                    style={{ width: seen ? `${b.pct}%` : "0%", transitionDelay: `${i * 110}ms` }}
                  />
                </div>
              </div>
            ))}
            <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-40">
              Source: NITI Aayog · National Water Bodies Census · KSPCB 2024 · NGT orders
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- timeline */

function Timeline() {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>The build</SectionLabel>
          <h2 className="mt-5 max-w-[18ch] text-5xl font-medium leading-[0.92] tracking-[-0.035em] md:text-7xl">
            What's proven. <span className="font-serif italic text-clay">What's next.</span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-12">
          {TIMELINE.map((g) => (
            <div key={g.group}>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-40">
                {g.group}
                <span className="h-px flex-1 bg-ink-10" />
              </div>
              <div className="mt-5 border-l border-ink-10 pl-6 md:pl-10">
                {g.items.map(([date, title, body, tag], i) => (
                  <Reveal key={title} delay={i * 70} className="relative py-5">
                    <span className="absolute -left-[27px] top-8 h-2 w-2 rounded-full bg-clay md:-left-[43px]" />
                    <div className="grid gap-2 md:grid-cols-[8rem_1fr] md:gap-8">
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-40">
                        {date}
                      </span>
                      <div>
                        <h3 className="text-xl font-medium tracking-[-0.02em] md:text-2xl">{title}</h3>
                        <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink-60">{body}</p>
                        {tag && (
                          <span className="mt-3 inline-block rounded-full bg-paper px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-clay ring-1 ring-ink/10">
                            {tag}
                          </span>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- team */

function PersonCard({
  person,
  large = false,
}: {
  person: { name: string; role: string; dept?: string; img: string };
  large?: boolean;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-canvas ring-1 ring-ink/10">
      <div className={`relative overflow-hidden ${large ? "aspect-[4/5]" : "aspect-[3/4]"}`}>
        {person.img ? (
          <img
            src={person.img}
            alt={person.name}
            loading="lazy"
            className="h-full w-full object-cover object-top grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-mist">
            <span className="font-serif text-5xl italic text-ink-30">
              {person.name.slice(0, 1)}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/85 to-transparent p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-paper/70">
            {person.role}
          </p>
        </div>
      </div>
      <div className="p-4">
        <div className="text-[14px] font-medium leading-tight">{person.name}</div>
        <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-clay">
          {person.role}
        </div>
        {person.dept && <div className="mt-1 text-[11.5px] text-ink-50">{person.dept}</div>}
      </div>
    </div>
  );
}

function Team() {
  return (
    <section id="team" className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <div className="aurora aurora-soft" />
      <WaterField />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>The team</SectionLabel>
          <h2 className="mt-5 max-w-[18ch] text-5xl font-medium leading-[0.92] tracking-[-0.035em] md:text-7xl">
            Built by engineers. <span className="font-serif italic text-clay">Deployed</span> on
            water.
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-60">
            A multidisciplinary team from RV College of Engineering, Bengaluru — spanning AI,
            embedded systems, IoT, hardware and mechanical design. 17 people, one lake at a time.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-40">
              Faculty advisors
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {FACULTY.map((f) => (
                <PersonCard key={f.name} person={f} large />
              ))}
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-40">
              Project leads
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {LEADS.map((l) => (
                <PersonCard key={l.name} person={l} />
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={60} className="mt-14">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-40">
            The crew
          </h3>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CREW.map((c) => (
              <div
                key={c.name}
                className="group relative overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/10"
              >
                <div className="aspect-square overflow-hidden">
                  {c.img ? (
                    <img
                      src={c.img}
                      alt={c.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-top grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-mist">
                      <span className="font-serif text-4xl italic text-ink-30">
                        {c.name.slice(0, 1)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <div className="text-[13px] font-medium leading-tight">{c.name}</div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-40">
                    {c.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- contact */

function Contact() {
  const interests = [
    "Municipal deployment",
    "CSR & ESG partnership",
    "Investment & funding",
    "Provide a testing ground",
    "Something else",
  ];
  return (
    <section id="contact" className="relative overflow-hidden bg-ink px-5 py-20 text-paper md:px-8 md:py-28">
      <div className="aurora" />
      <WaterField tone="dark" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-clay">
              <span className="h-px w-8 bg-clay" />
              Get in touch
            </div>
            <h2 className="mt-5 max-w-[16ch] text-5xl font-medium leading-[0.9] tracking-[-0.04em] md:text-7xl">
              Let's talk about{" "}
              <span className="font-serif italic text-clay">your water body.</span>
            </h2>
            <p className="mt-5 max-w-lg text-[14.5px] leading-relaxed text-paper/60">
              Whether you have a lake to clean, a CSR mandate to fulfil, or a deployment question —
              we respond directly and quickly.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                ["Email", "team.scrub0415@gmail.com", "mailto:team.scrub0415@gmail.com"],
                ["Phone", "+91 95698 86982", "tel:+919569886982"],
                ["Follow", "@team_.scrub", "https://instagram.com/team_.scrub"],
              ].map(([l, v, href]) => (
                <div key={l}>
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-paper/40">
                    {l}
                  </div>
                  <a href={href} className="mt-2 block text-[14px] text-paper hover:text-clay">
                    {v}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {["Patent · 202541085700 A", "BBMP · Field endorsed", "RVCE · Bengaluru"].map((c) => (
                <span
                  key={c}
                  className="rounded-full px-3.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-paper/60 ring-1 ring-paper/20"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl bg-paper/[0.06] p-7 ring-1 ring-paper/15 backdrop-blur md:p-9">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
                What are you interested in?
              </p>
              <div className="mt-6 divide-y divide-paper/12 border-y border-paper/12">
                {interests.map((i) => (
                  <a
                    key={i}
                    href={`mailto:team.scrub0415@gmail.com?subject=${encodeURIComponent(i)}`}
                    className="group flex items-center justify-between py-4 text-[15px] transition-colors hover:text-clay"
                  >
                    {i}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink px-5 pb-12 text-paper/50 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 border-t border-paper/12 pt-8">
        <div>
          <div className="font-serif text-2xl italic text-paper">Scrub</div>
          <p className="mt-2 max-w-md text-[11.5px] leading-relaxed">
            © 2026 SCRUB Robotics · RV College of Engineering, Bengaluru – 560 059 ·
            team.scrub0415@gmail.com · Patent 202541085700 A
          </p>
        </div>
        <div className="flex flex-wrap gap-5 font-mono text-[10px] uppercase tracking-[0.18em]">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="hover:text-paper">
              {l}
            </a>
          ))}
          <Link to="/blog" className="hover:text-paper">
            Blog
          </Link>
          <a href="https://instagram.com/team_.scrub" className="hover:text-paper">
            @team_.scrub
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------- page */


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
    <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div className="h-full bg-clay transition-[width] duration-150" style={{ width: `${p}%` }} />
    </div>
  );
}

function Home() {
  return (
    <ModeProvider>
      <ModeSwitcherRoot />
    </ModeProvider>
  );
}

function ModeSwitcherRoot() {
  const { mode } = useMode();
  if (mode === "brainrot") {
    return (
      <Suspense fallback={<div className="min-h-screen bg-paper" aria-label="Loading Brainrot mode" />}>
        <BrainrotSite />
      </Suspense>
    );
  }
  return (
    <div className="min-h-screen bg-canvas">
      <ScrollProgress />
      <ScrollRank />
      <ModeSwitch />
      <Nav />
      <Hero />
      <Ticker />
      <StatBand />
      <Problem />
      <Products />
      <MemeBreak />
      <DepthDive />
      <StickerWall />
      <VibeCheck />
      <ImpactCalc />
      <Timeline />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
