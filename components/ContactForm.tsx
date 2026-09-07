"use client";

import { useState, type FormEvent } from "react";
import { SERVICES } from "@/data/services";

const BUDGET_RANGES = [
  "Under ₹15,000 / month",
  "₹15,000 – ₹40,000 / month",
  "₹40,000 – ₹1,00,000 / month",
  "Above ₹1,00,000 / month",
  "Not sure yet",
];

type Status = "idle" | "submitting" | "success" | "error";

type Errors = Partial<Record<"name" | "phone" | "email" | "service" | "message", string>>;

const PHONE_PATTERN = /^[0-9+\-\s()]{7,15}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots tend to fill every field, humans never see this one.
    if ((data.get("company_website") as string)?.trim()) {
      setStatus("success");
      form.reset();
      return;
    }

    const name = (data.get("name") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const service = (data.get("service") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!phone || !PHONE_PATTERN.test(phone)) nextErrors.phone = "Please enter a valid phone number.";
    if (!email || !EMAIL_PATTERN.test(email)) nextErrors.email = "Please enter a valid email address.";
    if (!service) nextErrors.service = "Please select a service.";
    if (!message) nextErrors.message = "Please add a short message.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company: data.get("company"),
          phone,
          email,
          service,
          budget: data.get("budget"),
          message,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-ink-100 bg-white px-4 py-3.5 text-sm text-navy-900 placeholder:text-ink-300 focus:border-electric-500 focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-describedby="form-status">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy-900">
            Name <span className="text-electric-500">*</span>
          </label>
          <input id="name" name="name" type="text" required className={inputClass} placeholder="Your full name" />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-navy-900">
            Company Name
          </label>
          <input id="company" name="company" type="text" className={inputClass} placeholder="Your business name" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy-900">
            Phone Number <span className="text-electric-500">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} placeholder="+91 90000 00000" />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-900">
            Email <span className="text-electric-500">*</span>
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="you@business.com" />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-navy-900">
            Service Required <span className="text-electric-500">*</span>
          </label>
          <select id="service" name="service" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a service
            </option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Not sure / Multiple services">Not sure / Multiple services</option>
          </select>
          {errors.service && <p className="mt-1 text-xs text-red-600">{errors.service}</p>}
        </div>
        <div>
          <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-navy-900">
            Monthly Marketing Budget
          </label>
          <select id="budget" name="budget" defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a range
            </option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy-900">
          Message <span className="text-electric-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={inputClass}
          placeholder="Tell us a bit about your business and goals"
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-brand px-7 py-4 text-base font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : "Send Enquiry"}
      </button>

      <div id="form-status" role="status" aria-live="polite">
        {status === "success" && (
          <p className="text-sm font-medium text-emerald-600">
            Thank you. Your enquiry has been received — our team will get back to you shortly.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-medium text-red-600">
            Something went wrong. Please try again or call us directly.
          </p>
        )}
      </div>
    </form>
  );
}
