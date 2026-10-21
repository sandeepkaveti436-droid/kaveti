import React from 'react';

interface HeroTitleProps {
  titleRef: React.RefObject<HTMLDivElement | null>;
  line1: string;
  line2: string;
}

export default function HeroTitle({ titleRef, line1, line2 }: HeroTitleProps) {
  return (
    <div 
      ref={titleRef}
      className="absolute left-6 sm:left-12 md:left-16 top-1/2 -translate-y-12 z-30 pointer-events-none max-w-2xl will-change-transform"
    >
      <h1 className="flex flex-col text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal leading-[1.06] tracking-[-0.035em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
        <span className="block">{line1}</span>
        <span className="block">{line2}</span>
      </h1>
    </div>
  );
}