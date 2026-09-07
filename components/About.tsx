import Icon from "./icons";
import Reveal from "./Reveal";

const CAPABILITIES = [
  "Strategy & Branding",
  "Social Media & Content",
  "Search & Performance Marketing",
  "Lead Generation",
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-px grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="aspect-[4/5] w-full max-w-md rounded-[2rem] bg-gradient-navy p-8 shadow-glow">
              <div className="flex h-full flex-col justify-between">
                <span className="eyebrow text-electric-200">Market Pulse</span>
                <div className="space-y-5">
                  {CAPABILITIES.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-cyan-400">
                        <Icon name="check" className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
                <span className="font-heading text-lg font-semibold text-white">
                  One Growth Partner.
                </span>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 hidden h-28 w-28 items-center justify-center rounded-2xl bg-white shadow-card md:flex">
              <Icon name="spark" className="h-10 w-10 text-electric-500" />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow text-electric-500">About Market Pulse</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-heading mt-4 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
              We Don&apos;t Just Market Brands. We Build Them.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-500">
              <p>
                Market Pulse is a digital marketing and brand-building company focused on
                helping businesses establish a powerful digital presence and achieve
                measurable growth.
              </p>
              <p>
                From strategy and branding to social media, search marketing, content,
                advertising and lead generation, we bring multiple digital growth
                capabilities together under one roof.
              </p>
              <p>
                Our approach combines creativity, technology, data and business
                understanding to create marketing strategies designed around each
                client&apos;s goals.
              </p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Talk to Our Team
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
