export type PortfolioCategory =
  | "Brand Building"
  | "Social Media"
  | "Website"
  | "SEO"
  | "Paid Advertising"
  | "Lead Generation";

export type PortfolioProject = {
  id: string;
  category: PortfolioCategory;
  industry: string;
  services: string[];
  description: string;
  results: string;
  placeholder: boolean;
};

// These are structural placeholders so the layout can be reviewed before
// real, verified case studies are added. No client names, images, or
// results are fabricated — replace each entry as real projects are approved.
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "project-brand-building",
    category: "Brand Building",
    industry: "Retail",
    services: ["Brand Strategy", "Visual Identity"],
    description: "A brand identity and positioning project for a growing retail business.",
    results: "Case study to be added once the project is approved for publishing.",
    placeholder: true,
  },
  {
    id: "project-social-media",
    category: "Social Media",
    industry: "Hospitality",
    services: ["Social Media Management", "Content Planning"],
    description: "Ongoing social media management and content strategy for a hospitality brand.",
    results: "Case study to be added once the project is approved for publishing.",
    placeholder: true,
  },
  {
    id: "project-website",
    category: "Website",
    industry: "Professional Services",
    services: ["Website Design", "Conversion Optimization"],
    description: "A lead-generation website built for a professional services firm.",
    results: "Case study to be added once the project is approved for publishing.",
    placeholder: true,
  },
  {
    id: "project-seo",
    category: "SEO",
    industry: "Healthcare",
    services: ["Local SEO", "On-Page SEO"],
    description: "Search visibility improvement project for a healthcare provider.",
    results: "Case study to be added once the project is approved for publishing.",
    placeholder: true,
  },
  {
    id: "project-paid-advertising",
    category: "Paid Advertising",
    industry: "E-commerce",
    services: ["Meta Ads", "Google Ads"],
    description: "Paid campaign management for an e-commerce business.",
    results: "Case study to be added once the project is approved for publishing.",
    placeholder: true,
  },
  {
    id: "project-lead-generation",
    category: "Lead Generation",
    industry: "Real Estate",
    services: ["Lead Funnels", "Landing Pages"],
    description: "A lead generation funnel built for a real estate business.",
    results: "Case study to be added once the project is approved for publishing.",
    placeholder: true,
  },
];
