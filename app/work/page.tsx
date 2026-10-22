"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import Footer from "@/components/navigation/Footer";
import PrintSection from "@/components/work/PrintSection";
import LogoSection from "@/components/work/LogoSection";
import BottomBar from "@/components/navigation/BottomBar";
import MenuDrawer from "@/components/navigation/MenuDrawer";
import { LiquidButton } from "@/components/animate-ui/buttons/liquid";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const PROJECTS = [
  {
    id: 1,
    line1: "SkyNova",
    line2: "Digitals",
    category: "Digital Transformation & Product Studio",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2600&auto=format&fit=crop",
    liveUrl: "https://skynovadigitals.vercel.app/",
  },
  {
    id: 2,
    line1: "Digify",
    line2: "Agency",
    category: "Brand Strategy, Web & UI/UX",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2600&auto=format&fit=crop",
    liveUrl: "https://digify-agency.vercel.app/",
  },
  {
    id: 3,
    line1: "Orvixa",
    line2: "AI Platform",
    category: "AI Powered Work Management Platform",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2600&auto=format&fit=crop",
    liveUrl: "https://orvixas.vercel.app/",
  },
  {
    id: 4,
    line1: "HR Admin",
    line2: "Intelligence",
    category: "Staff & Workforce Enterprise Management",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2600&auto=format&fit=crop",
    liveUrl: "https://hradmin-staffmanagement.vercel.app/",
  },
  {
    id: 5,
    line1: "Sandeep Kaveti",
    line2: "Personal Brand",
    category: "Creative Direction & Portfolio Experience",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2600&auto=format&fit=crop",
    liveUrl: "https://kavetisandeep.vercel.app/",
  },
  {
    id: 6,
    line1: "AuraFlow",
    line2: "Yoga & Wellness",
    category: "Mindfulness & Holistic Yoga Studio",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2600&auto=format&fit=crop",
    liveUrl: "https://auraflow-yoga.vercel.app/",
  },
];

export default function WorkPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main
      className={`${inter.className} min-h-screen bg-white text-[#1d1d1d] selection:bg-neutral-900 selection:text-white flex flex-col justify-between select-none relative pb-32`}
    >
      {/* ===================== HIDE SCROLLBAR ENTIRELY ===================== */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        html,
        body {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>

      <div>
        {/* Header */}
        <header className="w-full border-b border-neutral-200/80 sticky top-0 bg-white/95 backdrop-blur-md z-30">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-[13.5px] font-medium tracking-tight text-[#1d1d1d] hover:opacity-70 transition-opacity"
            >
              Sandeep Kaveti
            </Link>

            <Link
              href="/"
              className="group flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-500 hover:text-black font-medium transition-colors"
            >
              <span>Close</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="group-hover:rotate-90 transition-transform duration-200"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </Link>
          </div>
        </header>

        {/* Section 1: Web / Apps / SaaS */}
        <section className="text-center max-w-4xl mx-auto px-4 pt-12 sm:pt-16 pb-8 sm:pb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 block mb-3 font-medium">
            Archive & Selected Projects
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-[#1d1d1d]">
            WEBSITES | MOBILE APPS | SAAS PLATFORMS
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mt-4 font-light max-w-xl mx-auto leading-relaxed">
            High-performance web experiences, intuitive mobile applications, and
            scalable cloud SaaS platforms engineered for modern digital
            products.
          </p>
        </section>

        {/* Cards Grid */}
        <section className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-5 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4">
            {PROJECTS.map((p, idx) => (
              <div
                key={p.id}
                className="group relative bg-[#f8f8f8] hover:bg-neutral-100/90 border border-neutral-200/80 hover:border-neutral-300 rounded-[20px] p-2.5 sm:p-3 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-sm"
              >
                <Link
                  href={`/work/${p.id}`}
                  className="block relative aspect-[16/10] sm:aspect-video w-full overflow-hidden rounded-[14px] mb-3.5 bg-neutral-100 cursor-pointer"
                >
                  <img
                    src={p.image}
                    alt={`${p.line1} ${p.line2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-[50px] bg-white/90 text-[11px] font-medium text-neutral-800 shadow-xs">
                    0{idx + 1}
                  </span>
                </Link>

                <div className="flex items-center justify-between gap-3 px-1 pb-1">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <Link href={`/work/${p.id}`}>
                      <h2 className="text-base sm:text-lg font-medium text-[#1d1d1d] tracking-tight group-hover:translate-x-0.5 transition-transform leading-snug">
                        {p.line1} {p.line2}
                      </h2>
                    </Link>
                    <span className="text-xs text-neutral-500 tracking-normal font-light truncate">
                      {p.category}
                    </span>
                  </div>

                  <Link href={`/work/${p.id}`} className="shrink-0">
                    <LiquidButton className="px-3.5 py-1.5 rounded-[50px] bg-white text-[#1d1d1d] text-xs font-medium tracking-tight border border-neutral-300/80 shadow-xs hover:bg-neutral-50 transition-all flex items-center gap-1.5">
                      <span>Case Study / Live Site</span>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </LiquidButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: 3D Logo Cylinder */}
        <LogoSection />

        {/* Section 3: Print & Editorial */}
        <PrintSection />
      </div>

      {/* Footer */}
      <Footer />

      {/* ===================== EXACT MUBIEN BOTTOM DOCK ===================== */}
      <BottomBar
        fixed={true}
        label="Back to Home"
        labelHref="/"
        onOpenMenu={() => setMenuOpen(true)}
      />

      {/* ===================== EXACT MUBIEN MORPHING MENU DRAWER ===================== */}
      <MenuDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </main>
  );
}
