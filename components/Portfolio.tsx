import { PORTFOLIO_PROJECTS } from "@/data/portfolio";
import Icon from "./icons";
import Reveal from "./Reveal";

const CATEGORY_ICON: Record<string, string> = {
  "Brand Building": "spark",
  "Social Media": "share",
  Website: "browser",
  SEO: "search",
  "Paid Advertising": "target",
  "Lead Generation": "funnel",
};

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow text-electric-500">Our Work</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-heading mt-4 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
              Portfolio
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              A look at the type of work Market Pulse takes on. Case studies are added here as
              projects are completed and approved for publishing.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 100}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
                <div className="flex aspect-[16/10] items-center justify-center bg-gradient-navy">
                  <Icon
                    name={CATEGORY_ICON[project.category] || "spark"}
                    className="h-12 w-12 text-electric-300"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-gradient-brand-soft px-3 py-1 text-xs font-semibold text-electric-500">
                      {project.category}
                    </span>
                    <span className="text-xs font-medium text-ink-300">{project.industry}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-700">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-surface-soft px-2.5 py-1 text-xs font-medium text-ink-500"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 border-t border-ink-100 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-300">
                      Results
                    </p>
                    <p className="mt-1 text-sm italic text-ink-500">{project.results}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
