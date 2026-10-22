"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface LogoItem {
  id: number;
  name: string;
  category: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
}

const LOGOS: LogoItem[] = [
  {
    id: 1,
    name: "SkyNova",
    category: "Studio",
    bg: "bg-gradient-to-br from-neutral-900 to-black",
    border: "border-sky-500/30",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-sky-400">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Digify",
    category: "Agency",
    bg: "bg-gradient-to-br from-neutral-900 to-black",
    border: "border-orange-500/30",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <path d="M9 8h4a4 4 0 0 1 0 8H9V8z" />
      </svg>
    ),
  },
  {
    id: 3,
    name: "Orvixa",
    category: "AI Platform",
    bg: "bg-gradient-to-br from-neutral-900 to-black",
    border: "border-emerald-500/30",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-emerald-400">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: 4,
    name: "HR Admin",
    category: "Enterprise",
    bg: "bg-gradient-to-br from-neutral-900 to-black",
    border: "border-indigo-500/30",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-indigo-400">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 5,
    name: "SK Monogram",
    category: "Identity",
    bg: "bg-white text-black",
    border: "border-white",
    icon: (
      <span className="text-2xl font-black tracking-tighter text-black select-none">
        SK
      </span>
    ),
  },
  {
    id: 6,
    name: "AuraFlow",
    category: "Wellness",
    bg: "bg-gradient-to-br from-neutral-900 to-black",
    border: "border-amber-500/30",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-amber-300">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9z" />
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5" />
      </svg>
    ),
  },
  {
    id: 7,
    name: "Beeyond",
    category: "Tech",
    bg: "bg-gradient-to-br from-neutral-900 to-black",
    border: "border-yellow-400/30",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
        <path d="M12 2L2 22h20L12 2zm0 6l5 10H7l5-10z" />
      </svg>
    ),
  },
  {
    id: 8,
    name: "Vertex",
    category: "Systems",
    bg: "bg-gradient-to-br from-neutral-900 to-black",
    border: "border-rose-500/30",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-400">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      </svg>
    ),
  },
];

export default function LogoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);

  const [radius, setRadius] = useState(250);
  const [isHovered, setIsHovered] = useState(false);

  // Responsive radius tailored for compact logo badge sizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(160); // Mobile radius
      } else if (window.innerWidth < 1024) {
        setRadius(210); // Tablet radius
      } else {
        setRadius(260); // Desktop radius
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 60-120 FPS continuous 3D rotation loop
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!isDraggingRef.current) {
        const speed = isHovered ? 0.08 : 0.25;
        rotationRef.current += speed;

        if (Math.abs(velocityRef.current) > 0.01) {
          rotationRef.current += velocityRef.current;
          velocityRef.current *= 0.94;
        }
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  // Pointer drag controls (Mouse & Touch)
  const onPointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
  };

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    rotationRef.current += delta * 0.45;
    velocityRef.current = delta * 0.45;
  }, []);

  const onPointerUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  const totalLogos = LOGOS.length;
  const anglePerLogo = 360 / totalLogos;

  return (
    <section className="w-full max-w-8xl mx-auto px-4 sm:px-4 lg:px-5 py-6">
      {/* Divider */}
      <div className="w-full border-t border-neutral-200/80 mb-12" />

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto px-4 mb-8 sm:mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 block mb-2 font-medium">
          Brand Marks & Identity Glyphs
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Creative Logo Emblems for Modern Digital Products
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-light max-w-md mx-auto leading-relaxed">
          Interactive rotating brand emblems. Drag to spin or hover to pause.
        </p>
      </div>

      {/* ===================== COMPACT PURE BLACK 3D STAGE ===================== */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        /* Decreased height from 820px to 420px with pure black fill */
        className="relative w-full h-[360px] sm:h-[400px] md:h-[430px] bg-black rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-2xl flex flex-col items-center justify-between p-5 select-none cursor-grab active:cursor-grabbing border border-neutral-900"
      >
        {/* Subtle radial spotlight */}
        <div className="absolute inset-0 bg-radial from-neutral-800/25 via-transparent to-transparent pointer-events-none" />

        {/* 3D Perspective Viewport */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            perspective: "1100px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* Rotating 3D Ring with compact logo sizes */}
          <div
            ref={ringRef}
            className="relative w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] md:w-[145px] md:h-[145px]"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {LOGOS.map((logo, i) => {
              const cardAngle = i * anglePerLogo;

              return (
                <div
                  key={logo.id}
                  /* Compact logo square tile sizing */
                  className={`absolute inset-0 rounded-[20px] sm:rounded-[24px] overflow-hidden p-3 flex flex-col items-center justify-between shadow-[0_15px_35px_rgba(0,0,0,0.9)] border ${logo.border} ${logo.bg} transition-transform duration-200`}
                  style={{
                    transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* Top Tiny Category Tag */}
                  <span className="text-[9px] font-mono uppercase tracking-wider opacity-60">
                    {logo.category}
                  </span>

                  {/* Centered Logo Icon */}
                  <div className="my-auto flex items-center justify-center">
                    {logo.icon}
                  </div>

                  {/* Bottom Logo Label */}
                  <span className="text-[11px] font-medium tracking-tight truncate max-w-full">
                    {logo.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================== BOTTOM BRANDING ===================== */}
        <div className="relative z-20 flex items-center justify-between w-full px-2 sm:px-6 pt-2">
          <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase">
            ◄ DRAG TO SPIN ►
          </span>

          <div className="flex items-center gap-1.5 text-white tracking-tighter">
            <span className="text-sm sm:text-base font-black">SANDEEP KAVETI</span>
            <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-white text-black font-bold">
              LOGOS
            </span>
          </div>

          <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase">
            08 MARKS
          </span>
        </div>
      </div>
    </section>
  );
}