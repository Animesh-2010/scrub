import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import memeShock from "@/assets/memes/meme_shock.jpg";
import memeShrug from "@/assets/memes/meme_shrug.jpg";
import memeBuff from "@/assets/memes/meme_buff.jpg";
import memeCry from "@/assets/memes/meme_cry.jpg";

/* ------------------------------------------------------------------ */
/* meme copy bank — trendy, multi-generational, lake-flavoured          */
/* ------------------------------------------------------------------ */

const IMGS = [memeShock, memeShrug, memeBuff, memeCry];

type Meme = { tag: string; top: string; bottom: string; fact?: string };

const BANK: Meme[] = [
  { tag: "POV", top: "you tossed one chips packet", bottom: "the lake: 'noted. logged. GPS tagged.'", fact: "One wrapper takes ~80 years to break down in still water." },
  { tag: "NOBODY:", top: "absolutely nobody:", bottom: "the lake at 4am: *bubbling ominously*", fact: "Night-time DO crashes are when fish kills happen." },
  { tag: "IT'S GIVING", top: "solar powered, zero diesel", bottom: "it's giving main character energy", fact: "SCRUB runs a full shift on sun alone." },
  { tag: "REAL ONES KNOW", top: "your city has ~1,200 water bodies", bottom: "you can name… two? be so fr", fact: "Bengaluru has lost over 1,000 lakes since 1960." },
  { tag: "AVERAGE FAN", top: "average 'someone will fix it' enjoyer", bottom: "vs average lake-adopting chad", fact: "Community-adopted lakes recover 3x faster." },
  { tag: "GALAXY BRAIN", top: "small brain: complain online", bottom: "galaxy brain: send a robot", fact: "One SCRUB unit replaces a 6-person manual crew." },
  { tag: "SIDE EYE", top: "'we'll clean it before the election'", bottom: "the lake, four elections later: 👁️👄👁️" },
  { tag: "CORE MEMORY", top: "grandpa: 'we used to swim here'", bottom: "the here in question: foam mountain", fact: "Detergent phosphates cause that meter-high froth." },
  { tag: "RATIO", top: "your weekend screen time", bottom: "hours spent outside near water: 0.0", fact: "Blue space exposure measurably drops cortisol." },
  { tag: "TUTORIAL", top: "how to look rich: designer fit", bottom: "how to BE rich: clean tap water" },
  { tag: "NO THOUGHTS", top: "no thoughts, head empty", bottom: "just turbidity readings dropping 📉", fact: "Turbidity is the fastest signal that cleanup is working." },
  { tag: "DELULU", top: "'the river cleans itself'", bottom: "delulu is not the solulu bestie", fact: "Urban lakes have no natural flushing left." },
  { tag: "GYATT", top: "the amount of sewage inflow is", bottom: "genuinely crazy work, chat", fact: "~60% of India's urban sewage goes untreated." },
  { tag: "MOOD", top: "me pretending microplastics", bottom: "aren't already in my bloodstream", fact: "Average human: ~a credit card of plastic a week." },
  { tag: "SPEEDRUN", top: "killing a lake speedrun", bottom: "any% — current WR: 18 months" },
  { tag: "CHARACTER ARC", top: "started: throwing bottles in", bottom: "now: reading dissolved-oxygen charts" },
  { tag: "RENT FREE", top: "the smell from the main road", bottom: "living in your nose rent free", fact: "That's ammonia — we log it hourly." },
  { tag: "TOUCH GRASS", top: "touch grass", bottom: "…but make the grass not toxic first" },
  { tag: "BOOMER SAYS", top: "'kids these days do nothing'", bottom: "kids these days: built a robot", fact: "SCRUB's core team is undergrads." },
  { tag: "SUS", top: "the water is a suspicious colour", bottom: "amogus lake reveal 📛", fact: "Green = algal bloom. Black = anaerobic. Both bad." },
  { tag: "AURA", top: "-1000 aura for littering", bottom: "+5000 aura for a cleanup shift" },
  { tag: "MAIN QUEST", top: "you've been doing side quests", bottom: "the main quest is right here" },
  { tag: "CEO OF", top: "CEO of pretending it's fine", bottom: "resign immediately" },
  { tag: "PLOT TWIST", top: "the villain was never the lake", bottom: "it was the pipe upstream", fact: "Point-source inflows cause most of the load." },
  { tag: "LORE DROP", top: "Bengaluru lore: 1,452 lakes", bottom: "remaining: fewer than 200", fact: "And most of those are Class D or worse." },
  { tag: "CANON EVENT", top: "every Indian city's canon event:", bottom: "a lake that catches fire 🔥", fact: "Bellandur foamed AND burned. Repeatedly." },
  { tag: "BRAIN ROT", top: "you scrolled 47 minutes today", bottom: "this took 90 seconds. respect.", fact: "You're now more informed than 99% of your feed." },
  { tag: "SIGMA", top: "sigma grindset:", bottom: "waking up to skim debris at 6am" },
  { tag: "RIZZ", top: "the rizz of clear water", bottom: "unmatched. unbothered. unbeatable." },
  { tag: "OK BUT", top: "ok but why is the robot", bottom: "more responsible than the ward office" },
  { tag: "TWO GENZ", top: "millennials: 'is this a crisis?'", bottom: "gen z: 'this is Tuesday'" },
  { tag: "GIRL DINNER", top: "lake dinner: 4 bottles,", bottom: "a slipper, and hope" },
  { tag: "NPC", top: "NPC dialogue: 'government should do it'", bottom: "unlock new dialogue tree ↓" },
  { tag: "GOOFY AHH", top: "goofy ahh way to die:", bottom: "drinking your own city's runoff" },
  { tag: "FR FR", top: "clean water on god fr fr", bottom: "no cap, zero diesel" },
  { tag: "OHIO", top: "only in Ohio? nah", bottom: "the lake foam is worldwide now" },
  { tag: "SKIBIDI", top: "skibidi levels of nonsense:", bottom: "dumping sewage into a drinking source" },
  { tag: "CAUGHT IN 4K", top: "the outfall pipe, caught in 4K", bottom: "GPS tagged. timestamped. logged." },
  { tag: "LOWKEY", top: "lowkey the coolest job title:", bottom: "'autonomous lake janitor'" },
  { tag: "HIGHKEY", top: "highkey though —", bottom: "this is a ₹6,000 cr market", fact: "India's water-remediation TAM keeps growing." },
  { tag: "BESTIE", top: "bestie the water is not", bottom: "supposed to be that colour" },
  { tag: "LET HIM COOK", top: "let the robot cook", bottom: "he's cooking (skimming) 🍳" },
  { tag: "SLAY", top: "slay? no. skim.", bottom: "800 kg of debris per run" },
  { tag: "THIS YOU?", top: "'I care about the environment'", bottom: "this you? *points at the lake*" },
  { tag: "ERM", top: "erm, what the sludge?", bottom: "that's 2m of accumulated silt", fact: "Desilting is 60% of restoration cost." },
  { tag: "BEHAVIOUR", top: "the behaviour of that inflow", bottom: "is diabolical" },
  { tag: "COOKED", top: "we are so cooked", bottom: "…unless. hear me out." },
  { tag: "WE ARE SO BACK", top: "one cleaned lake later:", bottom: "we are so back 📈" },
  { tag: "ICK", top: "biggest ick:", bottom: "littering in front of a robot" },
  { tag: "GREEN FLAG", top: "green flag behaviour:", bottom: "knowing your nearest lake's name" },
  { tag: "RED FLAG", top: "red flag:", bottom: "'it's always been like that'" },
  { tag: "TELL ME", top: "tell me you've never seen a lake", bottom: "without telling me" },
  { tag: "OBJECTIVELY", top: "objectively, the vibes are off", bottom: "subjectively, so is the pH", fact: "Healthy freshwater sits around pH 6.5–8.5." },
  { tag: "IYKYK", top: "the smell after first rain", bottom: "iykyk 💀", fact: "First-flush runoff carries the year's worst load." },
  { tag: "GENIUS", top: "genius idea: pay people to care", bottom: "cheaper idea: show them the data" },
  { tag: "SORRY WHAT", top: "sorry, 69,485 water bodies?", bottom: "yeah. India. that's the number." },
  { tag: "HUH", top: "'the robot works at night?'", bottom: "yes. it doesn't doomscroll." },
  { tag: "PEAK", top: "peak content:", bottom: "conveyor pulling out a whole tyre" },
  { tag: "CINEMA", top: "raw trial footage, no renders", bottom: "pure cinema 🎬" },
  { tag: "GATEKEEP", top: "gatekeep gaslight girlboss", bottom: "→ measure, model, remediate" },
];

const TICKER_LINES = [
  "no boomers were harmed",
  "certified lake nerd content",
  "0% ads · 100% ammonia",
  "brain rot but educational",
  "swipe like it's your feed",
  "yes there are easter eggs",
];

/* ------------------------------------------------------------------ */
/* doomfeed — randomised meme deck + easter eggs                        */
/* ------------------------------------------------------------------ */

const EGG_LIST = [
  { id: "konami", label: "↑↑↓↓←→←→ba" },
  { id: "duck", label: "found the duck 🦆" },
  { id: "type", label: "typed SCRUB" },
  { id: "shuffle", label: "deck shuffler" },
  { id: "bottom", label: "reached the end" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function useEggs() {
  const [found, setFound] = useState<string[]>([]);
  const [flash, setFlash] = useState<string | null>(null);
  const add = useCallback((id: string) => {
    setFound((f) => {
      if (f.includes(id)) return f;
      setFlash(EGG_LIST.find((e) => e.id === id)?.label ?? id);
      window.setTimeout(() => setFlash(null), 2600);
      return [...f, id];
    });
  }, []);
  return { found, flash, add };
}

export function DoomFeed({
  trigger = "floating",
  onKonami,
}: {
  trigger?: "floating" | "inline";
  onKonami?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [deck, setDeck] = useState(0);
  const { found, flash, add } = useEggs();
  const feedRef = useRef<HTMLDivElement | null>(null);

  const memes = useMemo(() => {
    void deck;
    return shuffle(BANK).map((m, i) => ({
      ...m,
      img: i % 4 === 0 ? IMGS[Math.floor(Math.random() * IMGS.length)] : null,
    }));
  }, [deck]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const KON = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let ki = 0;
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      ki = e.key === KON[ki] ? ki + 1 : e.key === KON[0] ? 1 : 0;
      if (ki === KON.length) {
        ki = 0;
        onKonami?.();
        add("konami");
      }
      if (e.key.length === 1) {
        buf = (buf + e.key.toLowerCase()).slice(-5);
        if (buf === "scrub") add("type");
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [add, onKonami]);

  const reshuffle = () => {
    setDeck((d) => {
      if (d >= 1) add("shuffle");
      return d + 1;
    });
    feedRef.current?.scrollTo({ top: 0 });
  };

  return (
    <>
      <div
        className={
          trigger === "floating"
            ? "fixed bottom-20 right-4 z-[70] md:bottom-24 md:right-6"
            : "inline-block"
        }
      >
        <button
          onClick={() => {
            setDeck((d) => d + 1);
            setOpen(true);
          }}
          className="wobble rounded-2xl border-2 border-ink bg-live px-4 py-2.5 text-[12.5px] font-semibold tracking-tight text-ink shadow-[4px_4px_0_0_var(--ink)]"
        >
          open the doomfeed 📱
        </button>
      </div>

      {/* egg tracker */}
      {found.length > 0 && (
        <div className="pointer-events-none fixed left-3 top-16 z-[70] flex max-w-[45vw] flex-col gap-1 md:left-6 md:top-24">
          {found.map((id) => (
            <span
              key={id}
              className="w-fit rounded-full border-2 border-ink bg-paper px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] shadow-[3px_3px_0_0_var(--ink)]"
            >
              🥚 {EGG_LIST.find((e) => e.id === id)?.label}
            </span>
          ))}
        </div>
      )}

      {flash && (
        <div className="pointer-events-none fixed inset-x-0 top-1/3 z-[95] flex justify-center px-4">
          <div className="wobble rotate-[-2deg] rounded-3xl border-2 border-ink bg-live px-6 py-4 text-center shadow-[8px_8px_0_0_var(--ink)]">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/70">
              easter egg unlocked
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-ink">{flash}</p>
          </div>
        </div>
      )}

      {/* hidden duck */}
      <button
        aria-label="hidden duck"
        onClick={() => add("duck")}
        className="fixed bottom-2 left-2 z-[70] text-[13px] opacity-25 transition hover:scale-150 hover:opacity-100"
      >
        🦆
      </button>

      {/* the feed */}
      {open && (
        <div className="fixed inset-0 z-[90] bg-ink/90 backdrop-blur-xl">
          <div className="mx-auto flex h-full max-w-md flex-col">
            <div className="flex items-center justify-between gap-3 border-b-2 border-live/40 px-4 py-3">
              <span className="sticker sticker-live -rotate-2">doomfeed</span>
              <div className="flex-1 overflow-hidden">
                <div className="marquee-track flex w-max gap-6 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-paper/60">
                  {[...TICKER_LINES, ...TICKER_LINES].map((t, i) => (
                    <span key={i}>{t} ·</span>
                  ))}
                </div>
              </div>
              <button
                onClick={reshuffle}
                aria-label="shuffle deck"
                className="rounded-full border-2 border-paper/40 px-3 py-1 text-[12px] font-semibold text-paper"
              >
                🔀
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border-2 border-paper/40 px-3 py-1 text-[12px] font-semibold text-paper"
              >
                esc
              </button>
            </div>

            <div
              ref={feedRef}
              onScroll={(e) => {
                const el = e.currentTarget;
                if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) add("bottom");
              }}
              className="flex-1 snap-y snap-mandatory overflow-y-auto overscroll-contain"
            >
              {memes.map((m, i) => (
                <MemeSlide key={m.tag + i} m={m} i={i} />
              ))}
              <div className="flex h-[70vh] snap-start flex-col items-center justify-center gap-4 px-8 text-center">
                <p className="text-5xl">🏆</p>
                <p className="text-3xl font-medium leading-tight tracking-tight text-paper">
                  you doomscrolled to the <span className="font-serif italic text-live">end</span>
                </p>
                <p className="max-w-[30ch] text-[13.5px] leading-relaxed text-paper/60">
                  {BANK.length}+ memes later, you now know more about urban water than most city
                  councils. go tell someone.
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={reshuffle}
                    className="rounded-full border-2 border-live px-5 py-2.5 text-[13px] font-semibold text-live"
                  >
                    shuffle the deck 🔀
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-full border-2 border-live bg-live px-5 py-2.5 text-[13px] font-semibold text-ink"
                  >
                    back to the robots
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const CARD_BG = ["bg-live text-ink", "bg-paper text-ink", "bg-azure text-ink", "bg-ink text-live"];

function MemeSlide({ m, i }: { m: Meme & { img: string | null }; i: number }) {
  const [flip, setFlip] = useState(false);
  const rot = [-2.5, 2, -1.5, 3][i % 4];

  return (
    <section className="flex min-h-[86vh] snap-start items-center justify-center px-5 py-6">
      <button
        onClick={() => m.fact && setFlip((f) => !f)}
        style={{ rotate: `${rot}deg` }}
        className={`${CARD_BG[i % 4]} wobble relative w-full rounded-[26px] border-2 border-ink p-6 text-left shadow-[8px_8px_0_0_var(--ink)]`}
      >
        <span className="tape" aria-hidden="true" />
        <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
          <span>{m.tag}</span>
          <span>
            {String(i + 1).padStart(2, "0")}/{BANK.length}
          </span>
        </div>

        {m.img && (
          <img
            src={m.img}
            alt=""
            loading="lazy"
            width={1024}
            height={768}
            className="mt-4 w-full rounded-2xl border-2 border-ink bg-white object-cover"
          />
        )}

        <p className="mt-5 text-[26px] font-medium leading-[1.06] tracking-[-0.03em]">{m.top}</p>
        <p className="mt-3 text-[17px] leading-snug opacity-80">{m.bottom}</p>

        {m.fact && (
          <p
            className={`mt-5 rounded-2xl border-2 border-current/25 px-4 py-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] transition-all duration-500 ${
              flip ? "opacity-100" : "opacity-45"
            }`}
          >
            {flip ? m.fact : "tap for the actual fact →"}
          </p>
        )}
      </button>
    </section>
  );
}

export { BANK, IMGS, shuffle };

