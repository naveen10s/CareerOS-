"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-xl overflow-hidden transition-all duration-normal ease-premium", {
  variants: {
    variant: {
      solid: "bg-card text-card-foreground border border-border/40 shadow-premium-sm",
      outline: "bg-transparent text-foreground border border-border/80",
      glass: "glass-card text-foreground border border-white/5",
      glow: "relative bg-card text-card-foreground border border-border/40 shadow-premium-md before:absolute before:inset-0 before:-z-10 before:rounded-xl before:p-[1px] before:bg-gradient-to-r before:from-primary/30 before:to-growth/30",
    },
  },
  defaultVariants: {
    variant: "solid",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  withSpotlight?: boolean;
  spotlightColor?: string;
  animateHover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      withSpotlight = false,
      spotlightColor = "rgba(104, 56, 239, 0.08)",
      animateHover = false,
      children,
      onMouseMove,
      ...props
    },
    ref,
  ) => {
    // Spotlight calculations
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!withSpotlight) return;
      const { currentTarget, clientX, clientY } = event;
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);

      if (onMouseMove) {
        onMouseMove(event);
      }
    };

    const spotlightBackground = useMotionTemplate`
      radial-gradient(
        350px circle at ${mouseX}px ${mouseY}px,
        ${spotlightColor},
        transparent 80%
      )
    `;

    const cardClass = cn(cardVariants({ variant, className }));

    const content = (
      <>
        {withSpotlight && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-0 opacity-100 transition-opacity"
            style={{ background: spotlightBackground }}
          />
        )}
        <div className="relative z-10 flex h-full flex-col">{children}</div>
      </>
    );

    if (animateHover) {
      return (
        <motion.div
          ref={ref as any}
          onMouseMove={handleMouseMove}
          className={cn(cardClass, "relative")}
          whileHover={{ y: -4, boxShadow: "var(--shadow-premium-md)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          {...(props as any)}
        >
          {content}
        </motion.div>
      );
    }

    return (
      <div ref={ref} onMouseMove={handleMouseMove} className={cn(cardClass, "relative")} {...props}>
        {content}
      </div>
    );
  },
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-foreground text-lg leading-none font-semibold tracking-tight", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground text-xs leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-grow p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("border-border/20 mt-auto flex items-center border-t p-6 pt-0", className)}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
export default Card;
