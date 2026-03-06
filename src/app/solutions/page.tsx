import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { SolutionsContent } from "./SolutionsContent";

export const metadata: Metadata = constructMetadata({
  title: "Solutions",
  description:
    "Explore practical AI solutions from Pragmatic Labs AI — AI Assistants, Workflow Automation, Business Intelligence, and AI Strategy.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return <SolutionsContent />;
}
