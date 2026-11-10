import { useState } from "react";
import Reveal from "../components/Reveal";
import { usePageMeta } from "../components/usePageMeta";
import CountUp from "../components/CountUp";
import Lightbox from "../components/Lightbox";
import { ArrowUpRight } from "../components/Icons";
import { socialIcon } from "../components/socialIcon";
import { gallery, impactStats, outlets, press, socials, timeline } from "../data/content";
import { photo } from "../data/photo";

export default function Impact() {
  usePageMeta("Impact", "Where SCRUB has been seen, written about and put to work: press coverage, field photos and milestones from lake trials in Bengaluru.");
  const [zoom, setZoom] = useState<number | null>(null);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Reach &amp; impact</p>
            <h1 className="display">The world is starting to notice.</h1>
            <p className="lead">
              From national news to the lakes themselves: where SCRUB has been seen, written about and put to work.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="section section--tight">
        <div className="wrap">
          <ul className="stats">
            {impactStats.map((s, i) => (
              <Reveal as="li" key={s.label} delay={0.08 * i} className="stat">
                <strong className="stat__num"><CountUp to={s.value} suffix={s.suffix} /></strong>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* PHOTOS */}
      <section className="section section--tight gallery-sec" aria-labelledby="gallery-title">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">In the field</p>
            <h2 id="gallery-title" className="display display--md">SCRUB at work.</h2>
          </Reveal>
          <ul className="gallery">
            {gallery.map((p, i) => (
              <Reveal as="li" key={p.src} delay={0.04 * (i % 3)} className="gallery__item">
                <button onClick={() => setZoom(i)} aria-label={`Enlarge: ${p.caption}`}>
                  <img {...photo(p.src, "(max-width: 640px) 92vw, 400px")} alt={p.alt} loading="lazy" decoding="async" style={{ objectPosition: p.focus }} />
                  <span className="gallery__cap">
                    <strong>{p.caption}</strong>
                    {p.credit && <small>{p.credit}</small>}
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {zoom !== null && <Lightbox index={zoom} onChange={setZoom} onClose={() => setZoom(null)} />}

      {/* PRESS */}
      <section className="section section--soft" aria-labelledby="press-title">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">In the news</p>
            <h2 id="press-title" className="display display--md">Press coverage</h2>
            <p className="outlets" aria-label="Outlets that have covered SCRUB">
              {outlets.map((o) => <span key={o}>{o}</span>)}
            </p>
          </Reveal>

          <ul className="press">
            {press.map((p, i) => (
              <Reveal as="li" key={p.href} delay={0.06 * i}>
                <a className="press-card" href={p.href} target="_blank" rel="noopener noreferrer">
                  <span className="press-card__outlet">{p.outlet}</span>
                  <h3>{p.title}</h3>
                  <span className="press-card__foot">
                    <time>{p.date}</time>
                    <span className="press-card__read">Read <ArrowUpRight width={16} height={16} /></span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* VIDEO + SOCIAL */}
      <section className="section" aria-labelledby="social-title">
        <div className="wrap social">
          <Reveal className="social__video">
            <p className="eyebrow">Watch</p>
            <h2 id="social-title" className="display display--md">SCRUB V2, on the water.</h2>
            <div className="impact-photo">
              <img
                {...photo("/media/impact/sweeping-calm-water.webp", "(max-width: 900px) 92vw, 720px")}
                alt="SCRUB robot sweeping calm water beside a tree-lined shore"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="social__links">
            <p className="eyebrow">Follow along</p>
            <h2 className="display display--md">Find us online.</h2>
            <ul className="socials">
              {socials.map((s) => {
                const Icon = socialIcon(s.name);
                return (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="social-card">
                      <span className="social-card__icon"><Icon width={22} height={22} /></span>
                      <span><strong>{s.name}</strong><small>{s.handle}</small></span>
                      <ArrowUpRight width={18} height={18} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section section--soft" aria-labelledby="timeline-title">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Milestones</p>
            <h2 id="timeline-title" className="display display--md">From first splash to national press.</h2>
          </Reveal>
          <ol className="timeline">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.title} delay={0.08 * i}>
                <time>{t.when}</time>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
