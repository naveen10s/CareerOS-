"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface GSAPRevealProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  xOffset?: number;
  triggerHook?: string; // e.g. "top 85%"
}

export function GSAPReveal({
  children,
  className,
  duration = 0.8,
  delay = 0,
  yOffset = 50,
  xOffset = 0,
  triggerHook = "top 85%",
}: GSAPRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Set initial state
    gsap.set(el, {
      opacity: 0,
      y: yOffset,
      x: xOffset,
    });

    const trigger = gsap.to(el, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: triggerHook,
        toggleActions: "play none none none",
      },
    });

    return () => {
      trigger.scrollTrigger?.kill();
      trigger.kill();
    };
  }, [duration, delay, yOffset, xOffset, triggerHook]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitTextReveal({ text, className, delay = 0 }: SplitTextRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Split text into individual spans for words
    const words = text.split(" ");
    container.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full transform opacity-0 select-none">${word}&nbsp;</span></span>`,
      )
      .join("");

    const targetSpans = container.querySelectorAll("span > span");

    const trigger = gsap.to(targetSpans, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      delay,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      trigger.scrollTrigger?.kill();
      trigger.kill();
    };
  }, [text, delay]);

  return (
    <h3 ref={containerRef} className={className}>
      {text}
    </h3>
  );
}
