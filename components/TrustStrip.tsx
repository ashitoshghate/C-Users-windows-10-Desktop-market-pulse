import Icon from "./icons";
import Reveal from "./Reveal";

const ITEMS = [
  {
    icon: "branding",
    title: "Brand Strategy",
    description: "Build a strong and recognizable brand.",
  },
  {
    icon: "megaphone",
    title: "Digital Marketing",
    description: "Reach the right audience across digital channels.",
  },
  {
    icon: "funnel",
    title: "Lead Generation",
    description: "Turn attention into qualified business opportunities.",
  },
  {
    icon: "trendUp",
    title: "Growth Strategy",
    description: "Use data and insights to continuously improve performance.",
  },
];

export default function TrustStrip() {
  return (
    <section className="relative -mt-12 md:-mt-16">
      <div className="container-px">
        <div className="grid grid-cols-1 gap-4 rounded-2xl bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="group flex h-full flex-col gap-4 rounded-xl p-5 transition-colors hover:bg-surface-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft text-electric-500">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
