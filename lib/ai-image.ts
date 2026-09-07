// Thin adapter around the image-generation provider. Kept as a single
// function so switching providers later (Stability AI, Replicate, etc.)
// only means rewriting this file — nothing else in the app depends on
// OpenAI specifically.

export type AdImageSize = "1024x1024" | "1536x1024" | "1024x1536";

const OPENAI_IMAGES_URL = "https://api.openai.com/v1/images/generations";
const REQUEST_TIMEOUT_MS = 60_000;

export async function generateAdImage(prompt: string, size: AdImageSize): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured on the server.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(OPENAI_IMAGES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        size,
        quality: "medium",
        n: 1,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Image provider error (${res.status}): ${detail.slice(0, 400)}`);
    }

    const data = await res.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) {
      throw new Error("Image provider returned no image data.");
    }
    return b64 as string;
  } finally {
    clearTimeout(timeout);
  }
}
