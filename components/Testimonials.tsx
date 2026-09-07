import { TESTIMONIALS } from "@/data/testimonials";
import Icon from "./icons";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <section className="bg-surface-soft py-24 md:py-32">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow text-electric-500">Client Voices</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-heading mt-4 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
              What Clients Say
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-2xl border border-dashed border-ink-100 bg-white p-7 shadow-card">
                <Icon name="chat" className="h-6 w-6 text-electric-300" />
                <blockquote className="mt-4 flex-1 text-sm italic leading-relaxed text-ink-500">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-ink-100 pt-4">
                  <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                  <p className="text-xs text-ink-300">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
