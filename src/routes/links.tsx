import { createFileRoute } from "@tanstack/react-router";
import { ConnectPage, connectMeta } from "@/components/connect-page";

export const Route = createFileRoute("/links")({
  head: () => ({ meta: connectMeta.map((item) => "title" in item ? { title: "SCRUB Robotics — Links, footage and contact" } : "property" in item && item.property === "og:title" ? { property: "og:title", content: "SCRUB Robotics — Every link, one place" } : ("name" in item && item.name === "description") ? { name: "description", content: "Find SCRUB Robotics lake-trial footage, field notes, social links and contact details in one place." } : ("property" in item && item.property === "og:description") ? { property: "og:description", content: "Your shortcut to SCRUB Robotics: lake footage, field notes, social channels and conversations." } : item) }),
  component: ConnectPage,
});
