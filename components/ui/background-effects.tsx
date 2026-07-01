"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ----------------------------------------------------
// 1. NOISE TEXTURE OVERLAY
// ----------------------------------------------------
export function NoiseTexture() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] bg-repeat opacity-[0.015] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// ----------------------------------------------------
// 2. CYBER GRID MATRIX (SUBTLE SCROLLING GRID LINES)
// ----------------------------------------------------
export function AnimatedGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.06] dark:opacity-[0.04]">
      {/* Horizontal & Vertical grid pattern */}
      <div
        className="bg-grid-pattern animate-grid-scroll absolute inset-0 h-[200vh] w-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Radial fade to edges */}
      <div className="bg-radial-vignette absolute inset-0" />
    </div>
  );
}

// ----------------------------------------------------
// 3. AURORA AMBIENT GLOWS (STREAMING LIGHT COLORS)
// ----------------------------------------------------
export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Blur container */}
      <div className="bg-background absolute inset-0 opacity-40 blur-[100px] filter dark:opacity-20">
        {/* Violet Aurora */}
        <motion.div
          animate={{
            x: ["-20%", "20%", "-10%", "-20%"],
            y: ["-10%", "30%", "10%", "-10%"],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-primary/20 absolute -top-[10%] -left-[10%] h-[60vw] w-[60vw] rounded-full"
        />

        {/* Emerald/Success Aurora */}
        <motion.div
          animate={{
            x: ["10%", "-20%", "20%", "10%"],
            y: ["20%", "-10%", "30%", "20%"],
            scale: [1.1, 0.8, 1.2, 1.1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-success/15 absolute top-[20%] -right-[15%] h-[50vw] w-[50vw] rounded-full"
        />

        {/* Amber/Warning Aurora */}
        <motion.div
          animate={{
            x: ["-15%", "15%", "-20%", "-15%"],
            y: ["30%", "10%", "-15%", "30%"],
            scale: [0.9, 1.1, 1, 0.9],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-warning/10 absolute -bottom-[15%] left-[20%] h-[55vw] w-[55vw] rounded-full"
        />
      </div>
    </div>
  );
}
export default AuroraBackground;
