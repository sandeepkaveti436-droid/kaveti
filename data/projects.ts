export type ProjectIconType = 'tech' | 'youtube' | 'ai' | 'watch' | 'avatr' | 'gaudi';

export interface Project {
  id: number;
  line1: string;
  line2: string;
  category: string;
  image: string;
  liveUrl: string;
  icon: ProjectIconType;
}

export const CARD_GAP = 56;
export const REST_DURATION = 5500;

export const PROJECTS: Project[] = [
  {
    id: 1,
    line1: "SkyNova",
    line2: "Digitals",
    category: "Digital Transformation & Product Studio",
    liveUrl: "https://skynovadigitals.vercel.app/",
    // Live full-HD automated screenshot from your Vercel deployment
    image: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fskynovadigitals.vercel.app%2F?w=1920&h=1080",
    icon: "tech",
  },
  {
    id: 2,
    line1: "Digify",
    line2: "Agency",
    category: "Brand Strategy, Web & UI/UX",
    liveUrl: "https://digify-agency.vercel.app/",
    // Live full-HD automated screenshot from your Vercel deployment
    image: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fdigify-agency.vercel.app%2F?w=1920&h=1080",
    icon: "youtube",
  },
  {
    id: 3,
    line1: "Orvixa",
    line2: "AI Platform",
    category: "AI Powered Work Management Platform",
    liveUrl: "https://orvixas.vercel.app/",
    // Live full-HD automated screenshot from your Vercel deployment
    image: "https://s0.wp.com/mshots/v1/https%3A%2F%2Forvixas.vercel.app%2F?w=1920&h=1080",
    icon: "ai",
  },
  {
    id: 4,
    line1: "HR Admin",
    line2: "Intelligence",
    category: "Staff & Workforce Enterprise Management",
    liveUrl: "https://hradmin-staffmanagement.vercel.app/",
    // Live full-HD automated screenshot from your Vercel deployment
    image: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fhradmin-staffmanagement.vercel.app%2F?w=1920&h=1080",
    icon: "watch",
  },
  {
    id: 5,
    line1: "Sandeep Kaveti",
    line2: "Personal Brand",
    category: "Creative Direction & Portfolio Experience",
    liveUrl: "https://kavetisandeep.vercel.app/",
    // Live full-HD automated screenshot from your Vercel deployment
    image: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fkavetisandeep.vercel.app%2F?w=1920&h=1080",
    icon: "avatr",
  },
  {
    id: 6,
    line1: "AuraFlow",
    line2: "Yoga & Wellness",
    category: "Mindfulness & Holistic Yoga Studio",
    liveUrl: "https://auraflow-yoga.vercel.app/",
    // Live full-HD automated screenshot from your Vercel deployment
    image: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fauraflow-yoga.vercel.app%2F?w=1920&h=1080",
    icon: "gaudi",
  },
];

export const EXTENDED_PROJECTS = [...PROJECTS, ...PROJECTS, ...PROJECTS];