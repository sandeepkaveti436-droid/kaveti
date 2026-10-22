import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';


// 1. Optimize Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// 2. Comprehensive SEO & OpenGraph Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://kavetisandeep.vercel.app"),
  title: {
    default: "Sandeep Kaveti — Creative Technologist & Product Designer",
    template: "%s | Sandeep Kaveti",
  },
  description:
    "Portfolio of Sandeep Kaveti. Specializing in UI/UX architecture, design systems, 3D motion kinematics, and scalable Next.js product engineering.",
  keywords: [
    "Sandeep Kaveti",
    "Creative Technologist India",
    "UI/UX Product Designer",
    "Next.js Portfolio",
    "Design Systems Engineer",
    "Awwwards Style Portfolio",
  ],
  authors: [
    { name: "Sandeep Kaveti", url: "https://kavetisandeep.vercel.app" },
  ],
  creator: "Sandeep Kaveti",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kavetisandeep.vercel.app",
    title: "Sandeep Kaveti — Product Designer & Creative Technologist",
    description:
      "Crafting high-performance digital products, 3D motion systems, and scalable UI architectures.",
    siteName: "Sandeep Kaveti Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sandeep Kaveti Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandeep Kaveti — Product Designer & Creative Technologist",
    description: "Designing for the intersection of brand, motion & code.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// 3. JSON-LD Structured Data Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://kavetisandeep.vercel.app/#person",
      name: "Sandeep Kaveti",
      url: "https://kavetisandeep.vercel.app",
      jobTitle: "Product Designer & Creative Technologist",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "502032",
        addressCountry: "IN",
      },
      email: "mailto:sandeepkaveti436@gmail.com",
      telephone: "+919392525043",
      sameAs: [
        "https://www.linkedin.com/in/sandeepsandy",
        "https://www.behance.net/sandeepkaveti",
        "https://www.figma.com/@sandeepkaveti",
        "https://www.instagram.com/sandeepkaveti436",
        "https://www.youtube.com/@sandeepkaveti436",
        "https://www.threads.net/@sandeepkaveti436",
      ],
      knowsAbout: [
        "UI/UX Design",
        "Design Systems",
        "Kinetic Motion Design",
        "Next.js Architecture",
        "Frontend Engineering",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://kavetisandeep.vercel.app/#website",
      url: "https://kavetisandeep.vercel.app",
      name: "Sandeep Kaveti Portfolio",
      publisher: {
        "@id": "https://kavetisandeep.vercel.app/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-white text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white`}
      >
        {/* Injected Schema Markup for Search Engines and AI Overviews */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <SpeedInsights />
        <Analytics />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
