const STICKERS = [
  { t: "TOUCH GRASS,\nCLEAN WATER", c: "bg-live text-ink", r: -6 },
  { t: "69,485\nLAKES", c: "bg-ink text-paper", r: 4 },
  { t: "SOLAR\nPOWERED", c: "bg-azure text-ink", r: -3 },
  { t: "NO DIVERS.\nNO NETS.", c: "bg-paper text-ink", r: 7 },
  { t: "PATENT\nFILED", c: "bg-clay text-ink", r: -8 },
  { t: "MADE IN\nBENGALURU", c: "bg-ink text-live", r: 5 },
  { t: "90%\nPRECISION", c: "bg-paper text-ink", r: -4 },
  { t: "STOP\nDOOMSCROLLING", c: "bg-live text-ink", r: 8 },
];

/** Funky rotated sticker wall — tactile, hand-slapped, zine energy. */
export function StickerWall() {
  return (
    <section className="relative overflow-hidden border-y border-ink/10 bg-surface py-16 md:py-20">
      <div className="aurora aurora-soft" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {STICKERS.map((s) => (
            <span
              key={s.t}
              style={{ rotate: `${s.r}deg` }}
              className={`${s.c} inline-block whitespace-pre-line rounded-2xl border-2 border-ink px-5 py-3 text-center font-mono text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] shadow-[4px_4px_0_0_var(--ink)] transition-transform duration-300 hover:rotate-0 hover:scale-110`}
            >
              {s.t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
