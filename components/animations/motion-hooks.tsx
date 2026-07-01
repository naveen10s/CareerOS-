"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// ----------------------------------------------------
// 1. MAGNETIC EFFECT WRAPPER
// ----------------------------------------------------
interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  actionStrength?: number; // range 0 to 1
}

export function Magnetic({ children, range = 60, actionStrength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (shouldReduce || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Calculate distance from center of element to mouse
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    const distance = Math.hypot(distanceX, distanceY);

    if (distance < range) {
      // Move element towards mouse
      x.set(distanceX * actionStrength);
      y.set(distanceY * actionStrength);
    } else {
      // Snap back to center
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const childStyle = (children.props as any)?.style || {};

  return React.cloneElement(children, {
    ref,
    style: {
      ...childStyle,
      x: springX,
      y: springY,
    },
  } as any);
}

// ----------------------------------------------------
// 2. 3D CARD LIFT (TILT) ANIMATOR
// ----------------------------------------------------
interface CardLiftProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function CardLift({ children, className, maxTilt = 10 }: CardLiftProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce || !cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation percentage based on coordinates
    const rX = -(mouseY / (height / 2)) * maxTilt;
    const rY = (mouseX / (width / 2)) * maxTilt;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{ transformStyle: "preserve-3d" }}
      className={cn("perspective-1000", className)}
    >
      {children}
    </motion.div>
  );
}

// ----------------------------------------------------
// 3. STAGGER ANIMATION WRAPPERS
// ----------------------------------------------------
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className,
  delayChildren = 0,
  staggerDelay = 0.08,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

export function StaggerItem({ children, className, yOffset = 20 }: StaggerItemProps) {
  const shouldReduce = useReducedMotion();
  const offset = shouldReduce ? 0 : yOffset;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: offset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ----------------------------------------------------
// 4. BORDER GLOW HOVER LAYER
// ----------------------------------------------------
interface GlowHoverProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowHover({
  children,
  className,
  glowColor = "rgba(104, 56, 239, 0.1)",
}: GlowHoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("group relative overflow-hidden", className)}
    >
      {isHovered && (
        <div
          className="duration-normal pointer-events-none absolute -inset-px z-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
