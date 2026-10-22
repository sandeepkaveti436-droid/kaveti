"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";

// =========================================================================
// 🎛️ RESPONSIVE SIZES
// =========================================================================
const DRAWER_CONFIG = {
  mobile: {
    width: "w-[calc(100vw-28px)] max-w-[320px]",
    maxHeight: "max-h-[100vh]",
  },
  desktop: {
    width: "sm:w-[330px]",
    maxHeight: "sm:max-h-none",
  },
};

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWorks?: () => void;
}

export default function MenuDrawer({
  isOpen,
  onClose,
  onOpenWorks,
}: MenuDrawerProps) {
  const router = useRouter();
  const [time, setTime] = useState("");
  const [isRendered, setIsRendered] = useState(isOpen);
  const [currentView, setCurrentView] = useState<"menu" | "contact">("menu");

  // Video Reel Playback State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Contact Form State
  const [activeTab, setActiveTab] = useState<"project" | "team" | "contact">(
    "project",
  );
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================================================================
  // ⚡ INTERACTIVE SLIDER STATE & LOGIC
  // =========================================================================
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const [slideX, setSlideX] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const maxSlideRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  // Live Digital Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Autoplay Reel Video whenever Drawer is Open
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play();
              setIsMuted(true);
            }
          });
      }
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen, isMuted]);

  // Toggle Video Sound on Play/Mute Icon Click
  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Handle Close Animation (Collapses smoothly back into bottom bar)
  const handleClose = useCallback(() => {
    if (isClosingRef.current || !cardRef.current || !backdropRef.current)
      return;
    isClosingRef.current = true;

    if (videoRef.current) {
      videoRef.current.pause();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        isClosingRef.current = false;
        setIsRendered(false);
        setCurrentView("menu");
        setIsSubmitted(false);
        setIsSubmitting(false);
        setSlideX(0);
        onClose();
      },
    });

    if (tilesRef.current) {
      tl.to(
        tilesRef.current.children,
        {
          y: 12,
          opacity: 0,
          duration: 0.16,
          stagger: -0.02,
          ease: "power2.in",
        },
        0,
      );
    }

    tl.to(
      cardRef.current,
      {
        y: 35,
        scaleY: 0.15,
        scaleX: 0.78,
        opacity: 0,
        duration: 0.32,
        ease: "power3.inOut",
      },
      0.06,
    );

    tl.to(
      backdropRef.current,
      {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      },
      0.08,
    );
  }, [onClose]);

  // Handle Open Animation
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      isClosingRef.current = false;
      document.body.style.overflow = "hidden";

      requestAnimationFrame(() => {
        if (!cardRef.current || !backdropRef.current) return;

        const tl = gsap.timeline();

        tl.to(backdropRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        tl.fromTo(
          cardRef.current,
          {
            y: 45,
            scaleY: 0.18,
            scaleX: 0.75,
            opacity: 0,
            transformOrigin: "bottom center",
          },
          {
            y: 0,
            scaleY: 1,
            scaleX: 1,
            opacity: 1,
            duration: 0.44,
            ease: "power4.out",
          },
          0,
        );

        if (tilesRef.current) {
          tl.fromTo(
            tilesRef.current.children,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.35,
              stagger: 0.035,
              ease: "power2.out",
            },
            0.12,
          );
        }
      });
    } else if (isRendered && !isClosingRef.current) {
      handleClose();
    }
  }, [isOpen, isRendered, handleClose]);

  // Slide Gesture Handlers
  const handleSlideStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!sliderTrackRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setIsSliding(true);

    const trackWidth = sliderTrackRef.current.offsetWidth;
    const knobWidth = 36;
    const padding = 8;
    maxSlideRef.current = Math.max(0, trackWidth - knobWidth - padding);

    startXRef.current = e.clientX - slideX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleSlideMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX - startXRef.current;
    const boundedX = Math.max(0, Math.min(currentX, maxSlideRef.current));

    if (boundedX > 5) {
      hasDraggedRef.current = true;
    }

    setSlideX(boundedX);
  };

  const handleSlideEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsSliding(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}

    if (slideX > maxSlideRef.current * 0.6) {
      setSlideX(maxSlideRef.current);
      setTimeout(() => {
        setCurrentView("contact");
        setSlideX(0);
      }, 160);
    } else {
      setSlideX(0);
    }
  };

  if (!isRendered) return null;

  const handleWorkClick = () => {
    handleClose();
    setTimeout(() => {
      if (onOpenWorks) {
        onOpenWorks();
      } else {
        router.push("/work");
      }
    }, 300);
  };

  // =========================================================================
  // 📩 FORM SUBMISSION TO EMAIL & WHATSAPP
  // =========================================================================
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const name =
      (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email =
      (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const company =
      (form.elements.namedItem("company") as HTMLInputElement)?.value || "";
    const message =
      (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";

    try {
      // 1. Sends to your Email via Web3Forms
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "05cbbf8d-d558-450f-a63e-32943dc7f201",
          subject: `Menu Drawer Lead (${activeTab.toUpperCase()}): ${name}`,
          to_email: "sandeepkaveti436@gmail.com",
          inquiry_type: activeTab,
          name,
          email,
          company,
          message,
        }),
      });

      // 2. Sends WhatsApp alert directly to your phone
      const waText = encodeURIComponent(
        `*New Lead from Menu Drawer*\n*Type:* ${activeTab}\n*Name:* ${name}\n*Email:* ${email}\n*Company:* ${company}\n*Project:* ${message}`,
      );
      window.open(`https://wa.me/919392525043?text=${waText}`, "_blank");

      setIsSubmitted(true);
    } catch {
      // Fallback
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => {
      handleClose();
    }, 1400);
  };

  return (
    <>
      {/* ===================== CLEAN BACKDROP (NO BLUR) ===================== */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 z-40 bg-black/20 opacity-0 transition-opacity select-none"
      />

      {/* ===================== DRAWER (EXPANDS FROM BOTTOM BAR) ===================== */}
      <div className="fixed inset-x-0 bottom-4 sm:bottom-6 z-50 flex items-end justify-center px-3 pointer-events-none select-none">
        <div
          ref={cardRef}
          onClick={(e) => e.stopPropagation()}
          className={`pointer-events-auto relative ${DRAWER_CONFIG.mobile.width} ${DRAWER_CONFIG.desktop.width} ${DRAWER_CONFIG.mobile.maxHeight} ${DRAWER_CONFIG.desktop.maxHeight} bg-[#ededed] rounded-[26px] sm:rounded-[22px] p-2.5 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-black/5 flex flex-col justify-between overflow-y-auto will-change-transform`}
        >
          {/* =========================================================================
              VIEW 1: REGULAR MENU TILES
          ========================================================================= */}
          {currentView === "menu" ? (
            <>
              {/* Top Subtle Drag Handle */}
              <div className="w-16 h-1 bg-neutral-300/80 rounded-full mx-auto" />

              <div ref={tilesRef} className="flex flex-col gap-2 my-auto">
                {/* Row 1: Work & Studio */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div
                    onClick={handleWorkClick}
                    className="p-3.5 rounded-[16px] bg-white hover:bg-neutral-50 shadow-xs border border-black/5 transition-all cursor-pointer flex flex-col justify-between h-[100px]"
                  >
                    <span className="text-[14px] font-semibold text-[#1d1d1d]">
                      Work
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      Selected projects
                    </span>
                  </div>

                  <Link
                    href="/about"
                    onClick={handleClose}
                    className="p-3.5 rounded-[16px] bg-white hover:bg-neutral-50 shadow-xs border border-black/5 transition-all flex flex-col justify-between h-[100px]"
                  >
                    <span className="text-[14px] font-semibold text-[#1d1d1d]">
                      Studio
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      About us
                    </span>
                  </Link>
                </div>

                {/* Row 2: Play Reel Card */}
                <div
                  className="relative h-[180px] rounded-[18px] overflow-hidden bg-neutral-900 text-white p-3.5 mb-1 flex flex-col justify-between shadow-xs group cursor-pointer"
                  onClick={toggleAudio}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  >
                    <source
                      src="https://vjs.zencdn.net/v/oceans.mp4"
                      type="video/mp4"
                    />
                  </video>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-semibold tracking-tight text-white/90">
                        Growth Reel 2026
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-white/70 uppercase">
                      {isMuted ? "Sound Off" : "Sound On"}
                    </span>
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <span className="text-[14px] font-bold tracking-tight block">
                        Play reel
                      </span>
                      <span className="text-[10px] text-white/70 font-light block">
                        Digital Marketing & Systems
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center transition-all shadow-md group-hover:scale-110 active:scale-95">
                      {isMuted ? (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <polygon points="6 3 20 12 6 21 6 3" />
                        </svg>
                      ) : (
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                {/* Row 3: Interactive Slider */}
                <div
                  ref={sliderTrackRef}
                  className="relative w-full h-11 rounded-[50px] bg-[#e0e0e0] select-none p-1 flex items-center overflow-hidden touch-none"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-[#d4d4d4] rounded-[50px] pointer-events-none transition-all"
                    style={{ width: `${slideX + 40}px` }}
                  />

                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity pl-6"
                    style={{
                      opacity: Math.max(
                        0,
                        1 - (slideX / (maxSlideRef.current || 1)) * 1.5,
                      ),
                    }}
                  >
                    <span className="text-[12px] text-neutral-600 font-medium tracking-tight">
                      Slide to contact us
                    </span>
                  </div>

                  <div
                    className="absolute right-4 text-neutral-400 text-xs pointer-events-none transition-opacity"
                    style={{
                      opacity: Math.max(
                        0.2,
                        1 - (slideX / (maxSlideRef.current || 1)) * 1.2,
                      ),
                    }}
                  >
                    →
                  </div>

                  <div
                    onPointerDown={handleSlideStart}
                    onPointerMove={handleSlideMove}
                    onPointerUp={handleSlideEnd}
                    onPointerCancel={handleSlideEnd}
                    onClick={() => {
                      if (!hasDraggedRef.current) {
                        setCurrentView("contact");
                      }
                    }}
                    style={{
                      transform: `translateX(${slideX}px)`,
                      transition: isSliding
                        ? "none"
                        : "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    className="w-9 h-9 rounded-full bg-white shadow-xs flex items-center justify-center text-neutral-800 cursor-grab active:cursor-grabbing z-10 shrink-0"
                    aria-label="Slide to contact"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                </div>

                {/* Row 4: Updates & Clock */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/updates"
                    onClick={handleClose}
                    className="p-3 rounded-[16px] bg-white hover:bg-neutral-50 shadow-xs border border-black/5 flex flex-col justify-between h-[100px]"
                  >
                    <span className="text-[13px] font-semibold text-[#1d1d1d]">
                      Updates
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      News & Journal
                    </span>
                  </Link>

                  <div className="p-3 rounded-[16px] bg-white shadow-xs border border-black/5 flex items-center justify-between h-[100px]">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold text-[#1d1d1d]">
                        India
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {time || "14:19"}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-dashed border-neutral-300 flex items-center justify-center relative">
                      <span className="absolute -top-1 w-2 h-2 rounded-full bg-black" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Your Logo + Close Button */}
              <div className="flex items-center justify-between pt-4">
                <div className="w-10 h-10 rounded-[12px] bg-red-500 border border-black/5 flex items-center justify-center shadow-xs overflow-hidden p-1.5">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.innerText = "SK";
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-10 h-10 rounded-[12px] bg-[#dcdcdc] hover:bg-neutral-300 text-[#1d1d1d] flex items-center justify-center shadow-xs border border-black/5 transition-colors"
                  aria-label="Close menu"
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
            </>
          ) : (
            /* =========================================================================
                VIEW 2: "GET IN TOUCH" DESIGN (Connected to Web3Forms & WhatsApp)
            ========================================================================= */
            <div className="flex flex-col h-full bg-white rounded-[20px] p-4 sm:p-5 overflow-y-auto">
              {/* Header: Title + 3 Avatar Faces */}
              <div className="flex items-center justify-between pb-3">
                <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight">
                  Get in touch
                </h2>

                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                    alt="Team"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
                    alt="Team"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop"
                    alt="Team"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
                  />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center justify-between border-b border-neutral-200 text-xs text-neutral-500 font-medium mb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("project")}
                  className={`pb-2 transition-colors relative ${
                    activeTab === "project"
                      ? "text-neutral-900 font-semibold"
                      : "hover:text-neutral-700"
                  }`}
                >
                  Start a project
                  {activeTab === "project" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("team")}
                  className={`pb-2 transition-colors relative ${
                    activeTab === "team"
                      ? "text-neutral-900 font-semibold"
                      : "hover:text-neutral-700"
                  }`}
                >
                  Join the team
                  {activeTab === "team" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("contact")}
                  className={`pb-2 transition-colors relative ${
                    activeTab === "contact"
                      ? "text-neutral-900 font-semibold"
                      : "hover:text-neutral-700"
                  }`}
                >
                  Contact us
                  {activeTab === "contact" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                  )}
                </button>
              </div>

              {/* Form with Required Name Attributes */}
              <form
                onSubmit={handleFormSubmit}
                className="flex flex-col gap-2.5 text-xs"
              >
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Complete Name*"
                  className="w-full h-11 px-4 rounded-[14px] border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email*"
                  className="w-full h-11 px-4 rounded-[14px] border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                />

                <input
                  type="text"
                  name="company"
                  required
                  placeholder="Company name*"
                  className="w-full h-11 px-4 rounded-[14px] border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                />

                <textarea
                  name="message"
                  rows={2}
                  placeholder="Tell us about your project"
                  className="w-full p-3 rounded-[14px] border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black resize-none transition-colors"
                />

                <label className="flex items-center gap-2 text-[11px] text-neutral-600 mt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-3.5 h-3.5 rounded-[4px] border-neutral-300 accent-black"
                  />
                  <span>
                    I accept the{" "}
                    <Link
                      href="/privacy"
                      className="underline underline-offset-2 hover:text-black"
                    >
                      terms & conditions
                    </Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full h-11 rounded-[14px] bg-[#1a1a1c] hover:bg-black text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-all mt-1 active:scale-98 disabled:opacity-60"
                >
                  <span>
                    {isSubmitted
                      ? "Sent successfully!"
                      : isSubmitting
                        ? "Submitting..."
                        : "Submit"}
                  </span>
                  {!isSubmitting && !isSubmitted && <span>→</span>}
                </button>
              </form>

              <button
                type="button"
                onClick={() => setCurrentView("menu")}
                className="text-[11px] text-neutral-400 hover:text-black mt-2 text-center transition-colors"
              >
                ← Back to menu
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
