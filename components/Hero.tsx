import Icon from "./icons";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-navy pt-16 pb-24 md:pt-24 md:pb-32">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-radial-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-px relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-electric-200">
              Digital Marketing &amp; Brand Building Agency
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="section-heading mt-6 text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
              Turn Your Brand Into A{" "}
              <span className="text-gradient">Market Force.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-100/80">
              Market Pulse helps businesses build strong brands, reach the right audience,
              generate quality leads, and accelerate growth through smart digital marketing.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-4 text-base font-semibold text-white shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start Your Growth Journey
                <Icon name="arrowRight" className="h-5 w-5" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore Our Services
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative hidden md:block">
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm" />

            <div className="absolute left-6 top-8 w-56 rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-glow animate-float">
              <div className="flex items-center justify-between text-white/70">
                <span className="text-xs font-semibold uppercase tracking-wider">Reach</span>
                <Icon name="eye" className="h-4 w-4" />
              </div>
              <div className="mt-4 flex items-end gap-1.5">
                {[40, 65, 50, 80, 60, 95].map((h, i) => (
                  <span
                    key={i}
                    className="w-3 rounded-t-sm bg-gradient-brand"
                    style={{ height: `${h * 0.5}px` }}
                  />
                ))}
              </div>
            </div>

            <div
              className="absolute right-4 top-32 w-48 rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-glow animate-float"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-white">
                  <Icon name="trendUp" className="h-[1.125rem] w-[1.125rem]" />
                </span>
                <div>
                  <p className="text-xs text-white/60">Growth Trend</p>
                  <p className="text-sm font-semibold text-white">Upward</p>
                </div>
              </div>
            </div>

            <div
              className="absolute bottom-10 left-10 w-52 rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-glow animate-float"
              style={{ animationDelay: "2.4s" }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cyan-400">
                  <Icon name="share" className="h-[1.125rem] w-[1.125rem]" />
                </span>
                <div>
                  <p className="text-xs text-white/60">Social Reach</p>
                  <p className="text-sm font-semibold text-white">Active Campaigns</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 right-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
              <Icon name="megaphone" className="h-7 w-7" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
