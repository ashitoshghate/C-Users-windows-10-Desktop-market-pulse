import { INDUSTRIES } from "@/data/industries";
import Icon from "./icons";
import Reveal from "./Reveal";

export default function Industries() {
  return (
    <section id="industries" className="bg-surface-soft py-24 md:py-32">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow text-electric-500">Who We Work With</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-heading mt-4 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
              Industries We Serve
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              We work with businesses of every size, across a wide range of industries.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.name} delay={(i % 8) * 60}>
              <div className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-ink-100 bg-white p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft text-electric-500 transition-colors group-hover:bg-gradient-brand group-hover:text-white">
                  <Icon name={industry.icon} className="h-6 w-6" />
                </span>
                <span className="text-sm font-semibold text-navy-900">{industry.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
