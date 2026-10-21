import React from 'react';
import { ProjectIconType } from '@/types/carousel';

interface ProjectIconProps {
  icon: ProjectIconType;
}

export default function ProjectIcon({ icon }: ProjectIconProps) {
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