import { createServerFn } from "@tanstack/react-start";
import { partnershipSchema } from "./partnership-schema";

export const submitPartnership = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => partnershipSchema.parse(input))
  .handler(async ({ data }) => {
    const { website: _website, ...submission } = data;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("partnership_requests").insert(submission);
    if (error) {
      console.error("Partnership request storage failed", error.code);
      throw new Error("Your request could not be saved. Please try again or contact us directly.");
    }
    return { success: true };
  });