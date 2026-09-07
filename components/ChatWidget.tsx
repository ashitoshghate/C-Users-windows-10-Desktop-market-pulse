"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Icon from "./icons";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi! I'm the Market Pulse assistant. Ask me about our services, industries we work with, or how to get started.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: nextMessages.filter((m) => m !== GREETING) }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setMessages((prev) => [...prev, { role: "assistant", content: json.reply }]);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {open && (
        <div
          role="dialog"
          aria-label="Market Pulse chat assistant"
          className="mb-4 flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-glow"
        >
          <div className="flex items-center justify-between bg-gradient-navy px-5 py-4">
            <div className="flex items-center gap-2 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-cyan-400">
                <Icon name="chat" className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">Market Pulse Assistant</p>
                <p className="text-[11px] text-white/50">Ask about our services</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-gradient-brand text-white"
                    : "bg-surface-soft text-ink-700"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="flex w-fit items-center gap-1.5 rounded-2xl bg-surface-soft px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-300 [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-300 [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-300" />
              </div>
            )}
            {error && <p className="text-xs font-medium text-red-600">{error}</p>}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-ink-100 p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={800}
              placeholder="Type your question..."
              aria-label="Your message"
              className="flex-1 rounded-full border border-ink-100 px-4 py-2.5 text-sm text-navy-900 placeholder:text-ink-300 focus:border-electric-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white disabled:opacity-50"
            >
              <Icon name="arrowRight" className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-white shadow-glow transition-transform hover:scale-105"
      >
        <Icon name={open ? "close" : "chat"} className="h-6 w-6" />
      </button>
    </div>
  );
}
