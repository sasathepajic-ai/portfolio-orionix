import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = constructMetadata({
  title: "Contact",
  description:
    "Start a 30-minute conversation with Pragmatic Labs AI about what's slowing your team down — and an honest read on where AI will and won't help.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
