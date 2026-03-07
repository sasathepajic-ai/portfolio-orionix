import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import { SOLUTIONS } from "@/lib/constants";
import { SolutionDetail } from "./SolutionDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  if (!solution) return {};
  return constructMetadata({
    title: solution.title,
    description: solution.description,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  if (!solution) notFound();
  return <SolutionDetail solution={solution} />;
}
