import Icon from "./icons";
import Reveal from "./Reveal";

const BENEFITS = [
  {
    icon: "compass",
    title: "Strategy First",
    description: "Every campaign begins with understanding the business and audience.",
  },
  {
    icon: "layers",
    title: "One Growth Partner",
    description:
      "Strategy, branding, content, advertising and digital marketing under one roof.",
  },
  {
    icon: "chart",
    title: "Data Driven",
    description: "Use campaign data and performance insights to improve decisions.",
  },
  {
    icon: "spark",
    title: "Creative Thinking",
    description: "Combine creative ideas with business objectives.",
  },
  {
    icon: "eye",
    title: "Transparent Approach",
    description: "Clear communication, defined objectives and understandable reporting.",
  },
  {
    icon: "trendUp",
    title: "Long-Term Brand Building",
    description:
      "Focus on building sustainable digital presence rather than short-term attention alone.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-market-pulse" className="relative overflow-hidden bg-gradient-navy py-24 md:py-32">
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-electric-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-px relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow text-electric-200">The Market Pulse Advantage</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-heading mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Why Businesses Choose Market Pulse
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 100}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors hover:bg-white/[0.08]">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="section-heading mt-5 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-100/70">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
