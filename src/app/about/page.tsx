import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = constructMetadata({
  title: "About",
  description:
    "Pragmatic Labs AI empowers businesses by making sophisticated AI technology practical, accessible, and easy to use.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutContent />;
}
