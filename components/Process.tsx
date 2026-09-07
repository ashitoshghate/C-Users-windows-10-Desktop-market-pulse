import { PROCESS_STEPS } from "@/data/process";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-32">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow text-electric-500">How We Work</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-heading mt-4 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
              Our Process
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div
            className="absolute left-6 top-0 hidden h-full w-px bg-ink-100 md:left-1/2 md:block"
            aria-hidden="true"
          />

          <ol className="space-y-10 md:space-y-0">
            {PROCESS_STEPS.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <li key={item.step} className="relative md:grid md:grid-cols-2 md:gap-10 md:py-8">
                  <div
                    className={`flex gap-5 md:block ${
                      isEven ? "md:col-start-1 md:text-right" : "md:col-start-2"
                    }`}
                  >
                    <Reveal delay={i * 80} className="w-full">
                      <div
                        className={`rounded-2xl border border-ink-100 bg-white p-6 shadow-card ${
                          isEven ? "md:mr-8" : "md:ml-8"
                        }`}
                      >
                        <span className="eyebrow text-electric-500">Step {item.step}</span>
                        <h3 className="section-heading mt-2 text-xl font-bold text-navy-900">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-500">
                          {item.description}
                        </p>
                      </div>
                    </Reveal>
                  </div>

                  <span
                    className="absolute left-6 top-1 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-electric-500 shadow-card md:left-1/2 md:block"
                    aria-hidden="true"
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
