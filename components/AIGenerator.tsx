"use client";

import { useState, type FormEvent } from "react";
import Icon from "./icons";
import Reveal from "./Reveal";

const STYLES = [
  { value: "festive", label: "Festive / Offer" },
  { value: "launch", label: "Product Launch" },
  { value: "minimal", label: "Minimal & Modern" },
  { value: "bold", label: "Bold & Vibrant" },
  { value: "corporate", label: "Corporate & Professional" },
];

const FORMATS = [
  { value: "square", label: "Square (1:1)" },
  { value: "landscape", label: "Landscape banner" },
  { value: "portrait", label: "Story / vertical" },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function AIGenerator() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [image, setImage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          prompt: data.get("prompt"),
          style: data.get("style"),
          format: data.get("format"),
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setImage(json.image);
      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-ink-100 bg-white px-4 py-3.5 text-sm text-navy-900 placeholder:text-ink-300 focus:border-electric-500 focus:outline-none transition-colors";

  return (
    <section id="ai-generator" className="py-24 md:py-32">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow text-electric-500">AI-Powered Creative</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-heading mt-4 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
              Generate An Ad Visual With AI
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Describe the ad creative you need and get an AI-generated starting point in
              moments — a fast way to explore concepts before a full campaign build.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card md:p-9">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy-900">
                      Name <span className="text-electric-500">*</span>
                    </label>
                    <input name="name" type="text" required className={inputClass} placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy-900">
                      Business Email <span className="text-electric-500">*</span>
                    </label>
                    <input name="email" type="email" required className={inputClass} placeholder="you@business.com" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-900">Company Name</label>
                  <input name="company" type="text" className={inputClass} placeholder="Your business name" />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-900">
                    Describe your ad creative <span className="text-electric-500">*</span>
                  </label>
                  <textarea
                    name="prompt"
                    required
                    minLength={8}
                    maxLength={500}
                    rows={3}
                    className={inputClass}
                    placeholder="e.g. A vibrant festive sale banner for a sweets shop, warm gold and red tones"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy-900">Style</label>
                    <select name="style" defaultValue="corporate" className={inputClass}>
                      {STYLES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy-900">Format</label>
                    <select name="format" defaultValue="square" className={inputClass}>
                      {FORMATS.map((f) => (
                        <option key={f.value} value={f.value}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-4 text-base font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
                >
                  {status === "submitting" ? "Generating..." : "Generate Ad Creative"}
                  {status !== "submitting" && <Icon name="spark" className="h-4 w-4" />}
                </button>

                {status === "error" && (
                  <p role="alert" className="text-sm font-medium text-red-600">
                    {errorMsg}
                  </p>
                )}

                <p className="text-xs leading-relaxed text-ink-300">
                  AI-generated visuals are a starting point for ideation. Our team reviews and
                  refines every creative before it goes into a live campaign. Limited free
                  previews per visitor.
                </p>
              </form>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col items-center justify-center gap-5 rounded-[2rem] bg-gradient-navy p-8 text-center shadow-glow md:p-10">
              {status === "submitting" && (
                <div className="flex flex-col items-center gap-4 text-white/70">
                  <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  <p className="text-sm">Generating your ad creative...</p>
                </div>
              )}

              {status === "success" && image && (
                <>
                  <img
                    src={`data:image/png;base64,${image}`}
                    alt="AI-generated advertising creative based on your description"
                    className="w-full rounded-xl shadow-card"
                  />
                  <a
                    href={`data:image/png;base64,${image}`}
                    download="market-pulse-ad-creative.png"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Download Image
                  </a>
                </>
              )}

              {(status === "idle" || status === "error") && (
                <div className="flex flex-col items-center gap-3 text-white/60">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-cyan-400">
                    <Icon name="spark" className="h-7 w-7" />
                  </span>
                  <p className="text-sm">Your generated ad creative will appear here.</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
