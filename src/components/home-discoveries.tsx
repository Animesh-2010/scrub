import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, FileText, Handshake, MapPin, Play, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Interest } from "@/components/partnership-dialog";
import cad from "@/assets/media/cad.webm.asset.json";
import workshop from "@/assets/media/trial2.webm.asset.json";
import pool from "@/assets/media/trial3.webm.asset.json";
import madiwala from "@/assets/field/madiwala-trial-01.webm.asset.json";
import photo from "@/assets/field/20260908_162005.jpg.asset.json";
import robot from "@/assets/media/v1.jpg.asset.json";
import deck from "@/assets/field/pitch-deck.pdf.asset.json";
import brochure from "@/assets/field/brochure.pdf.asset.json";

const briefings = [
  { label: "I have a lake", icon: Waves, stamp: "SITE / DEPLOYMENT", title: "less floating trash. more actual plans.", text: "A cleaning programme starts with your site, not a one-size-fits-all robot. Let’s look at access, waste, operating conditions and the work that needs doing.", points: ["Site assessment before deployment", "Robot purchase or managed operation", "Cleaning and monitoring options"], interest: "Lake cleaning" as Interest, cta: "Discuss your lake", document: brochure, documentLabel: "Product brochure" },
  { label: "I’m an investor", icon: FileText, stamp: "EVIDENCE / OPPORTUNITY", title: "big ambition. inspectable progress.", text: "We’re developing collection, interception and water-analytics platforms. Real trials are the starting point; dependable, site-specific deployments are the next chapter.", points: ["Kengeri and Madiwala field trials", "Published patent application", "Development stages stated per platform"], interest: "Investment" as Interest, cta: "Start an investment conversation", document: deck, documentLabel: "Pitch deck" },
  { label: "Let’s collaborate", icon: Handshake, stamp: "PILOTS / PARTNERSHIPS", title: "your expertise. our next ripple.", text: "Lake trusts, campuses, research groups and deployment partners: there’s more than one way to move this forward. Bring a site, a question or a useful connection.", points: ["Site-specific pilot conversations", "Water-quality research opportunities", "Scope and responsibilities agreed together"], interest: "Collaboration" as Interest, cta: "Explore a collaboration", document: deck, documentLabel: "Project overview" },
] as const;

export function VisitorBriefing({ onInterest }: { onInterest: (interest: Interest) => void }) {
  const [active, setActive] = useState(0);
  const briefing = briefings[active];
  return <section className="scrub-briefing" aria-labelledby="briefing-heading">
    <div className="scrub-wrap">
      <div className="scrub-briefing-top"><div className="min-w-0"><p className="scrub-eyebrow">THE SAME MISSION. YOUR ANGLE.</p><h2 id="briefing-heading">okay, <em>what brings you here?</em></h2></div><span className="sticker sticker-paper">all vibes. actual substance.</span></div>
      <div className="scrub-briefing-tabs" role="tablist" aria-label="Your interest">{briefings.map((item, index) => <Button key={item.label} variant="ghost" role="tab" id={`briefing-tab-${index}`} aria-selected={active === index} aria-controls="visitor-briefing-panel" onClick={() => setActive(index)} className={active === index ? "scrub-briefing-tab selected" : "scrub-briefing-tab"}><item.icon />{item.label}</Button>)}</div>
      <div id="visitor-briefing-panel" role="tabpanel" aria-labelledby={`briefing-tab-${active}`} className="scrub-briefing-content">
        <div className="min-w-0"><span className="scrub-eyebrow">{briefing.stamp}</span><h3>{briefing.title}</h3><p>{briefing.text}</p></div>
        <div className="min-w-0"><ul>{briefing.points.map(point => <li key={point}><Check className="size-4 shrink-0" /><span>{point}</span></li>)}</ul><div className="scrub-briefing-actions"><Button className="scrub-cta" onClick={() => onInterest(briefing.interest)}>{briefing.cta}<ArrowUpRight /></Button><Button asChild variant="link" className="px-0"><a href={briefing.document.url} target="_blank" rel="noopener noreferrer">{briefing.documentLabel}<ArrowUpRight /></a></Button></div></div>
      </div>
    </div>
  </section>;
}

const stages = [
  { label: "Design", title: "first, make it make sense.", note: "CAD / DEVELOPMENT ARCHIVE", text: "Before there’s a wake, there’s a design. Explore the platform model behind the hardware. A development view, not a promise of final specifications.", src: cad.url, poster: robot.url },
  { label: "Build", title: "the conveyor gets its audition.", note: "MECHANISM / CONTROLLED TEST", text: "Collection depends on the mechanism actually moving. Workshop tests let us inspect the conveyor before taking it into open water.", src: workshop.url, poster: robot.url },
  { label: "Validate", title: "a pool before the plot twist.", note: "POOL / PROTOTYPE VALIDATION", text: "Controlled water testing is one step towards understanding how the platform behaves. Real lakes bring conditions a pool can’t reproduce.", src: pool.url, poster: robot.url },
  { label: "Get wet", title: "the lake has entered the chat.", note: "MADIWALA / SEPTEMBER 2026", text: "Out of the controlled environment and into Madiwala. Real on-water trial footage, with the learning still very much in progress.", src: madiwala.url, poster: photo.url },
];

export function BuildArchive() {
  const [active, setActive] = useState(3);
  const stage = stages[active];
  return <section className="scrub-section scrub-build" aria-labelledby="build-heading"><div className="scrub-wrap">
    <div className="scrub-section-head"><div><p className="scrub-eyebrow">INSIDE THE BUILD / NO MAGIC WAND INCLUDED</p><h2 id="build-heading">from “what if”<br />to <em>“it floats.”</em></h2></div><p>The less glamorous bits are the important bits. Design, mechanism tests, controlled validation, then a lake with absolutely no interest in our plans.</p></div>
    <div className="scrub-build-layout">
      <div className="scrub-build-player"><div className="scrub-build-film-label"><span><span className="scrub-record-dot" />{stage.note}</span><span>ARCHIVE {String(active + 1).padStart(2, "0")}</span></div><video key={stage.src} src={stage.src} poster={stage.poster} controls playsInline preload="metadata" aria-label={`${stage.label} archive video`} /><div className="scrub-build-film-footer"><Play className="size-3" /><span>Actual development footage. Not a simulated deployment.</span></div></div>
      <div className="scrub-build-story"><div role="tablist" aria-label="Build stages" className="scrub-stage-tabs">{stages.map((item,index) => <Button key={item.label} variant="ghost" role="tab" aria-label={item.label} id={`stage-tab-${index}`} aria-selected={active === index} aria-controls="stage-story" onClick={() => setActive(index)} className={active === index ? "scrub-stage selected" : "scrub-stage"}><span>{String(index+1).padStart(2,"0")}</span>{item.label}<ArrowUpRight /></Button>)}</div><div id="stage-story" role="tabpanel" aria-labelledby={`stage-tab-${active}`} className="scrub-stage-story"><h3>{stage.title}</h3><p>{stage.text}</p><span className="scrub-eyebrow flex items-center gap-2"><MapPin className="size-3" /> BUILT IN BENGALURU. TESTED IN REALITY.</span></div></div>
    </div>
  </div></section>;
}

const questions = [
  ["Can I purchase or deploy a SCRUB robot?", "You can start a purchase or managed-deployment conversation. We’ll discuss your site, the right platform, operating requirements and availability before agreeing a scope. Not every platform is at the same development stage."],
  ["Does collecting trash mean the lake is restored?", "No. Floating-waste collection is one part of lake management. Sewage inflows, ecology and other sources of pollution need their own interventions. Our trial footage is evidence of testing, not a claim that an entire lake has been restored."],
  ["What does the water data actually tell me?", "The platform connects configurable sensing with location-tagged readings and spatial analysis. Measured readings and predicted areas are treated separately. The monitoring plan and interpretation depend on your site and the sensors used."],
  ["What happens after I ask for a meeting?", "Your request and preferred date are sent to SCRUB for coordination. It’s a meeting request, not an instantly confirmed booking. We’ll follow up to agree a time and understand what you’d like to discuss."],
];

export function StraightAnswers() {
  const [open, setOpen] = useState<number | null>(0);
   return <section className="scrub-section scrub-answers" aria-labelledby="answers-heading"><div className="scrub-wrap scrub-answers-layout"><div><p className="scrub-eyebrow">A FEW FAIR QUESTIONS.</p><h2 id="answers-heading">less mystery.<br /><em>more clarity.</em></h2><span className="sticker sticker-azure">good questions welcome ↗</span></div><div className="scrub-answer-list">{questions.map(([question,answer],index) => <article key={question}><Button variant="ghost" className="scrub-answer-toggle" aria-expanded={open === index} aria-controls={`answer-${index}`} onClick={() => setOpen(open === index ? null : index)}><span>{question}</span><ChevronDown className={open === index ? "rotate-180" : ""} /></Button><div id={`answer-${index}`} hidden={open !== index}><p>{answer}</p></div></article>)}</div></div></section>;
}