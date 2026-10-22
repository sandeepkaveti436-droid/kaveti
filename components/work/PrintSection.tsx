"use client";

import React, { useState } from "react";
import { LiquidButton } from "@/components/animate-ui/buttons/liquid";

export interface PrintProject {
  id: number;
  title: string;
  format: string;
  category: string;
  image: string;
  year: string;
  description: string;
}

export const PRINT_PROJECTS: PrintProject[] = [
  {
    id: 1,
    title: "Kinetic Geometry",
    format: "Exhibition Poster",
    category: "Swiss Typography & Screenprint Series",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2600&auto=format&fit=crop",
    description:
      "A limited-edition screenprinted exhibition poster exploring kinetic balance, mathematical grid alignments, and high-contrast modernist typography.",
  },
  {
    id: 2,
    title: "AuraFlow Sanctuary",
    format: "Brand Book & Brochure",
    category: "Tactile Editorial & Embossed Hardcover",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=2600&auto=format&fit=crop",
    description:
      "A bespoke tri-fold editorial catalog printed on textured recycled cotton paper with matte blind debossing for wellness attendees.",
  },
  {
    id: 3,
    title: "Techno-Organic Live",
    format: "Festival Flyer",
    category: "Silver Holographic Foil & Event Collateral",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2600&auto=format&fit=crop",
    description:
      "Electronic music festival print series featuring ultraviolet ink reactions and hot-stamped silver chrome foil detailing.",
  },
  {
    id: 4,
    title: "Swiss Grid Pavilion",
    format: "Architectural Poster",
    category: "Minimalist Poster Design & Risograph",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=2600&auto=format&fit=crop",
    description:
      "An architectural monograph print created using dual-tone Risograph drums with micro-perforated folding lines.",
  },
  {
    id: 5,
    title: "SkyNova Studio Profile",
    format: "Tri-Fold Brochure",
    category: "Corporate Collateral & Matte Foil Print",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2600&auto=format&fit=crop",
    description:
      "Comprehensive capabilities brochure featuring dark-mode matte laminated covers and spot UV accentuation on key metrics.",
  },
  {
    id: 6,
    title: "Monochrome Horizon",
    format: "Editorial Flyer",
    category: "High-Contrast Typography & Grain Texture",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2600&auto=format&fit=crop",
    description:
      "Art gallery promotional handout pairing heavyweight 350gsm stock with brutalist typographic hierarchy and grain textures.",
  },
];

export default function PrintSection() {
  const [selectedPrint, setSelectedPrint] = useState<PrintProject | null>(null);

  return (
    <>
      {/* Section Divider */}
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-4 lg:px-5">
        <div className="w-full border-t border-neutral-200/80" />
      </div>

      {/* Heading */}
      <section className="text-center max-w-4xl mx-auto px-4 pt-16 sm:pt-12 pb-8 sm:pb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 block mb-3 font-medium">
          Print Media & Visual Identity
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-neutral-900 tracking-tight">
          POSTERS | BROCHURES | FLYERS
        </h2>
        <p className="text-sm sm:text-base text-neutral-500 mt-4 font-light max-w-xl mx-auto leading-relaxed">
          Tactile print design, Swiss-grid typography, bespoke exhibition
          posters, and brand marketing collateral crafted with physical
          fidelity.
        </p>
      </section>

      {/* Cards Grid (Portrait 4:5 Aspect Ratio) */}
      <section className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-5 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4">
          {PRINT_PROJECTS.map((print, idx) => (
            <div
              key={print.id}
              className="group relative bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/80 hover:border-neutral-300 rounded-[20px] p-2.5 sm:p-3 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md cursor-pointer"
              onClick={() => setSelectedPrint(print)}
            >
              {/* Card Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[14px] mb-3.5 bg-neutral-100">
                <img
                  src={print.image}
                  alt={`${print.title} ${print.format}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />

                {/* Index Badge */}
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-[6px] bg-white/90 backdrop-blur-md text-[11px] font-medium text-neutral-800 border border-neutral-200/60 shadow-xs">
                  P{idx + 1}
                </span>

                {/* Format Pill */}
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-[6px] bg-black/60 backdrop-blur-md text-[11px] font-medium text-white shadow-xs">
                  {print.format}
                </span>
              </div>

              {/* Details & Button */}
              <div className="flex items-center justify-between gap-3 px-1 pb-1">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <h3 className="text-base sm:text-lg font-medium text-neutral-900 tracking-tight group-hover:translate-x-0.5 transition-transform leading-snug truncate">
                    {print.title}
                  </h3>
                  <span className="text-xs text-neutral-500 tracking-normal font-light truncate">
                    {print.category}
                  </span>
                </div>

                <div
                  className="shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPrint(print);
                  }}
                >
                  <LiquidButton className="px-3.5 py-1.5 rounded-[10px] bg-white text-neutral-900 text-xs font-medium tracking-tight border border-neutral-300/80 shadow-xs hover:bg-neutral-50 transition-all flex items-center gap-1.5">
                    <span>View Design</span>
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </LiquidButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== CENTERED MODAL PREVIEW (DESKTOP & MOBILE) ===================== */}
      {selectedPrint && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fadeIn"
          onClick={() => setSelectedPrint(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[24px] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPrint(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md"
              aria-label="Close Preview"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal Image View */}
            <div className="relative w-full md:w-3/5 bg-neutral-100 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              <img
                src={selectedPrint.image}
                alt={selectedPrint.title}
                className="max-h-[50vh] md:max-h-[75vh] w-auto max-w-full object-contain rounded-[14px] shadow-lg"
              />
            </div>

            {/* Modal Information View */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-neutral-200">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-medium border border-neutral-200">
                    {selectedPrint.format}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">
                    {selectedPrint.year}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight leading-snug">
                  {selectedPrint.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-neutral-400 mt-1 font-medium">
                  {selectedPrint.category}
                </p>

                <p className="text-sm text-neutral-600 font-light mt-6 leading-relaxed">
                  {selectedPrint.description}
                </p>
              </div>

              {/* Action Button inside modal */}
              <div className="pt-6 border-t border-neutral-200/80 mt-6 flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-medium">
                  Print Specification / CMYK
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
