"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import gsap from "gsap";
import Footer from "@/components/navigation/Footer";
import { LiquidButton } from "@/components/animate-ui/buttons/liquid";
import MenuDrawer from "@/components/navigation/MenuDrawer";
import BottomBar from "@/components/navigation/BottomBar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const SKILLS = [
  "UI/UX Architecture",
  "Design Systems",
  "Creative Direction",
  "Brand Identity",
  "Kinetic Motion Design",
  "Spatial Prototyping",
  "Micro-Interactions",
  "Information Architecture",
  "Digital Strategy",
];

const TECH_STACK = [
  { name: "Next.js 15/16", category: "Framework" },
  { name: "React 19", category: "Core Library" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "GSAP", category: "Kinematics & Motion" },
  { name: "Node.js", category: "Backend Runtime" },
  { name: "Vercel Edge", category: "Cloud Infrastructure" },
  { name: "WebGL / Three.js", category: "3D Graphics" },
];

const TOOLS = [
  { name: "Figma", level: "Master", tag: "Design & Prototyping" },
  { name: "Adobe After Effects", level: "Advanced", tag: "Motion Systems" },
  { name: "Adobe Illustrator", level: "Expert", tag: "Vector & Identity" },
  { name: "Adobe Photoshop", level: "Expert", tag: "Visual Assets" },
  { name: "Blender", level: "Intermediate", tag: "3D Product Renders" },
  { name: "VS Code / Cursor", level: "Daily", tag: "Code Development" },
  { name: "Linear", level: "Daily", tag: "Workflow & Sprints" },
  { name: "Webflow", level: "Advanced", tag: "Rapid Launch" },
];

const HOBBIES = [
  {
    title: "Architectural Photography",
    desc: "Capturing brutalist concrete lines, shadow geometry, and urban scale across cities.",
    tag: "01 / Visual",
  },
  {
    title: "Typeface Hunting",
    desc: "Collecting vintage Swiss typography specimens, rare font foundry monographs, and editorial print.",
    tag: "02 / Editorial",
  },
  {
    title: "Specialty Coffee Brewing",
    desc: "Obsessing over V60 pourover extraction ratios, light-roast origin notes, and pour mechanics.",
    tag: "03 / Craft",
  },
  {
    title: "Analog Sound & Synthesizers",
    desc: "Exploring modular synth patches, ambient soundscapes, and procedural audio feedback.",
    tag: "04 / Audio",
  },
];

const STATS = [
  { number: "05+", label: "Years of Experience" },
  { number: "35+", label: "Digital Products Launched" },
  { number: "100%", label: "Client Satisfaction" },
  { number: "60fps", label: "Animation Standard" },
];

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-text",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.1,
        },
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 1.15, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          delay: 0.25,
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main
      className={`${inter.className} min-h-screen bg-white text-[#1d1d1d] selection:bg-neutral-900 selection:text-white flex flex-col justify-between select-none`}
    >
      <div>
        {/* Top Header */}
        <header className="w-full border-b border-neutral-200/80 sticky top-0 bg-white/95 backdrop-blur-md z-40">
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

        {/* ===================== HERO SECTION (BALANCED SIDE-BY-SIDE) ===================== */}
        <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-24 pb-12 sm:pb-20">
          <div
            ref={heroTextRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end text-center lg:text-left"
          >
            {/* Left Column (7 cols): Large Headline */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal tracking-tight text-[#1d1d1d] leading-[1.04]">
                <span className="block overflow-hidden">
                  <span className="reveal-text block">Designing for the</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="reveal-text block font-medium">
                    intersection of brand,
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="reveal-text block text-neutral-400 font-light italic">
                    motion & code.
                  </span>
                </span>
              </h1>
            </div>

            {/* Right Column (5 cols): Tag, Bio & Availability Badge */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start lg:pl-6 border-neutral-200/80 lg:border-l">
              <span className="reveal-text text-xs uppercase tracking-[0.28em] text-neutral-400 block mb-3 font-medium">
                Profile & Creative Ethos
              </span>

              <p className="reveal-text text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
                I am Sandeep Kaveti — a product designer and creative
                technologist based in India. I partner with founders and
                forward-thinking studios worldwide to turn complex ideas into
                refined, high-conversion digital experiences.
              </p>

              {/* Status Pill Badge */}
              <div className="reveal-text mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4f4f4] border border-neutral-200/80 text-xs text-neutral-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Q1/Q2 Projects • 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== CINEMATIC HERO PORTRAIT & STATS ===================== */}
        <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 overflow-hidden rounded-[24px] sm:rounded-[32px] bg-neutral-100 border border-neutral-200/80 shadow-md group relative aspect-[16/10] sm:aspect-[16/9]">
              <div ref={imageRef} className="w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2600&auto=format&fit=crop"
                  alt="Sandeep Kaveti Workspace"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:left-5 sm:translate-x-0 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] sm:text-xs font-mono tracking-wider border border-white/10 whitespace-nowrap">
                Hyderabad, India • 17.3850° N
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-3 sm:gap-4 h-full">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="p-5 sm:p-6 rounded-[22px] bg-[#f8f8f8] border border-neutral-200/80 flex flex-col items-center lg:items-start text-center lg:text-left justify-between hover:bg-neutral-100/90 transition-colors"
                >
                  <span className="text-3xl sm:text-4xl font-normal text-[#1d1d1d] tracking-tight">
                    {stat.number}
                  </span>
                  <span className="text-xs text-neutral-500 font-light mt-3 sm:mt-4 leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== BIOGRAPHY & MANIFESTO ===================== */}
        <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 border-t border-neutral-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            <div className="lg:col-span-4 text-center lg:text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 block mb-2 font-medium">
                Core Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#1d1d1d] tracking-tight">
                Simplicity through extreme craft.
              </h2>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-5 text-sm sm:text-base text-neutral-600 font-light leading-relaxed text-center lg:text-left">
              <p>
                Great digital products do not happen by accident. They demand a
                delicate balance between rigorous typography, intuitive
                interaction models, and bulletproof frontend engineering.
              </p>
              <p>
                Whether architecting AI-powered SaaS dashboards like{" "}
                <strong className="font-medium text-[#1d1d1d]">Orvixa</strong>,
                high-conversion agency ecosystems like{" "}
                <strong className="font-medium text-[#1d1d1d]">Digify</strong>,
                or digital transformation studios like{" "}
                <strong className="font-medium text-[#1d1d1d]">SkyNova</strong>,
                my obsession is delivering fluid, 60fps experiences that feel
                both inevitable and unforgettable.
              </p>
            </div>
          </div>
        </section>

        {/* ===================== CORE SKILLS ===================== */}
        <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 border-t border-neutral-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            <div className="lg:col-span-4 text-center lg:text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 block mb-2 font-medium">
                Expertise & Competencies
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#1d1d1d] tracking-tight">
                Core Skills & Capabilities
              </h2>
            </div>

            <div className="lg:col-span-8 w-full flex flex-wrap gap-2.5 sm:gap-3 justify-center lg:justify-start">
              {SKILLS.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2.5 rounded-[50px] bg-[#f8f8f8] hover:bg-neutral-900 hover:text-white border border-neutral-200/80 text-xs sm:text-sm font-medium text-neutral-800 transition-all cursor-default shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== TECH STACK ===================== */}
        <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 border-t border-neutral-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            <div className="lg:col-span-4 text-center lg:text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 block mb-2 font-medium">
                Production Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#1d1d1d] tracking-tight">
                Modern Tech Stack
              </h2>
            </div>

            <div className="lg:col-span-8 w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {TECH_STACK.map((tech, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-[20px] bg-[#f8f8f8] border border-neutral-200/80 hover:border-neutral-300 transition-all flex flex-col items-center lg:items-start text-center lg:text-left justify-between"
                >
                  <span className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider block mb-2">
                    {tech.category}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-[#1d1d1d] tracking-tight">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== TOOLS ECOSYSTEM ===================== */}
        <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 border-t border-neutral-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            <div className="lg:col-span-4 text-center lg:text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 block mb-2 font-medium">
                Daily Instruments
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#1d1d1d] tracking-tight">
                Tools & Software Ecosystem
              </h2>
            </div>

            <div className="lg:col-span-8 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {TOOLS.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-[20px] bg-white border border-neutral-200/80 shadow-xs hover:shadow-md transition-all flex flex-col items-center lg:items-start text-center lg:text-left justify-between group"
                >
                  <div className="w-full flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-xl bg-neutral-100 text-neutral-900 font-mono text-xs flex items-center justify-center font-bold">
                      0{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-[10px] font-mono text-neutral-600">
                      {tool.level}
                    </span>
                  </div>

                  <div className="w-full">
                    <h3 className="text-base font-semibold text-[#1d1d1d] tracking-tight group-hover:translate-x-0.5 transition-transform">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-light mt-1">
                      {tool.tag}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== HOBBIES ===================== */}
        <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 border-t border-neutral-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            <div className="lg:col-span-4 text-center lg:text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 block mb-2 font-medium">
                Beyond The Screen
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#1d1d1d] tracking-tight">
                Interests & Creative Influences
              </h2>
            </div>

            <div className="lg:col-span-8 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HOBBIES.map((hobby, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-[22px] bg-[#f8f8f8] border border-neutral-200/80 flex flex-col items-center lg:items-start text-center lg:text-left justify-between hover:bg-neutral-100/90 transition-all"
                >
                  <div className="w-full">
                    <span className="text-xs font-mono text-neutral-400 block mb-2 sm:mb-3">
                      {hobby.tag}
                    </span>
                    <h3 className="text-lg font-medium text-[#1d1d1d] mb-2 tracking-tight">
                      {hobby.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed mt-2 sm:mt-4">
                    {hobby.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CALL TO ACTION ===================== */}
        <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-18 sm:py-20 border-t border-neutral-200/80 text-center">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 block mb-3 font-medium">
              Collaboration
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-[#1d1d1d]">
              Have a project in mind?
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 mt-4 font-light leading-relaxed mb-8">
              Let&apos;s build an exceptional digital product together. Open for
              selective client engagements and creative consulting.
            </p>

            <Link href="/contact">
              <LiquidButton className="px-7 py-3 rounded-[12px] bg-neutral-900 text-black text-sm font-medium tracking-tight shadow-md hover:bg-white transition-all flex items-center gap-2">
                <span>Start a Project</span>
                <span>→</span>
              </LiquidButton>
            </Link>
          </div>
        </section>
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
