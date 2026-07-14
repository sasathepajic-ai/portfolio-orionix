import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "./constants";
import type { FAQ } from "./faqs";

const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;

export function constructMetadata({
  title = SITE_NAME,
  description = SITE_DESCRIPTION,
  path = "/",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    // Short and honest — one term per real thing we build, no keyword stuffing.
    keywords: [
      "AI assistants",
      "workflow automation",
      "business intelligence",
      "AI strategy",
      SITE_NAME,
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — Most of your problems don't need AI. Three of them probably do.`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE_URL],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}

export function generateJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/logo.svg`,
    // TODO: fill in with real social profile URLs (LinkedIn, X, etc.) once
    // they exist — intentionally left empty rather than fabricated.
    sameAs: [] as string[],
  };
}

interface ServiceInput {
  title: string;
  slug: string;
  description: string;
}

/** Service JSON-LD for a single /solutions/[slug] detail page. */
export function generateServiceJsonLd(solution: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.title,
    description: solution.description,
    serviceType: solution.title,
    url: `${SITE_URL}/solutions/${solution.slug}`,
    areaServed: "Worldwide",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

/** BreadcrumbList JSON-LD — pass path segments from Home down to the current page. */
export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** FAQPage JSON-LD built from the FAQS content used by FAQSection. */
export function generateFaqJsonLd(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
