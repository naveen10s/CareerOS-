import React from "react";
import { FadeIn, Reveal, MouseFollower } from "@/components/animations/motion";
import { SplitTextReveal } from "@/components/animations/gsap-animate";

export default function Home() {
  const systems = [
    { name: "Next.js 15 App Router", status: "Active" },
    { name: "React 19 Runtime", status: "Active" },
    { name: "Tailwind CSS v4 (Theme Tokens)", status: "Active" },
    { name: "Framer Motion (Dynamic Physics)", status: "Active" },
    { name: "GSAP & ScrollTrigger Engine", status: "Active" },
    { name: "Lenis Smooth Scroll Adapter", status: "Active" },
    { name: "PWA Manifest & Robots SEO Schema", status: "Active" },
  ];

  return (
    <div className="bg-gradient-mesh selection:bg-primary/20 relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 sm:p-24">
      <MouseFollower />

      <main className="z-10 w-full max-w-lg">
        {/* Core title using GSAP split text */}
        <div className="mb-2">
          <span className="text-primary font-mono text-xs font-medium tracking-widest uppercase">
            System Bootstrap
          </span>
        </div>

        <SplitTextReveal
          text="CareerOS Foundation"
          className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl"
        />

        <FadeIn delay={0.4} direction="up" distance={15}>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            Sprint 1 project architecture initialized successfully. Core directories, dependency
            stack, design tokens, smooth scrolling, and metadata systems are registered. No template
            or page content is loaded.
          </p>
        </FadeIn>

        {/* System Checklist */}
        <FadeIn delay={0.6} direction="up" distance={20} className="mt-8">
          <div className="glass-card border-border/40 rounded-xl border p-6">
            <h2 className="text-foreground mb-4 font-mono text-xs font-bold tracking-wider uppercase">
              Architecture Status
            </h2>
            <ul className="space-y-3 font-mono text-xs">
              {systems.map((sys, idx) => (
                <li
                  key={idx}
                  className="border-border/20 flex items-center justify-between border-b py-1.5 last:border-0"
                >
                  <span className="text-muted-foreground">{sys.name}</span>
                  <span className="text-growth flex items-center gap-1.5 font-bold">
                    <span className="bg-growth h-1.5 w-1.5 animate-pulse rounded-full" />
                    {sys.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* Architecture Note */}
        <FadeIn
          delay={0.8}
          direction="up"
          distance={20}
          className="text-muted-foreground mt-6 flex items-center justify-between px-2 font-mono text-[10px]"
        >
          <span>SP1_FOUNDATION_OK</span>
          <span>LOC: /app/page.tsx</span>
        </FadeIn>
      </main>
    </div>
  );
}
