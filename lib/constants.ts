export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://marketplusecompony.com";

export const COMPANY = {
  name: "Market Pulse",
  tagline: "Digital Growth & Brand Building",
  addressLine1: "Prabhakar Pustakalay, Shani Chowk",
  addressLine2: "Ahilyanagar – 414001, Maharashtra, India",
  fullAddress: "Prabhakar Pustakalay, Shani Chowk, Ahilyanagar – 414001, Maharashtra, India",
  phoneDisplay: "+91 98900 36379",
  phoneRaw: "9890036379",
  phoneIntl: "919890036379",
};

export const PHONE_HREF = `tel:+${COMPANY.phoneIntl}`;

export const WHATSAPP_MESSAGE =
  "Hello Market Pulse, I would like to discuss digital marketing and brand-building services for my business.";

export const WHATSAPP_HREF = `https://wa.me/${COMPANY.phoneIntl}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

export const GOOGLE_MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  COMPANY.fullAddress
)}`;

// Placeholders — replace when real accounts/addresses are available.
// Left empty intentionally so the footer renders them as "coming soon"
// rather than fabricating a URL or address.
export const SOCIAL_LINKS = {
  instagram: "",
  facebook: "",
  linkedin: "",
  youtube: "",
};

export const CONTACT_EMAIL = ""; // add verified business email when available
