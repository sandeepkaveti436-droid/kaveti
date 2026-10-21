import React from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import Footer from "@/components/navigation/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const instant = false;

interface CaseStudyData {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  role: string;
  liveUrl: string;
  description: string;
  images: string[];
  desktopVideo: string;
  mobileVideo: string;
  process: {
    step: string;
    title: string;
    description: string;
  }[];
}

const CASE_STUDIES: Record<number, CaseStudyData> = {
  1: {
    id: 1,
    title: "SkyNova",
    subtitle: "Digitals Studio",
    category: "Digital Transformation & Product Studio",
    year: "2024",
    client: "SkyNova Global",
    role: "Lead Creative Technologist & Product Designer",
    liveUrl: "https://skynovadigitals.vercel.app/",
    description:
      "A strategic digital transformation studio platform designed to turn innovative ideas into market-leading reality through high-performance Next.js systems and modern UI architecture.",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2600&auto=format&fit=crop",
    ],
    desktopVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    mobileVideo:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    process: [
      {
        step: "01",
        title: "Strategic Discovery",
        description:
          "Conducted market DNA analysis and mapped user psychology before writing code to maximize commercial conversion.",
      },
      {
        step: "02",
        title: "Visual Systems",
        description:
          "Formulated scalable design tokens, bespoke typography hierarchies, and fluid interaction prototypes.",
      },
      {
        step: "03",
        title: "Next.js Engineering",
        description:
          "Architected lightning-fast server-rendered interfaces with zero-runtime CSS and edge caching.",
      },
      {
        step: "04",
        title: "Scale & Growth",
        description:
          "Engineered targeted funnel optimizations, programmatic SEO structures, and multi-channel telemetry.",
      },
    ],
  },
  2: {
    id: 2,
    title: "Digify",
    subtitle: "Agency Experience",
    category: "Brand Strategy, Web & UI/UX",
    year: "2024",
    client: "Digify Media",
    role: "Design Director & Creative Developer",
    liveUrl: "https://digify-agency.vercel.app/",
    description:
      "A bespoke digital agency experience uniting high-impact brand storytelling, editorial aesthetic layouts, and interactive micro-experiences for hyper-growth clients.",
    images: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2600&auto=format&fit=crop",
    ],
    desktopVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    mobileVideo:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    process: [
      {
        step: "01",
        title: "Brand Immersion",
        description:
          "Extracted brand ethos through executive stakeholder workshops and competitive landscape audits.",
      },
      {
        step: "02",
        title: "Art Direction & Motion",
        description:
          "Engineered bespoke motion signatures, cursor micro-physics, and dynamic typography systems.",
      },
      {
        step: "03",
        title: "Fluid Frontend",
        description:
          "Implemented 60fps smooth scrolling, WebGL hero canvas elements, and responsive layout grids.",
      },
      {
        step: "04",
        title: "Brand Delivery",
        description:
          "Packaged comprehensive digital guidelines, brand assets, and content publishing workflows.",
      },
    ],
  },
  3: {
    id: 3,
    title: "Orvixa",
    subtitle: "AI Work Management",
    category: "AI Powered Work Management Platform",
    year: "2024",
    client: "Orvixa Inc.",
    role: "Lead UI/UX & Systems Architect",
    liveUrl: "https://orvixas.vercel.app/",
    description:
      "A unified, AI-powered work management platform consolidating project tracking, automated timesheets, client invoicing, and intelligent assistant workflows into a glass cockpit.",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2600&auto=format&fit=crop",
    ],
    desktopVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    mobileVideo:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    process: [
      {
        step: "01",
        title: "Workflow Mapping",
        description:
          "Mapped pain points across 500+ freelance and team user interviews to eliminate context-switching.",
      },
      {
        step: "02",
        title: "Glassmorphism UI",
        description:
          "Designed a translucent, multi-layered dark & light workspace with high-density data visualizations.",
      },
      {
        step: "03",
        title: "AI Integration",
        description:
          "Built conversational triage prompts, automated timesheet generation, and instant client invoice sync.",
      },
      {
        step: "04",
        title: "Security & SOC2",
        description:
          "Hardened enterprise passkey authentication, role-based access control, and real-time WebSockets.",
      },
    ],
  },
  4: {
    id: 4,
    title: "HR Admin",
    subtitle: "Intelligence Suite",
    category: "Staff & Workforce Enterprise Management",
    year: "2023",
    client: "Staff Management Global",
    role: "Full-Stack Product Designer",
    liveUrl: "https://hradmin-staffmanagement.vercel.app/",
    description:
      "A next-generation enterprise workforce portal facilitating frictionless staff onboarding, attendance tracking, role-based payroll access, and predictive capacity analytics.",
    images: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2600&auto=format&fit=crop",
    ],
    desktopVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    mobileVideo:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    process: [
      {
        step: "01",
        title: "Human Capital Audit",
        description:
          "Analyzed legacy enterprise HR platforms to eliminate multi-step compliance verification friction.",
      },
      {
        step: "02",
        title: "Information Architecture",
        description:
          "Structured role-specific navigation trees ensuring staff, managers, and executives see only pertinent data.",
      },
      {
        step: "03",
        title: "Dashboard Optimization",
        description:
          "Created modular tabular layouts and rapid search filters capable of indexing thousands of employee records.",
      },
      {
        step: "04",
        title: "Enterprise Deployment",
        description:
          "Conducted stress testing with multi-regional cloud instances and seamless SSO authentication.",
      },
    ],
  },
  5: {
    id: 5,
    title: "Sandeep Kaveti",
    subtitle: "Creative Playground",
    category: "Creative Direction & Personal Portfolio",
    year: "2024",
    client: "Sandeep Kaveti",
    role: "Visual Designer & Creative Technologist",
    liveUrl: "https://kavetisandeep.vercel.app/",
    description:
      "The flagship digital presence and design playground featuring custom pointer ergonomics, infinite zoom filmstrips, kinetic typography, and fluid micro-interactions.",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2600&auto=format&fit=crop",
    ],
    desktopVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    mobileVideo:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    process: [
      {
        step: "01",
        title: "Design Philosophy",
        description:
          "Established an editorial, minimalist aesthetic rooted in clean typography and Swiss layout rigor.",
      },
      {
        step: "02",
        title: "GSAP Kinematics",
        description:
          "Architected 3-phase zoom-out filmstrip transitions and hardware-accelerated inertia physics.",
      },
      {
        step: "03",
        title: "Responsive Island Dock",
        description:
          "Engineered an adaptive bottom floating navigation that adjusts contrast and position dynamically.",
      },
      {
        step: "04",
        title: "Production Optimization",
        description:
          "Achieved 100/100 Lighthouse performance metrics through Next.js static asset optimization.",
      },
    ],
  },
  6: {
    id: 6,
    title: "AuraFlow",
    subtitle: "Mindfulness & Yoga",
    category: "Mindfulness & Holistic Yoga Studio",
    year: "2024",
    client: "AuraFlow Collective",
    role: "Brand Identity & Experience Designer",
    liveUrl: "https://auraflow-yoga.vercel.app/",
    description:
      "A serene, calming digital sanctuary for holistic yoga practices, mindful breathing sessions, retreat booking, and wellness community engagement.",
    images: [
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2600&auto=format&fit=crop",
    ],
    desktopVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    mobileVideo:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    process: [
      {
        step: "01",
        title: "Sensory Discovery",
        description:
          "Researched natural color palettes and ambient sonic environments to craft an anxiety-reducing web journey.",
      },
      {
        step: "02",
        title: "Organic Design System",
        description:
          "Selected warm earthen tones, gentle curvature radii, and soft breathing gradients.",
      },
      {
        step: "03",
        title: "Class Booking Flow",
        description:
          "Created a 2-step frictionless booking calendar tailored for mobile participants and yoga retreat attendees.",
      },
      {
        step: "04",
        title: "Mobile Polish",
        description:
          "Refined touch targets, offline schedule caching, and high-contrast ambient modes.",
      },
    ],
  },
};

export function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
  ];
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = parseInt(id, 10);
  const project = CASE_STUDIES[projectId] || CASE_STUDIES[1];

  return (
    <main
      className={`${inter.className} min-h-screen bg-white text-black selection:bg-neutral-900 selection:text-white`}
    >
      {/* Top Header / Breadcrumb Navigation */}
      <header className="border-b border-neutral-200/80 sticky top-0 bg-white/80 backdrop-blur-md z-40">
        <div className="max-w-8xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/work"
            className="group flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-black font-medium transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="group-hover:-translate-x-1 transition-transform"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Works</span>
          </Link>

          <span className="text-[14px] text-neutral-400 font-medium">
            {project.year} / Case Study
          </span>
        </div>
      </header>

      {/* ===================== TOP HERO ===================== */}
      <section className="max-w-8xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-neutral-200">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 block mb-3 font-medium">
              {project.category}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-neutral-900 leading-[1.05]">
              {project.title} <br />
              <span className="text-neutral-500 font-light">
                {project.subtitle}
              </span>
            </h1>
            <p className="text-[16px] sm:text-[18px] text-neutral-600 font-light mt-6 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="shrink-0 mb-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-all shadow-md text-sm font-medium tracking-tight"
            >
              <span>View Live Website</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>

        {/* Project Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 text-xs">
          <div>
            <span className="text-[16px] text-neutral-400 block uppercase tracking-wider mb-1 font-medium">
              Client
            </span>
            <span className="text-[16px] font-medium text-neutral-900">
              {project.client}
            </span>
          </div>
          <div>
            <span className="text-[16px] text-neutral-400 block uppercase tracking-wider mb-1 font-medium">
              Role
            </span>
            <span className="text-[16px] font-medium text-neutral-900">
              {project.role}
            </span>
          </div>
          <div>
            <span className="text-[16px] text-neutral-400 block uppercase tracking-wider mb-1 font-medium">
              Timeline
            </span>
            <span className="text-[16px] font-medium text-neutral-900">
              {project.year}
            </span>
          </div>
          <div>
            <span className="text-[16px] text-neutral-400 block uppercase tracking-wider mb-1 font-medium">
              Service
            </span>
            <span className="text-[16px] font-medium text-neutral-900">
              {project.category}
            </span>
          </div>
        </div>
      </section>

      {/* ===================== WEBSITE IMAGES SECTION ===================== */}
      <section className="max-w-8xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-6">
          <div className="relative aspect-[16/9] w-full rounded-[24px] overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-sm">
            <img
              src={project.images[0]}
              alt={`${project.title} Preview 1`}
              className="w-full h-full object-cover"
            />
          </div>

          {project.images.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] w-full rounded-[20px] overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-sm"
                >
                  <img
                    src={img}
                    alt={`${project.title} Preview ${i + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===================== VIDEOS SECTION ===================== */}
      <section className="max-w-8xl mx-auto px-6 py-16">
        <div className="mb-8">
          <span className="text-[14px] uppercase tracking-[0.25em] text-neutral-400 block mb-2 font-medium">
            Live Prototypes
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight">
            Desktop & Mobile Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Frame */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            <div className="rounded-[22px] bg-neutral-900 p-2 sm:p-3 border border-neutral-800 shadow-2xl">
              <div className="flex items-center gap-1.5 px-3 py-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <div className="mx-auto text-[10px] text-neutral-500 truncate max-w-xs font-medium">
                  {project.liveUrl}
                </div>
              </div>

              <div className="relative aspect-[16/10] w-full rounded-[14px] overflow-hidden bg-black">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                >
                  <source src={project.desktopVideo} type="video/mp4" />
                </video>
              </div>
            </div>
            <span className="text-xs text-neutral-400 pl-2 font-medium">
              Desktop Viewport (1920 × 1080)
            </span>
          </div>

          {/* Mobile Frame */}
          <div className="lg:col-span-4 flex flex-col items-center gap-3">
            <div className="relative w-full max-w-[280px] rounded-[36px] bg-neutral-900 p-2.5 border-[3px] border-neutral-800 shadow-2xl">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-10" />

              <div className="relative aspect-[8/18] w-full rounded-[28px] overflow-hidden bg-black">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                >
                  <source src={project.mobileVideo} type="video/mp4" />
                </video>
              </div>
            </div>
            <span className="text-xs text-neutral-400 font-medium">
              Mobile Viewport (390 × 844)
            </span>
          </div>
        </div>
      </section>

      {/* ===================== PROCESS SECTION ===================== */}
      <section className="max-w-8xl mx-auto px-6 py-16 border-t border-neutral-200">
        <div className="mb-12">
          <span className="text-[14px] uppercase tracking-[0.25em] text-neutral-400 block mb-2 font-medium">
            Execution Strategy
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight">
            Design & Engineering Process
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {project.process.map((p) => (
            <div
              key={p.step}
              className="p-6 rounded-[20px] bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between"
            >
              <div>
                <span className="text-sm font-semibold text-neutral-400 block mb-4">
                  {p.step}
                </span>
                <h3 className="text-lg font-medium text-neutral-900 mb-2 tracking-tight">
                  {p.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed mt-4">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <Footer />
    </main>
  );
}
