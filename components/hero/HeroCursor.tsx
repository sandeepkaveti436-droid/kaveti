'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import MenuDrawer from '../navigation/MenuDrawer';
import HeroCursor from './HeroCarousel';
// ==========================================
// 1. TYPES & DATA
// ==========================================

export type ProjectIconType = 'avatr' | 'youtube' | 'gaudi' | 'watch' | 'tech' | 'ai';

export interface Project {
  id: number;
  line1: string;
  line2: string;
  category: string;
  image: string;
  icon: ProjectIconType;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    line1: 'AVATR - Vision',
    line2: 'Xpectra',
    category: 'Autonomous Luxury Experience',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2600&auto=format&fit=crop',
    icon: 'avatr'
  },
  {
    id: 2,
    line1: 'YouTube',
    line2: 'Shopping',
    category: 'Spatial Design & 3D Motion',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2600&auto=format&fit=crop',
    icon: 'youtube'
  },
  {
    id: 3,
    line1: 'El Capricho de',
    line2: 'Gaudí',
    category: 'Architecture & Visual Identity',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2600&auto=format&fit=crop',
    icon: 'gaudi'
  },
  {
    id: 4,
    line1: 'Fly',
    line2: 'Society',
    category: 'Wearable Platform & Ecosystem',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2600&auto=format&fit=crop',
    icon: 'watch'
  },
  {
    id: 5,
    line1: 'Infinix',
    line2: 'Next Generation',
    category: 'Digital Product Design',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2600&auto=format&fit=crop',
    icon: 'tech'
  },
  {
    id: 6,
    line1: 'Neara',
    line2: 'Platform AI',
    category: 'Digital Twin Simulation',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2600&auto=format&fit=crop',
    icon: 'ai'
  }
];

const EXTENDED_PROJECTS = [...PROJECTS, ...PROJECTS, ...PROJECTS];
const N = PROJECTS.length;
const CARD_GAP = 56;
const REST_DURATION = 5500;

// ==========================================
// 2. HERO CUSTOM CURSOR (ARROW + DESIGNER BADGE)
// ==========================================

interface HeroCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
}

function HeroCursor({ containerRef, disabled = false }: HeroCursorProps) {
  const arrowRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const arrow = arrowRef.current;
    const badge = badgeRef.current;
    if (!container || !arrow || !badge) return;

    let isInside = false;

    // Arrow pointer: tracks directly with the mouse tip
    const arrowX = gsap.quickTo(arrow, 'x', { duration: 0.04, ease: 'none' });
    const arrowY = gsap.quickTo(arrow, 'y', { duration: 0.04, ease: 'none' });

    // Follower badge: smooth trailing spring with physics lag
    const badgeX = gsap.quickTo(badge, 'x', { duration: 0.22, ease: 'power3.out' });
    const badgeY = gsap.quickTo(badge, 'y', { duration: 0.22, ease: 'power3.out' });

    const handlePointerMove = (e: PointerEvent) => {
      if (disabled) {
        if (isInside) {
          isInside = false;
          gsap.to([arrow, badge], { scale: 0, opacity: 0, duration: 0.15, overwrite: 'auto' });
        }
        return;
      }

      const rect = container.getBoundingClientRect();
      const inside = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      if (inside) {
        if (!isInside) {
          isInside = true;
          // Spring pop-in with overshoot matching Animate UI
          gsap.fromTo(
            [arrow, badge],
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.8)', overwrite: 'auto' }
          );
        }

        // Position arrow tip directly at the mouse
        arrowX(e.clientX);
        arrowY(e.clientY);

        // Position badge below and to the right (side="bottom" align="end")
        badgeX(e.clientX + 16);
        badgeY(e.clientY + 22);
      } else {
        if (isInside) {
          isInside = false;
          // Clean fade out without overshoot when leaving
          gsap.to([arrow, badge], {
            scale: 0,
            opacity: 0,
            duration: 0.18,
            ease: 'power2.in',
            overwrite: 'auto'
          });
        }
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [containerRef, disabled]);

  return (
    <>
      {/* Force-strips the browser default cursor from ALL hero elements */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-cursor-zone,
        .hero-cursor-zone * {
          cursor: none !important;
        }
      `}} />

      {/* 1. Exact Animate UI Black Arrow Pointer */}
      <div
        ref={arrowRef}
        className="fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform opacity-0 -translate-x-[2px] -translate-y-[4px]"
        style={{ transform: 'translate3d(-200px, -200px, 0)' }}
      >
        <svg
          className="w-6 h-6 select-none pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
          aria-hidden
        >
          <path
            fill="#000000"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinejoin="round"
            d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
          />
        </svg>
      </div>

      {/* 2. Exact Animate UI "Designer" Follower Badge */}
      <div
        ref={badgeRef}
        className="fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform opacity-0 -translate-x-1/2 -translate-y-1/2"
        style={{ transform: 'translate3d(-200px, -200px, 0)' }}
      >
        <div className="rounded-md bg-black px-2 py-0.5 text-xs font-medium text-white shadow-2xl pointer-events-none select-none tracking-normal border border-white/10 whitespace-nowrap">
          Designer
        </div>
      </div>
    </>
  );
}

// ==========================================
// 3. PROJECT ICON COMPONENT
// ==========================================

function ProjectIcon({ icon }: { icon: ProjectIconType }) {
  switch (icon) {
    case 'youtube':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'watch':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="6" y="4" width="12" height="16" rx="4" />
          <path d="M10 2h4M10 22h4" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'tech':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case 'ai':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="3" r="3" />
          <path d="M12 3v3m0 12v3M3 12h3m12 0h3" />
        </svg>
      );
    case 'avatr':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 22h20L12 2zm0 6l5 10H7l5-10z" />
        </svg>
      );
    case 'gaudi':
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="2.2" />
          <circle cx="12" cy="4.5" r="1.8" />
          <circle cx="12" cy="19.5" r="1.8" />
          <circle cx="4.5" cy="12" r="1.8" />
          <circle cx="19.5" cy="12" r="1.8" />
          <circle cx="6.7" cy="6.7" r="1.8" />
          <circle cx="17.3" cy="17.3" r="1.8" />
          <circle cx="6.7" cy="17.3" r="1.8" />
          <circle cx="17.3" cy="6.7" r="1.8" />
        </svg>
      );
  }
}

// ==========================================
// 4. BOTTOM FLOATING BAR
// ==========================================

function BottomBar({
  currentIndex,
  totalProjects,
  activeIcon,
  isAnimating,
  onNext,
  onOpenMenu,
  counterRef
}: {
  currentIndex: number;
  totalProjects: number;
  activeIcon: ProjectIconType;
  isAnimating: boolean;
  onNext: () => void;
  onOpenMenu: () => void;
  counterRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="absolute bottom-6 sm:bottom-8 inset-x-0 z-40 px-6 sm:px-10 flex items-center justify-center pointer-events-none">
      
      {/* Center Frosted Glass Island */}
      <div className="pointer-events-auto flex items-center gap-3 sm:gap-10 p-2 rounded-[18px] bg-white/20 hover:bg-white/25 backdrop-blur-2xl border border-white/30 shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-all duration-300">
        
        {/* Dynamic Project Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          disabled={isAnimating}
          className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] bg-[#121214] text-white hover:scale-105 active:scale-95 transition-transform duration-200 shadow-md disabled:opacity-40"
          aria-label="Next Project"
        >
          <ProjectIcon icon={activeIcon} />
        </button>

        {/* Action Label */}
        <span className="text-[13px] sm:text-[14px] font-medium text-[#111111] px-1 select-none tracking-tight">
          View Case Study / Project
        </span>

        {/* White Dual-Bar Menu Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenMenu();
          }}
          className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] bg-white hover:bg-neutral-100 text-[#121214] hover:scale-105 active:scale-95 transition-transform duration-200 shadow-sm"
          aria-label="Toggle Project Menu"
        >
          <div className="flex flex-col gap-[3.5px] items-center justify-center">
            <span className="w-[14px] h-[1.8px] bg-[#121214] rounded-full" />
            <span className="w-[14px] h-[1.8px] bg-[#121214] rounded-full" />
          </div>
        </button>
      </div>

      {/* Right Corner Counter Capsule (01 / 06) */}
      <div 
        ref={counterRef}
        className="absolute right-6 sm:right-10 pointer-events-auto flex items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[10px] bg-black/35 backdrop-blur-md border border-white/10 text-white text-[12px] sm:text-[14px] font-mono tracking-wider shadow-lg will-change-transform"
      >
        0{currentIndex + 1} / 0{totalProjects}
      </div>

    </div>
  );
}

// ==========================================
// 5. MAIN HERO SLIDER (DEFAULT EXPORT)
// ==========================================

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Virtual index starts at N (middle set)
  const virtualIndexRef = useRef(N);
  const isAnimatingRef = useRef(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const zoomWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (viewportRef.current) {
        const w = viewportRef.current.offsetWidth;
        setCardWidth(w);
        if (trackRef.current && !isAnimatingRef.current) {
          gsap.set(trackRef.current, { x: -virtualIndexRef.current * (w + CARD_GAP) });
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Infinite GSAP 3-Phase Animation
  const goToSlide = useCallback((direction: 'next' | 'prev') => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);

    const width = viewportRef.current ? viewportRef.current.offsetWidth : window.innerWidth;
    const currentVirtual = virtualIndexRef.current;
    const targetVirtual = direction === 'next' ? currentVirtual + 1 : currentVirtual - 1;
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
      }
    });

    // Phase 1: Text fades out
    tl.to([titleRef.current, headerRef.current, counterRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.45,
      ease: 'power2.in'
    }, 0);

    // Phase 2: Slow Deep Zoom-Out into white background (scale 1.0 -> 0.48)
    tl.to(zoomWrapperRef.current, {
      scale: 0.48,
      duration: 1.2,
      ease: 'power3.inOut'
    }, 0);

    // Phase 3: Filmstrip horizontal glide (always forward from 6 to 1)
    tl.to(trackRef.current, {
      x: targetX,
      duration: 1.5,
      ease: 'power3.inOut'
    }, 0.85);

    // Sync typography mid-flight
    tl.call(() => {
      setCurrentIndex(nextProjectIndex);
    }, undefined, 1.9);

    // Phase 4: Soft-landing Zoom-In to Fullscreen
    tl.to(zoomWrapperRef.current, {
      scale: 1.0,
      duration: 1.2,
      ease: 'power3.out'
    }, 2.1);

    // Phase 5: Typography reveals with upward drift
    tl.fromTo(
      [titleRef.current, headerRef.current, counterRef.current],
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out'
      },
      2.7
    );
  }, []);

  const handleNext = useCallback(() => {
    goToSlide('next');
  }, [goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide('prev');
  }, [goToSlide]);

  // Infinite Autoplay Loop
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
        if (e.key === 'Escape') setMenuOpen(false);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        handleNext();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, menuOpen]);

  const activeProject = PROJECTS[currentIndex];

  return (
    <main className="relative w-full h-screen bg-white p-3 sm:p-5 md:p-3 flex items-center justify-center box-border overflow-hidden select-none">
      
      {/* ===================== EXACT MATCH CUSTOM CURSOR ===================== */}
      <HeroCursor containerRef={viewportRef} disabled={menuOpen} />

      {/* Centered Hero Viewport */}
      <div 
        ref={viewportRef}
        className="hero-cursor-zone relative w-full h-full max-w-[1920px] rounded-[24px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden shadow-2xl bg-white"
      >

        {/* Zoom Wrapper */}
        <div 
          ref={zoomWrapperRef}
          className="relative w-full h-full will-change-transform"
          style={{ transformOrigin: '50% 50%' }}
        >
          {/* Extended Filmstrip Track */}
          <div 
            ref={trackRef}
            className="absolute top-0 left-0 h-full flex will-change-transform"
            style={{ 
              gap: `${CARD_GAP}px`,
              cursor: isAnimating ? 'default' : 'pointer'
            }}
            onClick={handleNext}
          >
            {EXTENDED_PROJECTS.map((proj, idx) => (
              <div
                key={`${proj.id}-${idx}`}
                className="relative h-full flex-shrink-0 overflow-hidden rounded-[24px] sm:rounded-[20px] md:rounded-[24px] bg-black shadow-2xl"
                style={{ 
                  width: cardWidth > 0 ? `${cardWidth}px` : '100vw' 
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
        <header 
          ref={headerRef}
          className="absolute top-0 inset-x-0 z-40 flex items-center justify-between px-6 sm:px-10 py-6 pointer-events-none will-change-transform"
        >
          <span className="text-[18px] sm:text-[24px] font-regular tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
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
        />

      </div>

      {/* Menu Drawer Modal */}
      <MenuDrawer 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
      />

    </main>
  );
}