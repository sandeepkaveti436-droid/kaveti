"use client";

import React from "react";
import Link from "next/link";
import { ProjectIconType } from "@/types/carousel";
import ProjectIcon from "./ProjectIcon";

interface BottomBarProps {
  currentIndex?: number;
  totalProjects?: number;
  activeIcon?: ProjectIconType;
  isAnimating?: boolean;
  onNext?: () => void;
  onOpenMenu: () => void;
  counterRef?: React.RefObject<HTMLDivElement | null>;
  label?: string;
  labelHref?: string;
  fixed?: boolean;
}

export default function BottomBar({
  currentIndex = 0,
  totalProjects,
  activeIcon,
  isAnimating = false,
  onNext,
  onOpenMenu,
  counterRef,
  label = "View Case Study / Project",
  labelHref,
  fixed = true,
}: BottomBarProps) {
  // Dynamically links to that particular project's case study (/work/1, /work/2, etc.)
  const targetHref = labelHref || `/work/${currentIndex + 1}`;

  return (
    <div
      className={`${
        fixed ? "fixed" : "absolute"
      } bottom-4 sm:bottom-6 inset-x-0 z-40 px-4 flex items-center justify-center pointer-events-none`}
    >
      {/* ===================== MAIN BOTTOM BAR (NO LOGO SHOWN HERE) ===================== */}
      <div className="pointer-events-auto flex items-center justify-between w-[290px] sm:w-[330px] h-[52px] p-1.5 rounded-[18px] bg-[#e6e6e6]/95 hover:bg-[#e6e6e6] border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] text-[#1d1d1d] transition-all duration-300">
        {/* Left: Project Icon (Next Slide) - No Logo */}
        {onNext && activeIcon ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            disabled={isAnimating}
            className="w-10 h-10 rounded-[12px] bg-[#121214] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 shadow-xs disabled:opacity-40 shrink-0"
            aria-label="Next Project"
          >
            <ProjectIcon icon={activeIcon} />
          </button>
        ) : (
          <Link
            href="/"
            className="w-10 h-10 rounded-[12px] bg-[#121214] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 shadow-xs shrink-0"
            aria-label="Home"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </Link>
        )}

        {/* Center: Dynamic Case Study Link */}
        <Link
          href={targetHref}
          className="flex-1 text-center text-[12.5px] font-medium text-[#1d1d1d] px-2 select-none tracking-tight transition-opacity hover:opacity-70 truncate"
        >
          {label}
        </Link>

        {/* Right: Dual-Bar Menu Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenMenu();
          }}
          className="w-10 h-10 rounded-[12px] bg-white text-[#1d1d1d] hover:scale-105 active:scale-95 transition-transform duration-200 shadow-xs flex items-center justify-center shrink-0 border border-black/5"
          aria-label="Open Menu"
        >
          <div className="flex flex-col gap-[3.5px] items-center justify-center">
            <span className="w-4 h-[1.8px] bg-[#1d1d1d] rounded-full" />
            <span className="w-4 h-[1.8px] bg-[#1d1d1d] rounded-full" />
          </div>
        </button>
      </div>

      {/* Counter (Hero only on desktop) */}
      {totalProjects !== undefined && (
        <div
          ref={counterRef}
          className="hidden sm:flex absolute right-6 sm:right-10 pointer-events-auto items-center justify-center px-4 py-2 rounded-[50px] bg-black/60 backdrop-blur-md border border-white/15 text-white text-[12px] font-mono tracking-wider shadow-lg will-change-transform"
        >
          0{currentIndex + 1} / 0{totalProjects}
        </div>
      )}
    </div>
  );
}
