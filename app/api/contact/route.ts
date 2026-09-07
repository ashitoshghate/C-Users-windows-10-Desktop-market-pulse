import { NextResponse } from "next/server";
import { notifyLead } from "@/lib/notify-lead";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  service?: string;
  budget?: string;
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s()]{7,15}$/;
const MAX_LENGTH = 2000;

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.slice(0, MAX_LENGTH).trim();
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = sanitize(body.name);
  const company = sanitize(body.company);
  const phone = sanitize(body.phone);
  const email = sanitize(body.email);
  const service = sanitize(body.service);
  const budget = sanitize(body.budget);
  const message = sanitize(body.message);

  if (!name || !phone || !email || !service || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (!PHONE_PATTERN.test(phone)) {
    return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
  }

  const enquiry = { name, company, phone, email, service, budget, message, receivedAt: new Date().toISOString() };

  console.log("New Market Pulse enquiry:", enquiry);
  await notifyLead({ source: "contact-form", ...enquiry });

  return NextResponse.json({ success: true });
}
