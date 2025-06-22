export interface PricingTier {
  name: string;
  price: string;
  duration: string;
  deliverables: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
}

export interface Service {
  title: string;
  icon: string;
  description: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  useCases: string[];
  technologies: string[];
  technologyLinks?: {
    [key: string]: string;
  };
  pricingTiers?: {
    [key: string]: PricingTier;
  };
  testimonials?: Testimonial[];
  timeline?: {
    [key: string]: string;
  };
  industries?: string[];
  prerequisites?: string[];
  successMetrics?: string[];
  relatedServices?: string[];
}

export interface ServiceData {
  [key: string]: Service;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  image?: string; // Optional field for local images
}

export interface TeamData {
  summary: string;
  members: TeamMember[];
}
