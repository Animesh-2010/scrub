import { useState } from "react";

/** Interactive deployment ROI model — investors and ULBs can play with it. */
export function ImpactCalc() {
  const [bots, setBots] = useState(4);
  const [hours, setHours] = useState(7);

  const kgPerHour = 38;
  const perDay = bots * hours * kgPerHour;
  const perYear = perDay * 300;
  const manualCrew = Math.round((bots * hours * kgPerHour) / 42);
  const co2 = Math.round(perYear * 0.0021);

  return (
    <section className="relative overflow-hidden bg-canvas py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-clay">
          <span className="h-px w-8 bg-clay" />
          Model it yourself
        </div>
        <h2 className="mt-6 max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] md:text-6xl">
          Drag the sliders.{" "}
          <span className="font-serif italic text-gradient">Watch a city change.</span>
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
          <div className="rounded-3xl border border-ink/10 bg-paper p-7">
            <label className="block">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-50">
                  Robots deployed
                </span>
                <span className="text-2xl font-medium tabular-nums">{bots}</span>
              </div>
              <input
                type="range"
                min={1}
                max={40}
                value={bots}
                onChange={(e) => setBots(+e.target.value)}
                className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink/10 accent-[var(--clay)]"
              />
            </label>

            <label className="mt-10 block">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-50">
                  Hours on water / day
                </span>
                <span className="text-2xl font-medium tabular-nums">{hours}</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={hours}
                onChange={(e) => setHours(+e.target.value)}
                className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink/10 accent-[var(--clay)]"
              />
            </label>

            <p className="mt-8 text-[12px] leading-relaxed text-ink-50">
              Modelled on Kengeri Lake field trials: ~38 kg of debris recovered per robot-hour, 300
              operating days a year.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl bg-ink/10 sm:grid-cols-2">
            {[
              [`${perDay.toLocaleString("en-IN")} kg`, "debris recovered every day"],
              [
                `${(perYear / 1000).toLocaleString("en-IN", { maximumFractionDigits: 1 })} t`,
                "recovered per year",
              ],
              [`${manualCrew}×`, "manual crews replaced from hazardous water work"],
              [`${co2.toLocaleString("en-IN")} t`, "CO₂e avoided vs diesel skimmer fleets"],
            ].map(([v, l]) => (
              <div key={l} className="bg-canvas p-8 md:p-10">
                <div className="text-4xl font-medium tabular-nums tracking-[-0.04em] text-gradient md:text-5xl">
                  {v}
                </div>
                <p className="mt-3 max-w-[24ch] text-[12.5px] leading-relaxed text-ink-50">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
