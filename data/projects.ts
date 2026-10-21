import { Project } from '@/types/carousel';

export const PROJECTS: Project[] = [
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

// Buffer for seamless, infinite forward-and-backward filmstrip continuity
export const EXTENDED_PROJECTS = [...PROJECTS, ...PROJECTS, ...PROJECTS];
export const CARD_GAP = 56;
export const REST_DURATION = 5500;