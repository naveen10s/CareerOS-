"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

interface RouteTransitionProps {
  children: ReactNode;
}

export function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname();
  const shouldReduce = useReducedMotion();

  const yOffset = shouldReduce ? 0 : 12;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: yOffset }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -yOffset }}
        transition={{
          ease: [0.16, 1, 0.3, 1],
          duration: 0.35,
        }}
        className="flex h-full w-full flex-1 flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
export default RouteTransition;
