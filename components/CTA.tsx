import Icon from "./icons";
import Reveal from "./Reveal";
import { PHONE_HREF, COMPANY } from "@/lib/constants";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-navy py-24 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-radial-glow"
        aria-hidden="true"
      />
      <div className="container-px relative text-center">
        <Reveal>
          <h2 className="section-heading mx-auto max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            Ready To Grow Your Brand?
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-100/75">
            Tell us about your business and let&apos;s explore how digital marketing can help
            you reach your next growth milestone.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-4 text-base font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              Start a Conversation
              <Icon name="arrowRight" className="h-5 w-5" />
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              <Icon name="phone" className="h-5 w-5" />
              Call {COMPANY.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
