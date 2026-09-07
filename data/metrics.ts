export type Metric = {
  label: string;
  description: string;
  icon: string;
};

// Conceptual categories only — intentionally no invented numbers or
// client-specific figures. Reporting is built around what is actually
// measurable for each campaign.
export const METRICS: Metric[] = [
  { label: "Reach", description: "How many people see your brand", icon: "eye" },
  { label: "Engagement", description: "How your audience interacts with your content", icon: "chat" },
  { label: "Website Traffic", description: "Visitors arriving through digital channels", icon: "traffic" },
  { label: "Leads", description: "Enquiries generated from campaigns", icon: "funnel" },
  { label: "Conversions", description: "Leads that turn into business opportunities", icon: "check" },
  { label: "Campaign Performance", description: "Overall effectiveness across channels", icon: "chart" },
];
