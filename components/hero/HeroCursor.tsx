"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export interface HeroCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
}

export default function HeroCursor({
  containerRef,
  disabled = false,
}: HeroCursorProps) {
  const arrowRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef?.current;
    const arrow = arrowRef.current;
    const badge = badgeRef.current;
    if (!container || !arrow || !badge) return;

    let isInside = false;

    const arrowX = gsap.quickTo(arrow, "x", { duration: 0.04, ease: "none" });
    const arrowY = gsap.quickTo(arrow, "y", { duration: 0.04, ease: "none" });

    const badgeX = gsap.quickTo(badge, "x", {
      duration: 0.22,
      ease: "power3.out",
    });
    const badgeY = gsap.quickTo(badge, "y", {
      duration: 0.22,
      ease: "power3.out",
    });

    const handlePointerMove = (e: PointerEvent) => {
      if (disabled) {
        if (isInside) {
          isInside = false;
          gsap.to([arrow, badge], {
            scale: 0,
            opacity: 0,
            duration: 0.15,
            overwrite: "auto",
          });
        }
        return;
      }

      const rect = container.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (inside) {
        if (!isInside) {
          isInside = true;
          gsap.fromTo(
            [arrow, badge],
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: "back.out(1.8)",
              overwrite: "auto",
            },
          );
        }

        arrowX(e.clientX);
        arrowY(e.clientY);
        badgeX(e.clientX + 16);
        badgeY(e.clientY + 22);
      } else {
        if (isInside) {
          isInside = false;
          gsap.to([arrow, badge], {
            scale: 0,
            opacity: 0,
            duration: 0.18,
            ease: "power2.in",
            overwrite: "auto",
          });
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [containerRef, disabled]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hero-cursor-zone,
        .hero-cursor-zone * {
          cursor: none !important;
        }
      `,
        }}
      />

      <div
        ref={arrowRef}
        className="fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform opacity-0 -translate-x-[2px] -translate-y-[4px]"
        style={{ transform: "translate3d(-200px, -200px, 0)" }}
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

      <div
        ref={badgeRef}
        className="fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform opacity-0 -translate-x-1/2 -translate-y-1/2"
        style={{ transform: "translate3d(-200px, -200px, 0)" }}
      >
        <div className="rounded-md bg-black px-2 py-0.5 text-xs font-medium text-white shadow-2xl pointer-events-none select-none tracking-normal border border-white/10 whitespace-nowrap">
          Designer
        </div>
      </div>
    </>
  );
}
