import { NextResponse } from "next/server";
import { askAssistant, type ChatMessage } from "@/lib/chat";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 800;
const MAX_HISTORY = 8;
const RATE_LIMIT = { windowMs: 60 * 60 * 1000, max: 30 };

function isValidHistory(value: unknown): value is ChatMessage[] {
  if (!Array.isArray(value)) return false;
  return value.every(
    (m) =>
      m &&
      typeof m === "object" &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.trim().length > 0 &&
      m.content.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(`chat:${ip}`, RATE_LIMIT)) {
    return NextResponse.json(
      { error: "You've sent a lot of messages — please try again a bit later, or contact us directly." },
      { status: 429 }
    );
  }

  let body: { history?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!isValidHistory(body.history) || body.history.length === 0) {
    return NextResponse.json({ error: "Please include a message." }, { status: 400 });
  }

  const history = body.history.slice(-MAX_HISTORY);
  if (history[history.length - 1].role !== "user") {
    return NextResponse.json({ error: "The last message must be from the visitor." }, { status: 400 });
  }

  try {
    const reply = await askAssistant(history);
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json(
      { error: "Something went wrong answering that. Please try again or use the contact form." },
      { status: 502 }
    );
  }
}
