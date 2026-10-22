"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { Inter } from "next/font/google";
import {
  PROJECTS,
  EXTENDED_PROJECTS,
  CARD_GAP,
  REST_DURATION,
} from "@/data/projects";
import HeroCursor from "./HeroCursor";
import BottomBar from "../navigation/BottomBar";
import MenuDrawer from "../navigation/MenuDrawer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const N = PROJECTS.length;

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [allWorksOpen, setAllWorksOpen] = useState(false);

  const virtualIndexRef = useRef(N);
  const isAnimatingRef = useRef(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const zoomWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (viewportRef.current) {
        const w = viewportRef.current.offsetWidth || window.innerWidth;
        setCardWidth(w);
        if (trackRef.current && !isAnimatingRef.current) {
          gsap.set(trackRef.current, {
            x: -virtualIndexRef.current * (w + CARD_GAP),
          });
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const jumpToProject = (targetIdx: number) => {
    if (isAnimatingRef.current || targetIdx === currentIndex) return;
    const width = viewportRef.current
      ? viewportRef.current.offsetWidth
      : window.innerWidth;

    virtualIndexRef.current = N + targetIdx;
    setCurrentIndex(targetIdx);

    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: -virtualIndexRef.current * (width + CARD_GAP),
        duration: 0.8,
        ease: "power3.out",
      });
    }
  };

  const goToSlide = useCallback((direction: "next" | "prev") => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);

    const width = viewportRef.current
      ? viewportRef.current.offsetWidth
      : window.innerWidth;
    const currentVirtual = virtualIndexRef.current;
    const targetVirtual =
      direction === "next" ? currentVirtual + 1 : currentVirtual - 1;
    const targetX = -targetVirtual * (width + CARD_GAP);
    const nextProjectIndex = ((targetVirtual % N) + N) % N;

    const tl = gsap.timeline({
      onComplete: () => {
        let normalized = targetVirtual;
        if (targetVirtual >= N * 2) {
          normalized = targetVirtual - N;
          gsap.set(trackRef.current, { x: -normalized * (width + CARD_GAP) });
        } else if (targetVirtual < N) {
          normalized = targetVirtual + N;
          gsap.set(trackRef.current, { x: -normalized * (width + CARD_GAP) });
        }

        virtualIndexRef.current = normalized;
        setCurrentIndex(nextProjectIndex);
        isAnimatingRef.current = false;
        setIsAnimating(false);
      },
    });

    tl.to(
      [titleRef.current, headerRef.current, counterRef.current],
      {
        opacity: 0,
        y: -20,
        duration: 0.45,
        ease: "power2.in",
      },
      0,
    );

    tl.to(
      zoomWrapperRef.current,
      {
        scale: 0.48,
        duration: 1.2,
        ease: "power3.inOut",
      },
      0,
    );

    tl.to(
      trackRef.current,
      {
        x: targetX,
        duration: 1.5,
        ease: "power3.inOut",
      },
      0.85,
    );

    tl.call(
      () => {
        setCurrentIndex(nextProjectIndex);
      },
      undefined,
      1.9,
    );

    tl.to(
      zoomWrapperRef.current,
      {
        scale: 1.0,
        duration: 1.2,
        ease: "power3.out",
      },
      2.1,
    );

    tl.fromTo(
      [titleRef.current, headerRef.current, counterRef.current],
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
      },
      2.7,
    );
  }, []);

  const handleNext = useCallback(() => {
    goToSlide("next");
  }, [goToSlide]);

  useEffect(() => {
    if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);

    if (!isAnimating && !menuOpen && !allWorksOpen) {
      autoPlayTimer.current = setTimeout(() => {
        handleNext();
      }, REST_DURATION);
    }

    return () => {
      if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
    };
  }, [currentIndex, isAnimating, menuOpen, allWorksOpen, handleNext]);

  const activeProject = PROJECTS[currentIndex];

  return (
    <main
      className={`${inter.className} relative w-full h-screen bg-white p-3 sm:p-5 md:p-3 flex items-center justify-center box-border overflow-hidden select-none`}
    >
      <HeroCursor
        containerRef={viewportRef}
        disabled={menuOpen || allWorksOpen}
      />

      <div
        ref={viewportRef}
        className="hero-cursor-zone relative w-full h-full max-w-[1920px] rounded-[24px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden shadow-2xl bg-white"
      >
        <div
          ref={zoomWrapperRef}
          className="relative w-full h-full will-change-transform"
          style={{ transformOrigin: "50% 50%" }}
        >
          <div
            ref={trackRef}
            className="absolute top-0 left-0 h-full flex will-change-transform"
            style={{
              gap: `${CARD_GAP}px`,
              cursor: isAnimating ? "default" : "pointer",
            }}
            onClick={handleNext}
          >
            {EXTENDED_PROJECTS.map((proj, idx) => (
              <div
                key={`${proj.id}-${idx}`}
                className="relative h-full flex-shrink-0 overflow-hidden rounded-[24px] sm:rounded-[20px] md:rounded-[24px] bg-neutral-900 shadow-2xl"
                style={{
                  width: cardWidth > 0 ? `${cardWidth}px` : "100vw",
                }}
              >
                <img
                  src={proj.image}
                  alt={`${proj.line1} ${proj.line2}`}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/25 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Top Header */}
        <header
          ref={headerRef}
          className="absolute top-0 inset-x-0 z-40 flex items-center justify-between px-6 sm:px-10 py-6 pointer-events-none will-change-transform"
        >
          <span className="text-[15px] sm:text-[17px] font-normal tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Sandeep kaveti
          </span>
          <span className="text-[12px] sm:text-[14px] font-normal tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Branding, Motion and Web for the AI era.
          </span>
        </header>

        {/* Editorial Project Title */}
        <div
          ref={titleRef}
          className="absolute left-6 sm:left-12 md:left-16 top-1/2 -translate-y-12 z-30 pointer-events-none max-w-2xl will-change-transform"
        >
          <h1 className="flex flex-col text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal leading-[1.06] tracking-[-0.035em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
            <span className="block">{activeProject.line1}</span>
            <span className="block">{activeProject.line2}</span>
          </h1>
        </div>

        {/* Floating Bottom Bar Dock */}
        <BottomBar
          currentIndex={currentIndex}
          totalProjects={N}
          activeIcon={activeProject.icon}
          isAnimating={isAnimating}
          onNext={handleNext}
          onOpenMenu={() => setMenuOpen(true)}
          counterRef={counterRef}
          label="View Case Study / Project"
          labelHref={`/work/${activeProject.id}`}
        />
      </div>

      <MenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenWorks={() => setAllWorksOpen(true)}
      />
    </main>
  );
}
