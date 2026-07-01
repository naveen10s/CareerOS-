"use client";

import React, { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  Variant,
  Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

// ----------------------------------------------------
// 1. FADE IN ANIMATION
// ----------------------------------------------------
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  triggerOnce?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "none",
  distance = 30,
  triggerOnce = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: triggerOnce, margin: "-10%" });

  const getDirectionOffsets = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offsets = getDirectionOffsets();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offsets,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration,
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

// ----------------------------------------------------
// 2. SCALE IN ANIMATION
// ----------------------------------------------------
interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  initialScale?: number;
  triggerOnce?: boolean;
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.4,
  initialScale = 0.95,
  triggerOnce = true,
}: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: triggerOnce, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: initialScale }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: initialScale }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 16,
        duration,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// ----------------------------------------------------
// 3. REVEAL / CLIP-PATH ANIMATION
// ----------------------------------------------------
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "left" | "right" | "up" | "down";
  triggerOnce?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "left",
  triggerOnce = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: triggerOnce, margin: "-5%" });

  const getClipPath = (state: "hidden" | "visible") => {
    if (state === "hidden") {
      switch (direction) {
        case "left":
          return "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
        case "right":
          return "polygon(0 0, 0 0, 0 100%, 0 100%)";
        case "up":
          return "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)";
        case "down":
          return "polygon(0 0, 100% 0, 100% 0, 0 0)";
      }
    } else {
      return "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: getClipPath("hidden"), opacity: 0.8 }}
      animate={
        isInView
          ? { clipPath: getClipPath("visible"), opacity: 1 }
          : { clipPath: getClipPath("hidden"), opacity: 0.8 }
      }
      transition={{
        ease: [0.16, 1, 0.3, 1], // ease-premium
        duration,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// ----------------------------------------------------
// 4. PARALLAX EFFECT
// ----------------------------------------------------
interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // positive = scroll up faster, negative = scroll down slower
}

export function Parallax({ children, className, speed = 0.15 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate transform offset relative to speed
  const y = useTransform(scrollYProgress, [0, 1], ["0px", `${speed * 400}px`]);

  // Apply spring smooth physics
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  return (
    <motion.div ref={ref} className={className} style={{ y: springY }}>
      {children}
    </motion.div>
  );
}

// ----------------------------------------------------
// 5. MOUSE FOLLOWER
// ----------------------------------------------------
export function MouseFollower() {
  const mouseX = useSpring(0, { stiffness: 150, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 25 });
  const size = useSpring(8, { stiffness: 200, damping: 30 });
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - size.get() / 2);
      mousey.set(e.clientY - size.get() / 2);
      if (!isVisible) setIsVisible(true);
    };

    const mousey = mouseY;

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [mouseX, mouseY, isVisible, size]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="border-primary/40 bg-primary/10 pointer-events-none fixed top-0 left-0 z-50 hidden rounded-full border mix-blend-difference md:block"
      style={{
        x: mouseX,
        y: mouseY,
        width: size,
        height: size,
      }}
    />
  );
}

// ----------------------------------------------------
// 6. CARD INTERACTION
// ----------------------------------------------------
interface CardHoverProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHover({ children, className }: CardHoverProps) {
  return (
    <motion.div
      className={cn("glass-card relative overflow-hidden rounded-xl p-6", className)}
      whileHover={{
        y: -4,
        borderColor: "rgba(104, 56, 239, 0.35)",
        boxShadow: "var(--shadow-premium-md)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}

// ----------------------------------------------------
// 7. PAGE TRANSITION WRAPPER
// ----------------------------------------------------
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{
        ease: [0.16, 1, 0.3, 1], // ease-premium
        duration: 0.6,
      }}
      className="flex w-full flex-grow flex-col"
    >
      {children}
    </motion.div>
  );
}
