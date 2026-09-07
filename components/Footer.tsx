import Link from "next/link";
import Icon from "./icons";
import { NAV_ITEMS } from "@/data/nav";
import {
  COMPANY,
  PHONE_HREF,
  WHATSAPP_HREF,
  SOCIAL_LINKS,
  CONTACT_EMAIL,
} from "@/lib/constants";

const SERVICE_LINKS = [
  "Digital Marketing",
  "SEO",
  "Social Media",
  "Paid Advertising",
  "Branding",
  "Content Marketing",
  "Website Development",
  "Lead Generation",
];

const SOCIALS = [
  { key: "instagram", label: "Instagram", icon: "share" },
  { key: "facebook", label: "Facebook", icon: "share" },
  { key: "linkedin", label: "LinkedIn", icon: "share" },
  { key: "youtube", label: "YouTube", icon: "share" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="container-px grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-xl font-bold text-white">
            MARKET <span className="text-electric-400">PULSE</span>
          </p>
          <p className="mt-2 text-sm text-white/50">Digital Growth &amp; Brand Building</p>
          <p className="mt-6 text-sm leading-relaxed text-white/50">
            Helping businesses build strong brands and grow through smart, measurable digital
            marketing.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/90">
            Quick Links
          </p>
          <ul className="mt-4 space-y-3">
            {NAV_ITEMS.filter((n) => n.label !== "Why Market Pulse" && n.label !== "Process").map(
              (item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm hover:text-electric-300">
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/90">Services</p>
          <ul className="mt-4 space-y-3">
            {SERVICE_LINKS.map((s) => (
              <li key={s}>
                <a href="#services" className="text-sm hover:text-electric-300">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/90">Contact</p>
          <p className="mt-4 flex items-start gap-2 text-sm">
            <Icon name="mappin" className="mt-0.5 h-4 w-4 shrink-0 text-electric-400" />
            {COMPANY.fullAddress}
          </p>
          <a href={PHONE_HREF} className="mt-3 flex items-center gap-2 text-sm hover:text-electric-300">
            <Icon name="phone" className="h-4 w-4 text-electric-400" />
            {COMPANY.phoneDisplay}
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-2 text-sm hover:text-electric-300"
          >
            <Icon name="whatsapp" className="h-4 w-4 text-electric-400" />
            WhatsApp
          </a>
          <p className="mt-3 flex items-center gap-2 text-sm text-white/40">
            <Icon name="mail" className="h-4 w-4" />
            {CONTACT_EMAIL || "Email — coming soon"}
          </p>

          <div className="mt-5 flex gap-3">
            {SOCIALS.map((s) => {
              const href = SOCIAL_LINKS[s.key];
              return href ? (
                <a
                  key={s.key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 hover:border-electric-400 hover:text-electric-300"
                >
                  <Icon name={s.icon} className="h-4 w-4" />
                </a>
              ) : (
                <span
                  key={s.key}
                  aria-label={`${s.label} — coming soon`}
                  title={`${s.label} — coming soon`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/25"
                >
                  <Icon name={s.icon} className="h-4 w-4" />
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-px flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Market Pulse. All rights reserved.</p>
          <Link href="#home" className="hover:text-electric-300">
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
