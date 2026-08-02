import { createFileRoute } from "@tanstack/react-router";
import { ConnectPage, connectMeta } from "@/components/connect-page";

export const Route = createFileRoute("/links")({
  head: () => ({ meta: connectMeta }),
  component: ConnectPage,
});
