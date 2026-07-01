"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold font-mono tracking-wider uppercase transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border border-primary/20",
        secondary: "bg-secondary text-secondary-foreground border border-border/60",
        glass: "glass-panel text-foreground border-white/10",
        outline: "bg-transparent text-foreground border border-border/80",
        growth: "bg-success/15 text-success border border-success/35",
        insight: "bg-warning/15 text-warning border border-warning/35",
        danger: "bg-danger/15 text-danger border border-danger/35",
        info: "bg-info/15 text-info border border-info/35",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

// ----------------------------------------------------
// DYNAMIC CHIP COMPONENT (WITH REMOVE ACTION)
// ----------------------------------------------------
export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  onRemove?: () => void;
  removeLabel?: string;
}

export function Chip({
  className,
  variant,
  onRemove,
  removeLabel = "Remove",
  children,
  ...props
}: ChipProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant }),
        "flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium tracking-normal normal-case select-none",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={removeLabel}
          className="hover:bg-foreground/10 cursor-pointer rounded-full p-0.5 text-current transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
