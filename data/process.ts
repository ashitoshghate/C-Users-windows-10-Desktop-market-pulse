export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description: "Understand the business, market, audience and objectives.",
  },
  {
    step: "02",
    title: "Strategize",
    description: "Build the digital marketing and brand strategy.",
  },
  {
    step: "03",
    title: "Create",
    description: "Develop content, campaigns, creatives and digital assets.",
  },
  {
    step: "04",
    title: "Launch",
    description: "Launch marketing campaigns across relevant channels.",
  },
  {
    step: "05",
    title: "Measure",
    description: "Track performance and analyze results.",
  },
  {
    step: "06",
    title: "Optimize",
    description: "Continuously improve campaigns and growth opportunities.",
  },
];
