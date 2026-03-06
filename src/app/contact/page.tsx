import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = constructMetadata({
  title: "Contact",
  description:
    "Get in touch with Pragmatic Labs AI. Let's discuss how practical AI solutions can help your business.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
