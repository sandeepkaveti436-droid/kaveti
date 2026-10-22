"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { LiquidButton } from "@/components/animate-ui/buttons/liquid";

// Initialize Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Footer() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    /* Outer wrapper providing side & bottom spacing */
    <div className="w-full px-4 sm:px-6 md:px-6 pb-6">
      {/* Centered Footer Card with Inter font applied */}
      <footer
        className={`${inter.className} max-w-8xl mx-auto bg-[#f0f0f0] text-neutral-900 rounded-[18px] px-6 sm:px-12 md:px-16 pt-10 pb-8 select-none shadow-sm`}
      >
        {/* ===================== TOP ROW: LOGO, NAVLINKS, GET IN TOUCH ===================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-12 sm:pb-16 text-center sm:text-left">
          {/* Left Side: Logo + Navlinks Together */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-6 w-full sm:w-auto">
            {/* Logo */}
            <Link
              href="/"
              className="w-12 h-12 rounded-[14px] flex items-center justify-center overflow-hidden p-1.5 transition-all"
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
            <nav className="flex flex-wrap justify-center items-center gap-6 sm:gap-6 text-[14px] font-medium tracking-tight text-neutral-600">
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

          {/* Right Side: Liquid "Get in Touch" Button (Opens Contact Modal) */}
          <div className="w-full sm:w-auto flex justify-center">
            <div
              onClick={() => setContactModalOpen(true)}
              className="shrink-0 cursor-pointer"
            >
              <LiquidButton className="px-5 py-2.5 rounded-[12px] bg-white text-neutral-900 text-[14px] font-medium tracking-tight border border-neutral-300/70 shadow-sm hover:bg-neutral-50 hover:shadow transition-all">
                Get in Touch
              </LiquidButton>
            </div>
          </div>
        </div>

        {/* ===================== MIDDLE ROW: ADDRESSES & CONTACT ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 py-12 sm:py-16 text-center sm:text-left">
          {/* Contact Column */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3.5 block">
              Contact
            </span>
            <p className="text-[14px] text-neutral-800 font-normal leading-relaxed">
              <a
                href="mailto:sandeepkaveti436@gmail.com"
                className="hover:text-black hover:underline underline-offset-4 decoration-neutral-300 transition-all"
              >
                sandeepkaveti436@gmail.com
              </a>
            </p>
            <p className="text-[14px] text-neutral-800 font-normal mt-1 leading-relaxed">
              <a
                href="tel:+919392525043"
                className="hover:text-black hover:underline underline-offset-4 decoration-neutral-300 transition-all font-mono"
              >
                +91 93925 25043
              </a>
            </p>
            <p className="text-[13px] text-neutral-500 font-normal mt-1 leading-relaxed">
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
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3.5 block">
              India
            </span>
            <p className="text-[14px] text-neutral-700 font-normal leading-relaxed">
              Beeramguda, Hyderabad, Telangana, India
            </p>
            <p className="text-[12px] text-neutral-500 tracking-wider mt-0.5">
              502032
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center sm:justify-start gap-1 text-[11px] uppercase tracking-wider text-neutral-500 hover:text-black underline underline-offset-4 decoration-neutral-300 hover:decoration-black transition-all mt-3"
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
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-6 border-t border-neutral-300/50 text-center lg:text-left">
          {/* Copyright */}
          <div className="text-[11px] uppercase tracking-wider text-neutral-500">
            2026 © Sandeep Kaveti
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-[11px] uppercase tracking-wider text-neutral-500">
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
          <div className="flex flex-wrap items-center justify-center gap-2">
            {/* 1. Instagram */}
            <a
              href="https://www.instagram.com/sandeepkaveti436"
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

            {/* 2. LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sandeepsandy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-[10px] bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center text-neutral-800 hover:text-black hover:scale-105 transition-all font-semibold text-[14px]"
            >
              in
            </a>

            {/* 3. Behance */}
            <a
              href="https://www.behance.net/sandeepkaveti"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Behance"
              className="w-9 h-9 rounded-[10px] bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center text-neutral-800 hover:text-black hover:scale-105 transition-all font-semibold text-[14px]"
            >
              Bē
            </a>

            {/* 4. Figma */}
            <a
              href="https://www.figma.com/@sandeepkaveti"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Figma"
              className="w-9 h-9 rounded-[10px] bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center text-neutral-800 hover:text-black hover:scale-105 transition-all"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
                <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
                <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
                <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
                <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
              </svg>
            </a>

            {/* 5. YouTube */}
            <a
              href="https://www.youtube.com/@sandeepkaveti436"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-[10px] bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center text-neutral-800 hover:text-red-600 hover:scale-105 transition-all"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* 6. Threads */}
            <a
              href="https://www.threads.net/@sandeepkaveti436"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
              className="w-9 h-9 rounded-[10px] bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center text-neutral-800 hover:text-black hover:scale-105 transition-all"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* ===================== GET IN TOUCH CONTACT MODAL ===================== */}
      {contactModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setContactModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-[24px] p-6 sm:p-8 shadow-2xl border border-neutral-200 text-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setContactModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal Title */}
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium block mb-1">
                Direct Contact
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900">
                Let&apos;s Connect
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Reach out for design collaborations, full-time opportunities, or
                project inquiries.
              </p>
            </div>

            {/* Contact Actions */}
            <div className="flex flex-col gap-3">
              {/* Email Option */}
              <a
                href="mailto:sandeepkaveti436@gmail.com"
                className="flex items-center justify-between p-3.5 rounded-[16px] bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200/80 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-neutral-900 shadow-xs border border-neutral-200">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-400 block font-medium uppercase tracking-wider">
                      Email
                    </span>
                    <span className="text-sm font-semibold text-neutral-900">
                      sandeepkaveti436@gmail.com
                    </span>
                  </div>
                </div>
                <span className="text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all text-sm font-bold">
                  →
                </span>
              </a>

              {/* Phone / Call Option */}
              <a
                href="tel:+919392525043"
                className="flex items-center justify-between p-3.5 rounded-[16px] bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200/80 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-neutral-900 shadow-xs border border-neutral-200">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-400 block font-medium uppercase tracking-wider">
                      Phone / Mobile
                    </span>
                    <span className="text-sm font-semibold text-neutral-900 font-mono">
                      +91 93925 25043
                    </span>
                  </div>
                </div>
                <span className="text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all text-sm font-bold">
                  →
                </span>
              </a>

              {/* WhatsApp Quick Chat */}
              <a
                href="https://wa.me/919392525043"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-[16px] bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200/80 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-xs border border-neutral-200">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-400 block font-medium uppercase tracking-wider">
                      WhatsApp
                    </span>
                    <span className="text-sm font-semibold text-neutral-900">
                      Chat Directly
                    </span>
                  </div>
                </div>
                <span className="text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all text-sm font-bold">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
