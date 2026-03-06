import { Hero } from "@/components/sections/Hero";
import { TrustSection } from "@/components/sections/TrustSection";
import { ValueSection } from "@/components/sections/ValueSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSection />
      <ValueSection />
      <SolutionsSection />
      <WhyUsSection />
      <ImpactSection />
      <CTASection />
    </>
  );
}
