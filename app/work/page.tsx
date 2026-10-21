"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import Footer from "@/components/navigation/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export interface Project {
  id: number;
  line1: string;
  line2: string;
  category: string;
  image: string;
  year: string;
  liveUrl: string;
}

export const PROJECTS: Project[] = [
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
      className={`${inter.className} min-h-screen bg-white text-black p-3 sm:p-4 md:p-6 select-none relative pb-36`}
    >
      {/* Heading */}
      <section className="text-center max-w-3xl mx-auto my-6 sm:my-6">
        <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 block mb-3 font-medium">
          Archive & Selected Projects
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-neutral-900">
          Selected Works
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-4 font-light max-w-md mx-auto leading-relaxed">
          A curated selection of branding, 3D motion systems, and digital
          platforms.
        </p>
      </section>

      {/* Cards (Clickable) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-8xl mx-auto w-full pb-10">
        {PROJECTS.map((p, idx) => (
          <Link
            key={p.id}
            href={`/work/${p.id}`}
            className="group relative bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/80 hover:border-neutral-300 rounded-[18px] p-2 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md cursor-pointer"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-[14px] mb-4 bg-neutral-100">
              <img
                src={p.image}
                alt={`${p.line1} ${p.line2}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />

              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[6px] bg-white/90 backdrop-blur-md text-[11px] font-medium text-neutral-800 border border-neutral-200/60 shadow-sm">
                0{idx + 1}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-medium text-neutral-900 tracking-tight group-hover:translate-x-0.5 transition-transform">
                  {p.line1} {p.line2}
                </h2>
                <span className="text-[11px] font-medium text-neutral-400">
                  {p.year}
                </span>
              </div>
              <span className="text-xs text-neutral-500 tracking-normal font-light">
                {p.category}
              </span>
            </div>
          </Link>
        ))}
      </section>
      {/* ===================== FOOTER ===================== */}
      <Footer />
    </main>
  );
}
