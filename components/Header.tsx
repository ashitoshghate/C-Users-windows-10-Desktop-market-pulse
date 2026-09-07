"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/data/nav";
import Icon from "./icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-card border-b border-ink-100"
          : "bg-transparent"
      }`}
    >
      <div className="container-px flex h-20 items-center justify-between">
        <Link href="#home" className="flex flex-col leading-none group">
          <span className="font-heading text-xl md:text-2xl font-bold tracking-tight text-navy-900">
            MARKET <span className="text-electric-500">PULSE</span>
          </span>
          <span className="mt-0.5 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">
            Digital Growth &amp; Brand Building
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-5" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-ink-700 hover:text-electric-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden xl:inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
        >
          Let&apos;s Grow Your Brand
          <Icon name="arrowRight" className="h-4 w-4" />
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-100 text-navy-900"
        >
          <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="xl:hidden fixed inset-0 top-20 z-40 bg-white">
          <nav className="container-px flex flex-col gap-1 py-6" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-4 text-base font-semibold text-navy-900 hover:bg-surface-soft"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-4 text-base font-semibold text-white"
            >
              Let&apos;s Grow Your Brand
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
