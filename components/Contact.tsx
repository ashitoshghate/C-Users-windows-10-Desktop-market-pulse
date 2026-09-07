import Icon from "./icons";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import MapSection from "./MapSection";
import { COMPANY, PHONE_HREF, WHATSAPP_HREF } from "@/lib/constants";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow text-electric-500">Get In Touch</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-heading mt-4 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
              Let&apos;s Discuss Your Growth
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Share a few details about your business and our team will get back to you.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card md:p-9">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-2xl bg-gradient-navy p-8 text-white shadow-glow">
                <p className="font-heading text-lg font-semibold">{COMPANY.name}</p>
                <p className="mt-3 flex items-start gap-2 text-sm text-white/75">
                  <Icon name="mappin" className="mt-0.5 h-4 w-4 shrink-0" />
                  {COMPANY.fullAddress}
                </p>

                <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  <a
                    href={PHONE_HREF}
                    className="flex items-center gap-3 text-sm font-semibold hover:text-electric-200"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                      <Icon name="phone" className="h-4 w-4" />
                    </span>
                    {COMPANY.phoneDisplay}
                  </a>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-semibold hover:text-electric-200"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                      <Icon name="whatsapp" className="h-4 w-4" />
                    </span>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <MapSection />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
