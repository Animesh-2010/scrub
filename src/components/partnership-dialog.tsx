import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, CalendarDays, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { partnershipSchema, type PartnershipInput } from "@/lib/partnership-schema";
import { submitPartnership } from "@/lib/partnership.functions";

export type Interest = PartnershipInput["interest"];
export function PartnershipDialog({ interest, onClose }: { interest: Interest | null; onClose: () => void }) {
  const save = useServerFn(submitPartnership);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const meeting = interest === "Meeting";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = partnershipSchema.safeParse({ name: form.get("name"), email: form.get("email"), organization: form.get("organization"), interest, message: form.get("message"), preferred_date: meeting ? form.get("preferred_date") : null, preferred_time: meeting ? form.get("preferred_time") : null, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, website: form.get("website") });
    if (!result.success) { setError(result.error.issues[0]?.message ?? "Please check your details."); return; }
    setBusy(true); setError("");
    try { await save({ data: result.data }); setDone(true); } catch (e) { setError(e instanceof Error ? e.message : "Please try again."); } finally { setBusy(false); }
  }
  return <Dialog open={interest !== null} onOpenChange={(open) => { if (!open) onClose(); }}>
    <DialogContent className="scrub-dialog max-h-[90svh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-lg bg-paper p-6 md:p-8">
      <span className="scrub-eyebrow text-clay">LET’S PUT SOMETHING IN MOTION</span>
      <DialogTitle className="text-3xl leading-tight">{done ? "You’re on our radar." : meeting ? "Let’s talk lakes." : "Ready to save a lake?"}</DialogTitle>
      <DialogDescription>{done ? "Your request is saved. SCRUB will use your contact details to follow up." : meeting ? "Pick a preferred date. We’ll coordinate the meeting with you — this is a request, not a confirmed booking." : "Tell us what you have in mind. A lake, a deployment, a partnership — we’re listening."}</DialogDescription>
      {done ? <div className="py-6"><CheckCircle2 className="mb-4 size-10 text-clay" /><Button onClick={onClose}>Back to the water <ArrowUpRight /></Button></div> :
      <form onSubmit={submit} className="scrub-form mt-2 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2"><label>Your name<input name="name" autoComplete="name" required maxLength={100} /></label><label>Email<input name="email" type="email" autoComplete="email" required maxLength={255} /></label></div>
        <label>Organisation <span className="text-ink-50">(optional)</span><input name="organization" autoComplete="organization" maxLength={150} /></label>
        <p className="text-sm text-ink-60">Conversation: <strong className="text-ink">{interest}</strong></p>
        {meeting && <div className="grid gap-4 sm:grid-cols-2"><label>Preferred date<input name="preferred_date" type="date" required /></label><label>Preferred time<select name="preferred_time" required><option value="">Choose a time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label><p className="text-xs text-ink-50 sm:col-span-2">Time preferences use your local time zone.</p></div>}
        <label>{meeting ? "What would you like to discuss?" : "Your lake / project / idea"}<textarea name="message" required maxLength={2000} rows={3} /></label>
        <label className="hidden" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <p className="text-xs leading-relaxed text-ink-50">Your details are used to respond to this enquiry. No public listing, no newsletter signup.</p>
        <Button type="submit" disabled={busy} className="h-12">{busy ? "Saving your request…" : meeting ? "Request a meeting" : "Send your request"}{meeting ? <CalendarDays /> : <ArrowUpRight />}</Button>
      </form>}
    </DialogContent>
  </Dialog>;
}