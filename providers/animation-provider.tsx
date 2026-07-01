"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { MotionConfig } from "framer-motion";

interface AnimationContextType {
  reducedMotion: boolean;
}

const AnimationContext = createContext<AnimationContextType>({ reducedMotion: false });

export function AnimationProvider({ children }: { children: ReactNode }) {
  // We can query system reduced motion preference if needed
  const [reducedMotion, setReducedMotion] = React.useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return (
    <AnimationContext.Provider value={{ reducedMotion }}>
      {/* Configure Framer Motion to globally bypass animations if prefers-reduced-motion is true */}
      <MotionConfig transition={reducedMotion ? { duration: 0 } : undefined}>
        {children}
      </MotionConfig>
    </AnimationContext.Provider>
  );
}

export function useAnimationConfig() {
  return useContext(AnimationContext);
}

// Inline useEffect stub helper for compatibility
import { useEffect } from "react";
