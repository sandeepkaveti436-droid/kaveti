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
import HeroHeader from "./HeroHeader";
import HeroTitle from "./HeroTitle";
import BottomBar from "../navigation/BottomBar";
import MenuDrawer from "../navigation/MenuDrawer";

// Initialize Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const N = PROJECTS.length;

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Virtual index starts at middle set (N = 6)
  const virtualIndexRef = useRef(N);
  const isAnimatingRef = useRef(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const zoomWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  // Responsive card measurement
  useEffect(() => {
    const handleResize = () => {
      if (viewportRef.current) {
        const w = viewportRef.current.offsetWidth;
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

  // Infinite GSAP 3-Phase Animation
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
        // Silent reset: keeps virtualIndex in middle set without visual disruption
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

    // 1. Fade out current text
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

    // 2. Slow deep Zoom-Out (scale 1.0 -> 0.48)
    tl.to(
      zoomWrapperRef.current,
      {
        scale: 0.48,
        duration: 1.2,
        ease: "power3.inOut",
      },
      0,
    );

    // 3. Filmstrip glide
    tl.to(
      trackRef.current,
      {
        x: targetX,
        duration: 1.5,
        ease: "power3.inOut",
      },
      0.85,
    );

    // Synchronize content mid-flight
    tl.call(
      () => {
        setCurrentIndex(nextProjectIndex);
      },
      undefined,
      1.9,
    );

    // 4. Zoom-In to fullscreen
    tl.to(
      zoomWrapperRef.current,
      {
        scale: 1.0,
        duration: 1.2,
        ease: "power3.out",
      },
      2.1,
    );

    // 5. Incoming text reveal
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

  const handlePrev = useCallback(() => {
    goToSlide("prev");
  }, [goToSlide]);

  // Unbreakable infinite autoplay loop
  useEffect(() => {
    if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);

    if (!isAnimating && !menuOpen) {
      autoPlayTimer.current = setTimeout(() => {
        handleNext();
      }, REST_DURATION);
    }

    return () => {
      if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
    };
  }, [currentIndex, isAnimating, menuOpen, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (menuOpen) {
        if (e.key === "Escape") setMenuOpen(false);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        handleNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, menuOpen]);

  const activeProject = PROJECTS[currentIndex];

  return (
    <main
      className={`${inter.className} relative w-full h-screen bg-white p-3 sm:p-5 md:p-3 flex items-center justify-center box-border overflow-hidden select-none`}
    >
      {/* Centered Hero Viewport */}
      <div
        ref={viewportRef}
        className="relative w-full h-full max-w-[1920px] rounded-[24px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden shadow-2xl bg-white"
      >
        {/* Zoom Wrapper */}
        <div
          ref={zoomWrapperRef}
          className="relative w-full h-full will-change-transform"
          style={{ transformOrigin: "50% 50%" }}
        >
          {/* Filmstrip Track */}
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
                className="relative h-full flex-shrink-0 overflow-hidden rounded-[24px] sm:rounded-[20px] md:rounded-[24px] bg-black shadow-2xl"
                style={{
                  width: cardWidth > 0 ? `${cardWidth}px` : "100vw",
                }}
              >
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${proj.image})` }}
                >
                  <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Header */}
        <HeroHeader headerRef={headerRef} />

        {/* Editorial Project Title */}
        <HeroTitle
          titleRef={titleRef}
          line1={activeProject.line1}
          line2={activeProject.line2}
        />

        {/* Floating Bottom Navigation Bar */}
        <BottomBar
          currentIndex={currentIndex}
          totalProjects={N}
          activeIcon={activeProject.icon}
          isAnimating={isAnimating}
          onNext={handleNext}
          onOpenMenu={() => setMenuOpen(true)}
          counterRef={counterRef}
        />
      </div>

      {/* Interactive Menu Drawer */}
      <MenuDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </main>
  );
}
