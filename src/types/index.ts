export interface Service {
  title: string;
  icon: string;
  description: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  useCases?: string[];
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
