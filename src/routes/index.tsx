import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Menu, Play, Waves, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PartnershipDialog, type Interest } from "@/components/partnership-dialog";
import { StraightAnswers } from "@/components/home-discoveries";
import madiwalaPhoto from "@/assets/field/20260908_162005.jpg.asset.json";
import madiwalaPhoto2 from "@/assets/field/20260908_162240.jpg.asset.json";
import madiwalaVideo from "@/assets/field/madiwala-trial-01.webm.asset.json";
import madiwalaVideo2 from "@/assets/field/madiwala-trial-02.webm.asset.json";
import observatory from "@/assets/field/observatory.jpg.asset.json";
import madiwalaMap from "@/assets/field/madiwala-map.jpg.asset.json";
import brochure from "@/assets/field/brochure.pdf.asset.json";
import deck from "@/assets/field/pitch-deck.pdf.asset.json";
import kengeri from "@/assets/media/trial1.mp4.asset.json";
import workshop from "@/assets/media/trial2.webm.asset.json";
import pool from "@/assets/media/trial3.webm.asset.json";
import v1 from "@/assets/media/v1.jpg.asset.json";
import v2 from "@/assets/media/v2.jpg.asset.json";
import v3 from "@/assets/field/v3-deck.jpg.asset.json";
import v4 from "@/assets/field/v4-deck.jpg.asset.json";
import nerdCharacter from "@/assets/memes/meme_shock.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "SCRUB Robotics — Real robots. Real lakes. Cleaner futures." },
    { name: "description", content: "See SCRUB in action at Madiwala and Kengeri lakes. Explore lake-cleaning robots, water intelligence and deployment partnerships, built in Bengaluru." },
    { property: "og:title", content: "SCRUB Robotics — Real robots. Real lakes." },
    { property: "og:description", content: "From Bengaluru lake trials to autonomous cleaning and water intelligence. Meet SCRUB and start a deployment conversation." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://www.scrubrobotics.in/" }] }),
  component: Home,
});

const nav = [["In the field", "#field"], ["Our robots", "#products"], ["Water intelligence", "#technology"], ["Work with us", "#services"]];
const footage = [
  { src: madiwalaVideo.url, image: madiwalaPhoto.url, title: "Madiwala. In motion.", location: "Madiwala Lake, Bengaluru", note: "September 2026 · On-water trial", type: "video" },
  { src: madiwalaVideo2.url, image: madiwalaPhoto2.url, title: "Another run. More learning.", location: "Madiwala Lake, Bengaluru", note: "September 2026 · Trial footage", type: "video" },
  { src: kengeri.url, image: v1.url, title: "Where the lake work began.", location: "Kengeri Lake, Bengaluru", note: "Field validation · BBMP coordination", type: "video" },
  { src: workshop.url, image: v1.url, title: "The mechanism behind the mission.", location: "Controlled testing", note: "Conveyor test · Development archive", type: "video" },
  { src: pool.url, image: v1.url, title: "Before the open water.", location: "Pool validation", note: "Prototype testing · Development archive", type: "video" },
  { src: madiwalaPhoto2.url, image: madiwalaPhoto2.url, title: "No render. Just a robot.", location: "Madiwala Lake, Bengaluru", note: "September 2026 · Field photograph", type: "image" },
];
type Footage = (typeof footage)[number];
function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="scrub-eyebrow">{children}</p>; }

function Home() {
  const [menu, setMenu] = useState(false);
  const [interest, setInterest] = useState<Interest | null>(null);
  const [media, setMedia] = useState<Footage | null>(null);
  const [activeLake, setActiveLake] = useState("All footage");
  const visible = footage.filter((f) => activeLake === "All footage" || f.location.startsWith(activeLake)).slice(0, 3);
  return <div className="scrub-home">
    <header className="scrub-nav">
      <div className="scrub-wrap grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-5 lg:flex lg:justify-between">
        <a href="#top" aria-label="SCRUB Robotics home" className="flex items-center gap-2"><Waves className="size-7 text-clay" /><span className="text-2xl font-bold">SCRUB<span className="ml-1 text-clay">.</span></span></a>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">{nav.map(([text, href]) => <a className="scrub-nav-link" key={href} href={href}>{text}</a>)}<Link className="scrub-nav-link" to="/blog">Field notes</Link></nav>
        <div className="flex items-center gap-2"><Button className="scrub-cta hidden sm:inline-flex" onClick={() => setInterest("Meeting")}>Let’s talk lakes <ArrowUpRight /></Button><Button variant="ghost" size="icon" className="lg:hidden" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button></div>
      </div>
      {menu && <nav aria-label="Mobile navigation" className="scrub-wrap border-t border-ink-10 pb-5 lg:hidden">{nav.map(([text, href]) => <a key={href} href={href} onClick={() => setMenu(false)} className="block border-b border-ink-10 py-3">{text}</a>)}<Link to="/blog" className="block py-3">Field notes</Link><Button onClick={() => { setMenu(false); setInterest("Meeting"); }}>Set up a meeting <CalendarDays /></Button></nav>}
    </header>

    <main>
      <section id="top" className="scrub-hero">
        <img src={madiwalaPhoto.url} alt="SCRUB prototype creating ripples during a real trial at Madiwala Lake" className="scrub-hero-photo" />
        <video className="scrub-hero-film" src={madiwalaVideo.url} poster={madiwalaPhoto.url} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} disablePictureInPicture />
        <div className="scrub-hero-shade" />
        <div className="scrub-wrap scrub-hero-content">
          <div className="scrub-field-label"><span className="size-2 rounded-full bg-live" /> FROM THE LAB TO THE LAKE</div>
          <div className="scrub-hero-stickers"><span className="sticker sticker-live">real lake. real robot.</span><span className="sticker sticker-azure">field-tested, not just rendered ↗</span></div>
          <h1>SCRUB Robotics<span>less waste.<br /><em>more lake.</em></span></h1>
          <p>Robots for surface-waste collection. Intelligence for what lies beneath. See our real lake trials, then explore what we can do for yours.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Button className="scrub-cta" onClick={() => setMedia(footage[0])}><Play /> Watch the lake trial</Button><Button asChild variant="outline" className="scrub-hero-outline"><a href="#products">Meet the fleet <ArrowUpRight /></a></Button></div>
        </div>
        <a href="#field" className="scrub-field-stamp"><span className="scrub-eyebrow">FIELD DISPATCH / 09.2026</span><strong>Madiwala,<br /><em>in the real world.</em></strong><span>Inspect the actual trials <ArrowDown className="size-4" /></span></a>
        <div className="scrub-hero-bottom scrub-wrap"><span className="flex items-center gap-2"><MapPin className="size-3" /> MADIWALA LAKE · BENGALURU · SEPT 2026</span></div>
      </section>
      <div className="scrub-proof-band"><div className="scrub-wrap flex flex-wrap items-center justify-between gap-5 py-6"><span className="flex items-center gap-2 font-medium"><span className="size-2 rounded-full bg-clay" /> Real work. Cleaner possibilities.</span><div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-ink-60"><span>Madiwala lake trials</span><span>Kengeri field validation</span><span>Patent published</span><a href="#field" className="flex items-center gap-2 text-ink">The evidence <ArrowDown className="size-3" /></a></div></div></div>

      <section id="field" className="scrub-section">
        <div className="scrub-wrap">
          <div className="scrub-section-head"><div><Eyebrow>01 / PROOF ON THE WATER</Eyebrow><h2>real lakes. <em>real progress.</em><br /><span className="text-clay">Madiwala & Kengeri.</span></h2></div><p>From Kengeri validation to recent Madiwala trials: actual footage, real conditions, and plenty to learn.</p></div>
          <div className="my-8 flex flex-wrap gap-2" role="group" aria-label="Filter field footage">{["All footage", "Madiwala", "Kengeri"].map((tab) => <Button key={tab} variant="ghost" aria-pressed={activeLake === tab} className={activeLake === tab ? "scrub-filter active" : "scrub-filter"} onClick={() => setActiveLake(tab)}>{tab}{tab === "Madiwala" && <span className="size-1.5 rounded-full bg-clay" />}</Button>)}</div>
          <div className="scrub-evidence-grid">{visible.map((f, i) => <article key={f.src} className={i === 0 ? "scrub-evidence lead" : "scrub-evidence"}><Button variant="ghost" onClick={() => setMedia(f)} className="scrub-media-button" aria-label={`Open ${f.title}`}>{f.location === "Controlled testing" || f.location === "Pool validation" ? <video src={f.src} muted playsInline preload="metadata" aria-hidden="true" tabIndex={-1} /> : <img src={f.image} alt={f.title} loading="lazy" />}{f.type === "video" && <span className="scrub-play"><Play className="size-5" /></span>}<span className="scrub-media-index">{String(footage.indexOf(f) + 1).padStart(2, "0")} / FIELD ARCHIVE</span></Button><div className="pt-4"><p className="scrub-eyebrow text-ink-50">{f.note}</p><h3 className="mt-2 text-xl font-medium">{f.title}</h3><p className="mt-1 text-sm text-ink-60">{f.location}</p></div></article>)}</div>
          <div className="scrub-field-note"><span className="font-mono text-xs text-clay">A NOTE ON THE FOOTAGE ↗</span><p>Development and field-validation trials — not a claim of whole-lake restoration. Real progress, with the context intact.</p></div>
        </div>
      </section>

      <section id="services" className="scrub-section bg-surface">
        <div className="scrub-wrap"><div className="scrub-section-head"><div><Eyebrow>02 / HOW WE CAN HELP</Eyebrow><h2>your lake.<br /><em>a practical plan.</em></h2></div><p>A municipality, a campus, a lake trust, a CSR programme. Different needs, same starting point: what does your water body actually need?</p></div>
          <div className="scrub-offers">{[
            { n: "01", title: "Deploy a robot.", sub: "HARDWARE & ROBOTS AS A SERVICE", text: "Own a SCRUB platform or discuss a managed deployment. Configuration, operation and maintenance matched to your site.", interest: "Robot purchase" as Interest, cta: "Explore a deployment" },
            { n: "02", title: "Clear the surface.", sub: "CLEANING AS A SERVICE", text: "Plan surface-waste collection with us. Start with a site assessment, agree the scope, and build a cleaning programme around your lake.", interest: "Lake cleaning" as Interest, cta: "Discuss your lake" },
            { n: "03", title: "Understand the water.", sub: "WATER INTELLIGENCE", text: "Go beyond a single sample. Spatial monitoring and water-quality insights help you understand where the problems are — and what changes.", interest: "Water analytics" as Interest, cta: "Talk water data" },
          ].map((o) => <article key={o.n}><span className="font-mono text-xs text-clay">{o.n} /</span><h3>{o.title}</h3><Eyebrow>{o.sub}</Eyebrow><p>{o.text}</p><Button variant="link" onClick={() => setInterest(o.interest)} className="px-0">{o.cta}<ArrowUpRight /></Button></article>)}</div>
        </div>
      </section>

      <section id="products" className="scrub-section">
        <div className="scrub-wrap"><div className="scrub-section-head"><div><Eyebrow>03 / THE SCRUB PLATFORMS</Eyebrow><h2>meet the <em>fleet.</em><br /><span className="text-clay">Four ways forward.</span></h2></div><div><p>Four platforms across collection, interception and water intelligence. Clear about what’s tested. Clear about what’s next.</p><Button asChild variant="link" className="mt-3 px-0"><a href={brochure.url} target="_blank" rel="noopener noreferrer">Read the product brochure <ArrowUpRight /></a></Button></div></div>
          <div className="scrub-products">
            <article className="scrub-product"><img src={v1.url} alt="SCRUB V1 lake-cleaning prototype" loading="lazy" /><div><div className="flex items-center justify-between gap-3"><span className="scrub-product-id">V1</span><span className="scrub-status">FIELD-TESTED</span></div><h3>The surface cleaner.</h3><p>A twin-hull platform with conveyor collection for floating waste and aquatic vegetation. Tested in real lake conditions.</p><ul><li>Conveyor collection</li><li>Dual-mode control</li><li>Solar-assisted platform</li></ul><Button variant="link" className="px-0" onClick={() => setInterest("Robot purchase")}>Discuss V1 <ArrowUpRight /></Button></div></article>
            <article className="scrub-product"><img src={v2.url} alt="SCRUB V2 passive-intake prototype" loading="lazy" /><div><div className="flex items-center justify-between gap-3"><span className="scrub-product-id">V2</span><span className="scrub-status">PROTOTYPE</span></div><h3>The passive collector.</h3><p>Forward motion guides waste into a passive intake. Fewer moving collection parts, with a compact, transportable design.</p><ul><li>Passive waste intake</li><li>Compact architecture</li><li>Transportable design</li></ul><Button variant="link" className="px-0" onClick={() => setInterest("Robot purchase")}>Discuss V2 <ArrowUpRight /></Button></div></article>
            <article className="scrub-product"><img src={v3.url} alt="SCRUB V3 river interceptor concept illustration from the pitch deck" loading="lazy" /><div><div className="flex items-center justify-between gap-3"><span className="scrub-product-id">V3</span><span className="scrub-status planned">IN DEVELOPMENT</span></div><h3>The river interceptor.</h3><p>A floating-boom concept that guides river and canal debris towards shore-based collection. In development — the next step is validation.</p><ul><li>River & canal applications</li><li>Shore-based collection</li><li>Modular interception</li></ul><Button variant="link" className="px-0" onClick={() => setInterest("Collaboration")}>Explore a pilot <ArrowUpRight /></Button></div></article>
            <article className="scrub-product"><img src={v4.url} alt="SCRUB V4 configurable water-analytics bot illustration from the pitch deck" loading="lazy" /><div><div className="flex items-center justify-between gap-3"><span className="scrub-product-id">V4</span><span className="scrub-status">FIELD-TESTED ANALYTICS</span></div><h3>The water analyst.</h3><p>A dedicated water-analytics platform, bringing configurable sensing together with spatial mapping and the SCRUB Observatory software.</p><ul><li>Configurable sensing</li><li>Spatial water-quality data</li><li>Monitoring & analysis</li></ul><Button variant="link" className="px-0" onClick={() => setInterest("Water analytics")}>Explore water intelligence <ArrowUpRight /></Button></div></article>
          </div>
        </div>
      </section>

      <section id="technology" className="scrub-section scrub-intelligence">
        <div className="scrub-wrap"><div className="scrub-section-head"><div><Eyebrow>04 / FROM DATA TO ACTION</Eyebrow><h2>looks clean?<br /><span className="text-live"><em>let’s measure.</em></span></h2></div><p>SCRUB Observatory combines location, sensing and spatial analysis. Blue water makes a good photograph. It isn’t a water-quality report.</p></div>
          <div className="scrub-data-character"><img src={nerdCharacter} alt="Surprised doodle character reacting to water data" loading="lazy" /><span className="sticker sticker-live">the water has receipts 🤓</span></div>

          <div className="scrub-analytics-detail"><div><Eyebrow>MADIWALA / FIELD DATA</Eyebrow><h3>Not one sample.<br />A spatial story.</h3><p>The Madiwala trial map connects measurements to the robot’s trajectory. Measured points and predicted areas are identified separately — because predictions aren’t measurements.</p><div className="mt-6 flex flex-wrap gap-2">{["pH", "TDS", "Turbidity", "GPS-tagged readings", "ML-based spatial analysis"].map((s) => <span className="scrub-sensor" key={s}>{s}</span>)}</div><figure className="scrub-software-preview"><img className="scrub-observatory" src={observatory.url} alt="SCRUB Observatory software showing Kengeri Lake mission planning and water-quality information" loading="lazy" /><figcaption className="mt-3 text-xs text-paper/60">SCRUB Observatory · Product screenshot from our pitch deck, not a live feed.</figcaption></figure><Button className="scrub-cta mt-7" onClick={() => setInterest("Water analytics")}>See what your water is saying <ArrowUpRight /></Button></div><figure><img src={madiwalaMap.url} alt="Madiwala Lake measured robot trajectory and predicted outer loop with water-quality values" loading="lazy" className="w-full rounded-md" /><figcaption className="mt-3 text-xs text-paper/60">Trial analysis from the supplied deck · Measured inner loop / predicted outer loop.</figcaption></figure></div>
        </div>
      </section>

      <section id="traction" className="scrub-section"><div className="scrub-wrap"><div className="scrub-section-head"><div><Eyebrow>05 / MILESTONES</Eyebrow><h2>built. tested.<br /><em>moving forward.</em></h2></div><p>We’re building towards dependable deployments. Here’s the work behind that ambition, and the next steps we’re opening to partners.</p></div><div className="scrub-milestones">{[["01", "Designed & built", "An in-house robotic platform, developed through controlled testing and mechanical iteration."], ["02", "Kengeri validation", "Real-lake field trials in coordination with BBMP. Moving beyond controlled conditions."], ["03", "Madiwala trials", "Recent on-water testing and spatial water-quality analysis. More conditions. More learning."], ["04", "Patent published", "A published patent application for the integrated system. Continuing to refine the technology."]].map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div><div className="scrub-next"><p><strong>Next up:</strong> site-specific pilots, deployment partners and continued product validation.</p><Button onClick={() => setInterest("Collaboration")} variant="link">Be part of what’s next <ArrowUpRight /></Button></div></div></section>

      <StraightAnswers />

      <section id="contact" className="scrub-section bg-surface"><div className="scrub-wrap"><div className="scrub-section-head"><div><Eyebrow>06 / LET’S WORK TOGETHER</Eyebrow><h2>ready to make<br /><span className="text-clay">a difference?</span></h2></div><p>Looking for a cleaning solution, a research partner, or an investment conversation? Tell us what you have in mind. We’ll take it from there.</p></div><div className="scrub-contact-paths">{[["Discuss your lake.", "Municipalities · Lake trusts · Campuses · CSR", "Lake cleaning"], ["Build with us.", "Pilots · Research · Deployment collaboration", "Collaboration"], ["Explore investment.", "Investors · Strategic partners", "Investment"]].map(([t,d,i]) => <Button key={t} variant="ghost" onClick={() => setInterest(i as Interest)}><span><strong>{t}</strong><small>{d}</small></span><ArrowUpRight /></Button>)}</div><div className="scrub-contact-bottom"><Button className="scrub-cta" onClick={() => setInterest("Meeting")}><CalendarDays /> Set up a meeting</Button><Button asChild variant="link"><a href={deck.url} target="_blank" rel="noopener noreferrer">Open the pitch deck <ArrowUpRight /></a></Button><a href="mailto:team.scrub0415@gmail.com" className="text-sm text-ink-60 break-all">team.scrub0415@gmail.com</a></div></div></section>
    </main>
    <footer className="scrub-footer"><div className="scrub-wrap"><div className="flex flex-wrap justify-between gap-10"><div><a href="#top" className="text-4xl font-bold">SCRUB<span className="text-live">.</span></a><p className="mt-4 max-w-xs text-sm text-paper/60">Robotics for cleaner water.<br />Built in Bengaluru. Made for the real world.</p></div><div className="flex flex-wrap gap-x-12 gap-y-6"><div><Eyebrow>EXPLORE</Eyebrow><a href="#products">Our robots</a><a href="#field">In the field</a><Link to="/blog">Field notes</Link></div><div><Eyebrow>CONNECT</Eyebrow><a href="https://instagram.com/team_.scrub" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://youtube.com/@scrub-robotics" target="_blank" rel="noopener noreferrer">YouTube ↗</a><a href="mailto:team.scrub0415@gmail.com">Email us ↗</a></div></div></div><div className="scrub-footer-base"><span>© 2026 SCRUB Robotics</span><span>A little less talk. A lot more lake.</span><a href="#top" className="flex items-center gap-2">Back to the surface <ArrowUpRight className="size-3" /></a></div></div></footer>
    {interest && <PartnershipDialog key={interest} interest={interest} onClose={() => setInterest(null)} />}
    <Dialog open={media !== null} onOpenChange={(open) => { if (!open) setMedia(null); }}><DialogContent className="scrub-dialog max-h-[94svh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto rounded-lg bg-paper p-5"><DialogTitle className="pr-8 text-2xl">{media?.title}</DialogTitle><DialogDescription>{media?.location} · {media?.note}</DialogDescription>{media && <>{media.type === "video" ? <video key={media.src} src={media.src} controls autoPlay playsInline preload="metadata" className="scrub-modal-media" /> : <img src={media.src} alt={media.title} className="scrub-modal-media" />}<div className="flex items-center justify-between gap-4"><Button variant="outline" size="icon" aria-label="Previous field item" onClick={() => setMedia(footage[(footage.indexOf(media) - 1 + footage.length) % footage.length])}><ArrowLeft /></Button><span className="font-mono text-xs text-ink-60">{String(footage.indexOf(media) + 1).padStart(2, "0")} / {String(footage.length).padStart(2, "0")} · FIELD ARCHIVE</span><Button variant="outline" size="icon" aria-label="Next field item" onClick={() => setMedia(footage[(footage.indexOf(media) + 1) % footage.length])}><ArrowRight /></Button></div></>}</DialogContent></Dialog>
  </div>;
}
