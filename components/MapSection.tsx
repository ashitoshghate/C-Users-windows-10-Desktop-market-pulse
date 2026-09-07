import Icon from "./icons";
import { COMPANY, GOOGLE_MAPS_HREF } from "@/lib/constants";

export default function MapSection() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl border border-ink-100 bg-surface-soft p-10 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(#0b122015 1px, transparent 1px), linear-gradient(90deg, #0b122015 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-white shadow-card">
        <Icon name="mappin" className="h-7 w-7" />
      </span>
      <div className="relative">
        <p className="font-heading text-base font-semibold text-navy-900">{COMPANY.name}</p>
        <p className="mt-1 text-sm text-ink-500">{COMPANY.fullAddress}</p>
      </div>
      <a
        href={GOOGLE_MAPS_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-2 inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        <Icon name="mappin" className="h-4 w-4" />
        Open Location in Google Maps
      </a>
    </div>
  );
}
