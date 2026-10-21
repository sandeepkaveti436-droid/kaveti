"use client";

import React from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { LiquidButton } from "@/components/animate-ui/buttons/liquid";

// Initialize Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Footer() {
  return (
    /* Outer wrapper providing side & bottom spacing */
    <div className="w-full px-4 sm:px-6 md:px-10 pb-8 mt-20">
      {/* Centered Footer Card with Inter font applied */}
      <footer
        className={`${inter.className} max-w-8xl mx-auto bg-[#f0f0f0] text-neutral-900 rounded-[18px] px-6 sm:px-12 md:px-16 pt-10 pb-8 select-none shadow-sm`}
      >
        {/* ===================== TOP ROW: LOGO, NAVLINKS, GET IN TOUCH ===================== */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 sm:pb-16 ">
          {/* Left Side: Logo + Navlinks Together */}
          <div className="flex flex-wrap items-center gap-8 sm:gap-12">
            {/* Logo */}
            <Link
              href="/"
              className="w-12 h-12 rounded-[14px] flex items-center justify-center overflow-hidden p-1.5 transition-all "
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement!.innerText = "SK";
                }}
              />
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center gap-7 sm:gap-9 text-[13px] sm:text-[14px] font-medium tracking-tight text-neutral-600">
              <Link href="/work" className="hover:text-black transition-colors">
                Work
              </Link>
              <Link
                href="/about"
                className="hover:text-black transition-colors"
              >
                About
              </Link>
              <Link
                href="/updates"
                className="hover:text-black transition-colors"
              >
                Updates
              </Link>
              <Link
                href="/archive"
                className="hover:text-black transition-colors"
              >
                Archive
              </Link>
            </nav>
          </div>

          {/* Right Side: Liquid "Get in Touch" Button */}
          <Link href="/contact" className="shrink-0">
            <LiquidButton className="px-5 py-2.5 rounded-[12px] bg-white text-neutral-900 text-[13px] font-medium tracking-tight border border-neutral-300/70 shadow-sm hover:bg-neutral-50 hover:shadow transition-all">
              Get in Touch
            </LiquidButton>
          </Link>
        </div>

        {/* ===================== MIDDLE ROW: ADDRESSES & CONTACT ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 py-12 sm:py-16">
          {/* Contact Column */}
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3.5 block">
              Contact
            </span>
            <p className="text-[13px] sm:text-[14px] text-neutral-800 font-normal leading-relaxed">
              <a
                href="mailto:sandeepkaveti436@gmail.com"
                className="hover:text-black hover:underline underline-offset-4 decoration-neutral-300 transition-all"
              >
                sandeepkaveti436@gmail.com
              </a>
            </p>
            <p className="text-[13px] sm:text-[14px] text-neutral-800 font-normal mt-1 leading-relaxed">
              <a
                href="https://sandeep.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black hover:underline underline-offset-4 decoration-neutral-300 transition-all"
              >
                sandeep.vercel.app
              </a>
            </p>
          </div>

          {/* India Column */}
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3.5 block">
              India
            </span>
            <p className="text-[13px] sm:text-[14px] text-neutral-700 font-normal leading-relaxed">
              Beeramguda, Hyderabad, Telangana, India
            </p>
            <p className="text-[12px] text-neutral-500 tracking-wider mt-0.5">
              502032
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-neutral-500 hover:text-black underline underline-offset-4 decoration-neutral-300 hover:decoration-black transition-all mt-3"
            >
              <span>View in maps</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>

        {/* ===================== BOTTOM ROW: COPYRIGHT, LEGAL, SOCIALS ===================== */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-6 border-t border-neutral-300/50">
          {/* Copyright */}
          <div className="text-[11px] uppercase tracking-wider text-neutral-500">
            2026 © Sandeep Kaveti
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-8 text-[11px] uppercase tracking-wider text-neutral-500">
            <Link
              href="/privacy"
              className="hover:text-black transition-colors"
            >
              Legal & Privacy
            </Link>
            <Link
              href="/cookies"
              className="hover:text-black transition-colors"
            >
              Cookie Policy
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-[10px] bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center text-neutral-800 hover:text-black hover:scale-105 transition-all"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-[10px] bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center text-neutral-800 hover:text-black hover:scale-105 transition-all font-semibold text-[13px]"
            >
              in
            </a>

            {/* Behance */}
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Behance"
              className="w-9 h-9 rounded-[10px] bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center text-neutral-800 hover:text-black hover:scale-105 transition-all font-semibold text-[13px]"
            >
              Bē
            </a>

            {/* Website / Awards */}
            <a
              href="https://awwwards.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Awwwards"
              className="w-9 h-9 rounded-[10px] bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center text-neutral-800 hover:text-black hover:scale-105 transition-all font-semibold text-[13px]"
            >
              w.
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-9 h-9 rounded-[10px] bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center text-neutral-800 hover:text-black hover:scale-105 transition-all"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.11V9.4a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.58a8.28 8.28 0 0 0 4.84 1.56V6.69z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
