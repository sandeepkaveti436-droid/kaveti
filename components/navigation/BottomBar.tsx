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
  theme?: "light" | "dark";
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
  fixed = false,
  theme = "dark",
}: BottomBarProps) {
  const isLight = theme === "light";

  return (
    <div
      className={`${
        fixed ? "fixed" : "absolute"
      } bottom-6 sm:bottom-8 inset-x-0 z-50 px-6 sm:px-10 flex items-center justify-center pointer-events-none`}
    >
      {/* Center Frosted Glass Island Dock (Exact Center) */}
      <div
        className={`pointer-events-auto flex items-center justify-between w-full max-w-[380px] sm:max-w-[320px] px-2.5 py-2 rounded-[20px] backdrop-blur-2xl transition-all duration-300 ${
          isLight
            ? "bg-white/80 hover:bg-white/90 border border-black/10 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
            : "bg-white/20 hover:bg-white/25 border border-white/30 shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
        }`}
      >
        {onNext && activeIcon ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            disabled={isAnimating}
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] bg-[#121214] text-white hover:scale-105 active:scale-95 transition-transform duration-200 shadow-md disabled:opacity-40 shrink-0"
            aria-label="Next Project"
          >
            <ProjectIcon icon={activeIcon} />
          </button>
        ) : (
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] bg-[#121214] text-white hover:scale-105 active:scale-95 transition-transform duration-200 shadow-md shrink-0"
            aria-label="Home"
          >
            <svg
              width="18"
              height="18"
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

        {/* Center Label */}
        {labelHref ? (
          <Link
            href={labelHref}
            className={`text-[13px] sm:text-[14px] font-semibold px-4 py-2 select-none tracking-tight text-center transition-colors ${
              isLight
                ? "text-black hover:text-neutral-700"
                : "text-white hover:text-neutral-200"
            }`}
          >
            {label}
          </Link>
        ) : (
          <span
            className={`text-[13px] sm:text-[14px] font-semibold px-4 select-none tracking-tight text-center ${
              isLight ? "text-black" : "text-white"
            }`}
          >
            {label}
          </span>
        )}

        {/* Right Menu Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenMenu();
          }}
          className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] hover:scale-105 active:scale-95 transition-transform duration-200 shadow-sm shrink-0 ${
            isLight
              ? "bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-200"
              : "bg-white hover:bg-neutral-100 text-[#121214]"
          }`}
          aria-label="Toggle Project Menu"
        >
          <div className="flex flex-col gap-[3.5px] items-center justify-center">
            <span
              className={`w-[14px] h-[1.8px] rounded-full ${
                isLight ? "bg-black" : "bg-[#121214]"
              }`}
            />
            <span
              className={`w-[14px] h-[1.8px] rounded-full ${
                isLight ? "bg-black" : "bg-[#121214]"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Number 1 / 6 Pinned to the Far Right Corner */}
      {totalProjects !== undefined && (
        <div
          ref={counterRef}
          className={`absolute right-6 sm:right-10 pointer-events-auto flex items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[10px] backdrop-blur-md text-[12px] sm:text-[13px] font-mono tracking-wider shadow-lg will-change-transform ${
            isLight
              ? "bg-white/90 border border-black/10 text-black"
              : "bg-black/35 border border-white/10 text-white"
          }`}
        >
          0{currentIndex + 1} / 0{totalProjects}
        </div>
      )}
    </div>
  );
}
