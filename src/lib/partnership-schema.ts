import { z } from "zod";

export const partnershipSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  organization: z.string().trim().max(150),
  interest: z.enum(["Robot purchase", "Lake cleaning", "Water analytics", "Collaboration", "Investment", "Meeting"]),
  message: z.string().trim().min(1, "Tell us a little about your project.").max(2000),
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  preferred_time: z.enum(["Morning", "Afternoon", "Evening"]).nullable(),
  timezone: z.string().trim().min(1).max(100),
  website: z.string().max(0),
}).superRefine((value, ctx) => {
  if (value.preferred_date) {
    const parsed = new Date(`${value.preferred_date}T23:59:59Z`);
    if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value.preferred_date || parsed.getTime() < Date.now()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["preferred_date"], message: "Choose today or a future date." });
    }
  }
  if (value.interest === "Meeting" && (!value.preferred_date || !value.preferred_time)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["preferred_date"], message: "Choose your preferred date and time." });
  }
});
export type PartnershipInput = z.infer<typeof partnershipSchema>;