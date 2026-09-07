import { NextResponse } from "next/server";
import { generateAdImage, type AdImageSize } from "@/lib/ai-image";
import { isRateLimited } from "@/lib/rate-limit";
import { notifyLead } from "@/lib/notify-lead";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PROMPT_LENGTH = 500;
const MIN_PROMPT_LENGTH = 8;

const SIZE_MAP: Record<string, AdImageSize> = {
  square: "1024x1024",
  landscape: "1536x1024",
  portrait: "1024x1536",
};

const STYLE_MODIFIERS: Record<string, string> = {
  festive: "festive offer/sale advertising creative, warm celebratory tones",
  launch: "product launch advertising creative, sleek and modern",
  minimal: "minimal and modern advertising creative, clean composition, generous negative space",
  bold: "bold and vibrant advertising creative, high contrast, energetic",
  corporate: "professional and corporate advertising creative, polished and trustworthy",
};

function sanitize(value: unknown, max: number): string {
  return typeof value === "string" ? value.slice(0, max).trim() : "";
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        error:
          "You've reached the free preview limit for now. Please contact us directly to explore more concepts.",
      },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = sanitize(body.name, 120);
  const email = sanitize(body.email, 160);
  const company = sanitize(body.company, 160);
  const prompt = sanitize(body.prompt, MAX_PROMPT_LENGTH);
  const style = sanitize(body.style, 40);
  const format = sanitize(body.format, 20);

  if (!name || !email || !prompt) {
    return NextResponse.json(
      { error: "Please fill in your name, email and a description of the creative." },
      { status: 400 }
    );
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (prompt.length < MIN_PROMPT_LENGTH) {
    return NextResponse.json(
      { error: "Please add a bit more detail to your description." },
      { status: 400 }
    );
  }

  const size = SIZE_MAP[format] || "1024x1024";
  const styleModifier = STYLE_MODIFIERS[style];
  const fullPrompt = styleModifier
    ? `${prompt}. Style: ${styleModifier}. No spelling errors in any on-image text.`
    : `${prompt}. Professional advertising creative. No spelling errors in any on-image text.`;

  const lead = { name, email, company, prompt, style, format, receivedAt: new Date().toISOString() };
  console.log("AI ad-generator lead:", lead);
  await notifyLead({ source: "ai-generator", ...lead });

  try {
    const image = await generateAdImage(fullPrompt, size);
    return NextResponse.json({ image });
  } catch (err) {
    console.error("Image generation error:", err);
    return NextResponse.json(
      { error: "We couldn't generate an image from that description. Try adjusting it and try again." },
      { status: 502 }
    );
  }
}
