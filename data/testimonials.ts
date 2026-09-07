export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  placeholder: boolean;
};

// Placeholder structure only. Replace with verified, client-approved
// testimonials — never populate with invented names or quotes.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Add verified client testimonial here.",
    name: "Client name",
    role: "Company / designation",
    placeholder: true,
  },
  {
    quote: "Add verified client testimonial here.",
    name: "Client name",
    role: "Company / designation",
    placeholder: true,
  },
  {
    quote: "Add verified client testimonial here.",
    name: "Client name",
    role: "Company / designation",
    placeholder: true,
  },
];
