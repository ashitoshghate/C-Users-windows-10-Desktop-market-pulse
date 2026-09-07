import { SERVICES } from "@/data/services";
import Icon from "./icons";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="bg-surface-soft py-24 md:py-32">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow text-electric-500">What We Do</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-heading mt-4 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
              Everything Your Brand Needs To Grow Digitally.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 100}>
              <article
                id={service.id}
                className="group relative flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-card-hover"
              >
                <span className="absolute right-6 top-6 font-heading text-2xl font-bold text-ink-100 transition-colors group-hover:text-electric-100">
                  {service.number}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft text-electric-500 transition-colors group-hover:bg-gradient-brand group-hover:text-white">
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>
                <h3 className="section-heading mt-5 text-lg font-semibold text-navy-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{service.summary}</p>

                <ul className="mt-5 space-y-2 border-t border-ink-100 pt-5">
                  {service.points.slice(0, 4).map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-ink-700">
                      <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-electric-500" />
                      {point}
                    </li>
                  ))}
                </ul>
                {service.points.length > 4 && (
                  <p className="mt-3 text-xs font-medium text-ink-300">
                    +{service.points.length - 4} more
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
