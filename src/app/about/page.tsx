import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = constructMetadata({
  title: "About",
  description:
    "Pragmatic Labs AI builds AI assistants, automation, and analytics on the systems mid-sized teams already run — and says so when AI isn't the right fit.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutContent />;
}
