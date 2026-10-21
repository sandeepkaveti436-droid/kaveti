"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage?: "home" | "work";
}

export default function MenuDrawer({
  isOpen,
  onClose,
  currentPage = "home",
}: MenuDrawerProps) {
  const router = useRouter();
  const [spainTime, setSpainTime] = useState("12:47");
  const [isRendered, setIsRendered] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Live Madrid / Spain Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-GB", {
        timeZone: "Europe/Madrid",
        hour: "2-digit",
        minute: "2-digit",
      });
      setSpainTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mount/Unmount lifecycle
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    }
  }, [isOpen]);

  // Play video on drawer open
  useEffect(() => {
    if (isRendered && isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [isRendered, isOpen]);

  // Entrance animation
  useEffect(() => {
    if (isRendered && isOpen) {
      const tl = gsap.timeline();

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" },
        0,
      );

      tl.fromTo(
        sheetRef.current,
        {
          scaleY: 0.1,
          scaleX: 0.65,
          y: 30,
          opacity: 0.2,
          transformOrigin: "bottom center",
        },
        {
          scaleY: 1,
          scaleX: 1,
          y: 0,
          opacity: 1,
          duration: 0.58,
          ease: "power4.out",
        },
        0,
      );

      if (cardsContainerRef.current) {
        const cards = Array.from(cardsContainerRef.current.children);
        tl.fromTo(
          cards,
          { opacity: 0, y: 24, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.045,
            ease: "power3.out",
          },
          0.18,
        );
      }
    }
  }, [isRendered, isOpen]);

  // Exit Animation + Navigation
  const handleAnimatedClose = (callback?: () => void) => {
    if (!sheetRef.current || !overlayRef.current) {
      onClose();
      if (callback) callback();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsRendered(false);
        onClose();
        if (callback) callback();
      },
    });

    if (cardsContainerRef.current) {
      tl.to(
        cardsContainerRef.current.children,
        {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease: "power2.in",
        },
        0,
      );
    }

    tl.to(
      sheetRef.current,
      {
        scaleY: 0.08,
        scaleX: 0.65,
        y: 25,
        opacity: 0,
        transformOrigin: "bottom center",
        duration: 0.4,
        ease: "power4.in",
      },
      0.08,
    );

    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.35, ease: "power2.in" },
      0.1,
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleAnimatedClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={() => handleAnimatedClose()}
    >
      <div
        ref={sheetRef}
        style={{ transformOrigin: "bottom center" }}
        className="absolute bottom-6 sm:bottom-10 w-[340px] max-w-[calc(100vw-32px)] h-[640px] max-h-[calc(100dvh-48px)] bg-[#f0f0f2] rounded-[18px] p-4 sm:p-5 shadow-2xl flex flex-col justify-between select-none will-change-transform overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={cardsContainerRef}
          className="flex flex-col justify-between h-full w-full"
        >
          {/* Top Grab Handle */}
          <div className="w-16 h-1.5 bg-neutral-300 rounded-[18px] mx-auto -mt-0.5 mb-1 will-change-transform" />

          {/* 1. Top Row: Work / Home & Studio (Height: 120px) */}
          <div className="grid grid-cols-2 gap-3 will-change-transform">
            {/* Dynamic Card */}
            <div
              onClick={() => {
                handleAnimatedClose(() => {
                  router.push(currentPage === "work" ? "/" : "/work");
                });
              }}
              className="bg-white rounded-[18px] p-4 h-[120px] flex flex-col justify-end shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <span className="text-[16px] font-medium text-neutral-900 leading-tight group-hover:translate-x-0.5 transition-transform">
                {currentPage === "work" ? "Home" : "Work"}
              </span>
              <span className="text-[12px] text-neutral-400 mt-0.5">
                {currentPage === "work" ? "Back to home" : "Selected projects"}
              </span>
            </div>

            {/* Studio Card */}
            <div
              onClick={() => handleAnimatedClose()}
              className="bg-white rounded-[18px] p-4 h-[120px] flex flex-col justify-end shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="text-[16px] font-medium text-neutral-900 leading-tight">
                Studio
              </span>
              <span className="text-[12px] text-[#788e9d] mt-0.5">
                About us
              </span>
            </div>
          </div>

          {/* 2. Middle Row: Play Reel with Auto-Loop Video (Height: 160px) */}
          <div className="relative bg-[#0d1117] rounded-[18px] p-4 sm:p-5 h-[160px] flex flex-col justify-between overflow-hidden shadow-sm group cursor-pointer will-change-transform">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-41487-large.mp4"
                type="video/mp4"
              />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none" />
            <div />

            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-medium text-white/95 drop-shadow-sm">
                  Play reel
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="w-11 h-11 rounded-[18px] bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:scale-105 group-hover:bg-white/30 transition-all shadow-md">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="ml-0.5"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
          </div>

          {/* 3. Slide to Contact Us Bar (Height: 54px) */}
          <div className="relative bg-[#dedee0] rounded-[18px] p-1.5 h-[54px] flex items-center shadow-inner cursor-pointer group will-change-transform">
            <div className="w-10 h-10 rounded-[18px] bg-white shadow-sm flex items-center justify-center text-neutral-700 group-hover:translate-x-1.5 transition-transform duration-300">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>

            <span className="text-[13px] font-normal text-neutral-500 mx-auto select-none pointer-events-none pr-8">
              Slide to contact us
            </span>
          </div>

          {/* 4. Bottom Row: Updates & Spain Clock Widget (Height: 120px - exact match to Top Row) */}
          <div className="grid grid-cols-2 gap-3 will-change-transform">
            <div
              onClick={() => handleAnimatedClose()}
              className="bg-white rounded-[18px] p-4 h-[120px] flex flex-col justify-end shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="text-[15px] font-medium text-neutral-900 leading-tight">
                Updates
              </span>
              <span className="text-[12px] text-neutral-400 mt-0.5">
                News & Journal
              </span>
            </div>

            <div className="bg-white rounded-[18px] p-3 h-[120px] flex items-center justify-center relative overflow-hidden shadow-sm">
              <div className="w-22 h-22 rounded-full border border-neutral-100 flex flex-col items-center justify-center relative">
                <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neutral-800" />
                <span className="absolute bottom-2 right-2.5 w-1 h-1 rounded-full bg-neutral-400" />
                <span className="absolute bottom-2.5 left-2.5 w-1 h-1 rounded-full bg-neutral-400" />

                <span className="text-[12px] font-medium text-neutral-700">
                  Spain
                </span>
                <span className="text-[11px] font-mono text-neutral-500 mt-0.5">
                  {spainTime}
                </span>
              </div>
            </div>
          </div>

          {/* 5. Bottom Controls Bar */}
          <div className="flex items-center justify-between pt-0.5 will-change-transform">
            <div
              className="w-10 h-10 rounded-[10px] overflow-hidden shadow-sm flex items-center justify-center bg-[#FF1E00] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              title="Sandeep Kaveti"
            >
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <rect width="100" height="100" rx="20" fill="#FF1E00" />
                <path
                  d="M34 28V23C34 18.0294 38.0294 14 43 14H57C61.9706 14 66 18.0294 66 23V28H34Z"
                  fill="white"
                />
                <path
                  d="M34 72V77C34 81.9706 38.0294 86 43 86H57C61.9706 86 66 81.9706 66 77V72H34Z"
                  fill="white"
                />
                <path
                  d="M66 28H71C75.4183 28 79 31.5817 79 36V51L66 42.5V28Z"
                  fill="white"
                />
                <path
                  d="M34 72H29C24.5817 72 21 68.4183 21 64V49L34 57.5V72Z"
                  fill="white"
                />
                <path d="M21 28H34L79 57.5V72H66L21 42.5V28Z" fill="white" />
              </svg>
            </div>

            <button
              type="button"
              onClick={() => handleAnimatedClose()}
              className="w-10 h-10 rounded-[8px] bg-white shadow-sm border border-neutral-200/50 flex items-center justify-center text-neutral-800 hover:bg-neutral-100 transition-colors"
              aria-label="Close Menu"
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
          </div>
        </div>
      </div>
    </div>
  );
}
