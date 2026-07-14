import { Hero } from "@/components/sections/Hero";
import { RefusalColumn } from "@/components/sections/RefusalColumn";
import { SectionsTeasers } from "@/components/sections/SectionsTeasers";
import { TheRecord } from "@/components/sections/TheRecord";
import { WeekByWeek } from "@/components/sections/WeekByWeek";
import { ProofNote } from "@/components/sections/ProofNote";
import { FAQSection } from "@/components/sections/FAQSection";
import { CorrectionsBox } from "@/components/sections/CorrectionsBox";
import { Testimonial } from "@/components/sections/Testimonial";
import { CTASection } from "@/components/sections/CTASection";
import { generateFaqJsonLd } from "@/lib/seo";
import { FAQS } from "@/lib/faqs";

export default function Home() {
  const faqJsonLd = generateFaqJsonLd(FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <RefusalColumn />
      <SectionsTeasers />
      <TheRecord />
      <WeekByWeek />
      <ProofNote />
      <FAQSection />
      <CorrectionsBox />
      <Testimonial />
      <CTASection />
    </>
  );
}
