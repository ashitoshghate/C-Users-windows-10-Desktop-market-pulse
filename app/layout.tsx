import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { COMPANY, SITE_URL } from "@/lib/constants";

const heading = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const title = "Market Pulse | Digital Marketing & Brand Building Company";
const description =
  "Market Pulse provides digital marketing, branding, SEO, social media marketing, paid advertising, content marketing and lead generation services in Ahilyanagar and across India.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Market Pulse",
  },
  description,
  keywords: [
    "digital marketing agency Ahilyanagar",
    "digital marketing company Ahilyanagar",
    "SEO services Ahilyanagar",
    "social media marketing",
    "brand building",
    "digital advertising",
    "lead generation",
    "digital marketing agency Maharashtra",
    "digital marketing services India",
  ],
  authors: [{ name: COMPANY.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: COMPANY.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: COMPANY.name,
    description,
    image: `${SITE_URL}/opengraph-image`,
    telephone: `+${COMPANY.phoneIntl}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.addressLine1,
      addressLocality: "Ahilyanagar",
      postalCode: "414001",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    url: SITE_URL,
    priceRange: "$$",
    areaServed: "IN",
  };

  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
