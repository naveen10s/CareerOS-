"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface DockItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface FloatingDockProps {
  items: DockItem[];
  className?: string;
}

export function FloatingDock({ items, className }: FloatingDockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 md:block">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "bg-card/80 border-border/40 shadow-premium-lg mx-auto flex h-16 items-end gap-4 rounded-2xl border px-4 pb-3 backdrop-blur-md",
          className,
        )}
      >
        {items.map((item, idx) => (
          <DockIcon key={idx} mouseX={mouseX} {...item} />
        ))}
      </motion.div>
    </div>
  );
}

interface DockIconProps {
  mouseX: MotionValue;
  icon: React.ReactNode;
  label: string;
  href: string;
}

function DockIcon({ mouseX, icon, label, href }: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Calculate distance between mouse x and center of element
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Map distance to height/width outputs
  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 68, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 68, 40]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 32, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 32, 20]);

  // Apply spring physics
  const springConfig = { stiffness: 150, damping: 12, mass: 0.1 };
  const width = useSpring(widthTransform, springConfig);
  const height = useSpring(heightTransform, springConfig);

  const widthIcon = useSpring(widthTransformIcon, springConfig);
  const heightIcon = useSpring(heightTransformIcon, springConfig);

  const [hovered, setHovered] = React.useState(false);

  return (
    <a href={href} className="relative select-none">
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="bg-secondary/80 border-border/20 text-foreground hover:bg-secondary relative flex cursor-pointer items-center justify-center rounded-full border transition-colors"
      >
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center text-current"
        >
          {icon}
        </motion.div>

        {/* Dynamic Tooltip on Hover */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-text-primary text-background border-border/20 shadow-premium-sm absolute bottom-full left-1/2 mb-3 -translate-x-1/2 rounded border px-2 py-0.5 text-[9px] font-bold tracking-wide whitespace-nowrap uppercase"
          >
            {label}
          </motion.div>
        )}
      </motion.div>
    </a>
  );
}
export default FloatingDock;
