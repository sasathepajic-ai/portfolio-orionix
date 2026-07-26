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
      {/* The representative-project section is out until there is a real,
          cleared engagement to put in it — an illustrative example is not
          something we can honestly show as proof yet. Restore with
          <CaseStudy study={...} /> from components/sections/CaseStudy.tsx. */}
      <ProofNote />
      <FAQSection />
      <CorrectionsBox />
      <Testimonial />
      <CTASection />
    </>
  );
}
