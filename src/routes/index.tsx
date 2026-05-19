import { createFileRoute } from "@tanstack/react-router";
import App from "@/eye-care/App";

export const Route = createFileRoute("/")({
  component: App,
  head: () => ({
    meta: [
      { title: "Eye Care NABH Readiness Assessment" },
      {
        name: "description",
        content:
          "NABH Accreditation Readiness Assessment for Eye Care Organisations — 2nd Edition (Effective Jan 2026)",
      },
    ],
  }),
});
