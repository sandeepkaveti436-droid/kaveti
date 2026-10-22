import React from "react";
import { Inter } from "next/font/google";

// Initialize Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

interface HeroHeaderProps {
  headerRef: React.RefObject<HTMLElement | null>;
  author?: string;
  tagline?: string;
}

export default function HeroHeader({
  headerRef,
  author = "Sandeep kaveti",
  tagline = "Branding, Motion and Web for the AI era.",
}: HeroHeaderProps) {
  return (
    // Inside src/components/hero/HeroHeader.tsx
    <header
      ref={headerRef}
      className={`${inter.className} absolute top-0 inset-x-0 z-40 flex items-center justify-between pl-14 pr-4 sm:px-10 py-5 pointer-events-none will-change-transform`}
    >
      <span className="text-[15px] sm:text-[18px] font-normal tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
        {author}
      </span>
      <span className="hidden xs:inline-block text-[12px] sm:text-[14px] font-normal tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
        {tagline}
      </span>
    </header>
  );
}
