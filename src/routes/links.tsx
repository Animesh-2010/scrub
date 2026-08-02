import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "Connect — SCRUB Robotics" },
      {
        name: "description",
        content:
          "A single place to explore our work, stay updated, and get in touch with SCRUB Robotics.",
      },
      { property: "og:title", content: "Connect with SCRUB Robotics" },
      {
        property: "og:description",
        content: "Instagram, YouTube, email and phone — one place for all SCRUB links.",
      },
    ],
  }),
  component: Links,
});

const LINKS: { key: string; value: string; href: string }[] = [
  { key: "Instagram", value: "team_.scrub", href: "https://instagram.com/team_.scrub" },
  { key: "Website", value: "scrubrobotics.in", href: "https://scrubrobotics.in" },
  { key: "YouTube", value: "@scrub-robotics", href: "https://youtube.com/@scrub-robotics" },
  { key: "Email", value: "team.scrub0415@gmail.com", href: "mailto:team.scrub0415@gmail.com" },
];

const CALLS: { name: string; number: string; href: string }[] = [
  { name: "Krishna Purwar", number: "+91 73761 51772", href: "tel:+917376151772" },
  { name: "Siddhant Singh", number: "+91 70076 33541", href: "tel:+917007633541" },
];

function LinksNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-10 bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-[16px] font-bold italic text-live">
            S
          </span>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-medium tracking-tight">Scrub</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink-40">
              Connect · Links
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
            Links
          </span>
        </nav>

        <a
          href="mailto:team.scrub0415@gmail.com?subject=SCRUB"
          className="hidden items-center gap-2 rounded-full bg-surface px-5 py-2.5 text-[13px] font-medium ring-1 ring-ink/10 transition-colors hover:bg-ink hover:text-paper md:inline-flex"
        >
          Get in touch <span className="inline-block">→</span>
        </a>
      </div>
    </header>
  );
}

function Row({
  key,
  value,
  href,
  last,
}: {
  key: string;
  value: string;
  href: string;
  last?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener" : undefined}
      className={`group flex items-center justify-between gap-6 px-3 py-5 transition-colors hover:bg-ink/[0.03] ${
        last ? "" : "border-b border-ink-10"
      }`}
    >
      <div className="flex items-baseline gap-5">
        <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-40">
          {key}
        </span>
        <span className="font-serif text-lg font-medium text-ink">
          {value}
          <span className="block h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
        </span>
      </div>
      <span className="text-sm text-ink-40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:text-clay">
        ↗
      </span>
    </a>
  );
}

function Links() {
  return (
    <div className="min-h-screen bg-canvas">
      <LinksNav />
      <main className="mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-xl flex-col justify-center px-6 py-16 md:px-8">
        <section className="quiet-rise">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-clay">Connect</p>
          <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.1] tracking-[-0.01em] text-ink md:text-5xl">
            Connect with SCRUB&nbsp;Robotics.
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-60">
            A single place to explore our work, stay updated, and get in touch.
          </p>
        </section>

        <hr className="my-7 border-ink-10" />

        <section className="quiet-rise">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-clay">Contact</p>
          <div className="mt-4">
            {LINKS.map((l, i) => (
              <Row key={l.key} {...l} last={i === LINKS.length - 1} />
            ))}
          </div>
        </section>

        <hr className="my-7 border-ink-10" />

        <section className="quiet-rise">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-clay">Call</p>
          <div className="mt-4">
            {CALLS.map((c, i) => (
              <a
                key={c.name}
                href={c.href}
                className={`group flex items-baseline justify-between gap-6 px-3 py-4 transition-colors hover:bg-ink/[0.03] ${
                  i === CALLS.length - 1 ? "" : "border-b border-ink-10"
                }`}
              >
                <span className="text-sm text-ink-60">{c.name}</span>
                <span className="text-base font-medium text-ink">
                  {c.number}
                  <span className="block h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            ))}
          </div>
        </section>

        <hr className="my-7 border-ink-10" />

        <section className="quiet-rise">
          <div className="font-serif text-lg font-medium text-ink">SCRUB Robotics</div>
          <div className="mt-1.5 text-[12.5px] text-ink-40">
            Autonomous Robotics for Cleaner Water Bodies.
          </div>
          <Link
            to="/"
            className="mt-6 inline-block text-xs tracking-[0.06em] text-ink-40 transition-colors hover:text-clay"
          >
            ← Back to SCRUB
          </Link>
        </section>
      </main>
    </div>
  );
}
