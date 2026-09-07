import Icon from "./icons";
import Reveal from "./Reveal";

const BRANCHES = [
  { label: "Brand", tags: ["Branding", "Content"], icon: "spark" },
  { label: "Traffic", tags: ["SEO", "Social"], icon: "trendUp" },
  { label: "Leads", tags: ["Advertising", "Campaigns"], icon: "funnel" },
];

function Node({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "primary";
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-card ${
        variant === "primary"
          ? "bg-gradient-brand text-white"
          : "border border-ink-100 bg-white text-navy-900"
      }`}
    >
      {children}
    </div>
  );
}

function Connector() {
  return (
    <div className="flex justify-center" aria-hidden="true">
      <div className="h-8 w-px bg-ink-100" />
    </div>
  );
}

export default function Ecosystem() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow text-electric-500">How It Connects</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-heading mt-4 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
              Our Digital Growth Ecosystem
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Market Pulse connects branding, marketing, traffic and lead generation into
              one continuous system built for sustainable growth.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mx-auto mt-14 flex max-w-4xl flex-col items-center">
            <Node variant="primary">
              <Icon name="spark" className="h-4 w-4" />
              MARKET PULSE
            </Node>

            <Connector />

            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3">
              {BRANCHES.map((branch) => (
                <div key={branch.label} className="flex flex-col items-center">
                  <Node>
                    <Icon name={branch.icon} className="h-4 w-4 text-electric-500" />
                    {branch.label.toUpperCase()}
                  </Node>
                  <Connector />
                  <div className="flex flex-col items-center gap-3">
                    {branch.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-xl border border-dashed border-ink-100 bg-surface-soft px-5 py-2.5 text-sm font-medium text-ink-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Connector />
            <Node variant="primary">
              <Icon name="trendUp" className="h-4 w-4" />
              SALES
            </Node>
            <Connector />
            <Node>
              <Icon name="check" className="h-4 w-4 text-electric-500" />
              GROWTH
            </Node>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
