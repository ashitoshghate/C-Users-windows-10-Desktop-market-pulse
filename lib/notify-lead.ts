// Fire-and-forget lead notification. Posts a JSON payload to LEAD_WEBHOOK_URL
// if configured — point that at a Zapier/Make catch hook, a Slack Incoming
// Webhook, or your own serverless function to fan the lead out to email/CRM.
// If it isn't configured, leads still land in the server logs (current
// behavior) so nothing breaks without it.

type LeadPayload = {
  source: "contact-form" | "ai-generator";
  [key: string]: unknown;
};

const TIMEOUT_MS = 8_000;

export async function notifyLead(payload: LeadPayload): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, sentAt: new Date().toISOString() }),
      signal: controller.signal,
    });
  } catch (err) {
    console.error("Lead webhook notification failed:", err);
  } finally {
    clearTimeout(timeout);
  }
}
