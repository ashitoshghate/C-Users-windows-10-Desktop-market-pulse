import { METRICS } from "@/data/metrics";
import Icon from "./icons";
import Reveal from "./Reveal";

export default function Analytics() {
  return (
    <section className="bg-surface-soft py-24 md:py-32">
      <div className="container-px grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="eyebrow text-electric-500">Performance &amp; Reporting</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-heading mt-4 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
              Marketing That Can Be Measured.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-500">
              Every campaign is tracked against the metrics that matter for your business, so
              decisions are based on real performance rather than guesswork.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {METRICS.map((metric, i) => (
              <Reveal key={metric.label} delay={i * 70}>
                <div className="rounded-xl border border-ink-100 bg-white p-4 shadow-card">
                  <Icon name={metric.icon} className="h-5 w-5 text-electric-500" />
                  <p className="mt-3 text-sm font-semibold text-navy-900">{metric.label}</p>
                  <p className="mt-1 text-xs leading-snug text-ink-500">{metric.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={200}>
          <div className="rounded-[2rem] bg-gradient-navy p-8 shadow-glow md:p-10">
            <div className="flex items-center justify-between text-white/70">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Illustrative Performance View
              </span>
              <Icon name="chart" className="h-5 w-5" />
            </div>
            <div className="mt-8 flex h-48 items-end gap-3">
              {[35, 55, 45, 70, 60, 85, 75].map((h, i) => (
                <div key={i} className="flex-1">
                  <div
                    className="w-full rounded-t-md bg-gradient-brand transition-all"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-white/50">
              Representative visual only — actual reporting is built around each client&apos;s
              own campaign data.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
