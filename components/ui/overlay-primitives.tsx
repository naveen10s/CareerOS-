"use client";

import React, { useState, useRef, useEffect, ReactNode, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ----------------------------------------------------
// 1. DIALOG / MODAL COMPONENT
// ----------------------------------------------------
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="bg-background/80 absolute inset-0 backdrop-blur-sm"
          />

          {/* Modal box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            role="dialog"
            aria-modal="true"
            className="bg-card border-border/50 shadow-premium-lg text-foreground relative z-10 flex w-full max-w-md flex-col gap-4 overflow-hidden rounded-xl border p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              {title && (
                <h3 className="font-mono text-sm font-bold tracking-wider uppercase">{title}</h3>
              )}
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="border-border/10 text-muted-foreground hover:bg-secondary/40 hover:text-foreground flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content body */}
            <div className="text-muted-foreground text-xs leading-relaxed">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ----------------------------------------------------
// 2. TOOLTIP COMPONENT
// ----------------------------------------------------
interface TooltipProps {
  content: string;
  children: ReactNode;
  delay?: number;
}

export function Tooltip({ content, children, delay = 0.35 }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay * 1000);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  return (
    <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-text-primary text-background border-border/20 shadow-premium-sm pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded border px-2.5 py-1 text-[10px] font-medium whitespace-nowrap"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ----------------------------------------------------
// 3. DROPDOWN COMPONENT
// ----------------------------------------------------
interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
}

export function Dropdown({ trigger, children, align = "left" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "border-border/50 bg-card shadow-premium-md absolute z-40 mt-2 flex w-48 flex-col gap-0.5 rounded-lg border p-1.5 focus:outline-none",
              align === "left" ? "left-0" : "right-0",
            )}
          >
            <div onClick={() => setIsOpen(false)} className="flex flex-col gap-0.5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface DropdownItemProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  isDanger?: boolean;
}

export function DropdownItem({
  onClick,
  children,
  className,
  isDanger = false,
}: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full cursor-pointer items-center rounded px-2.5 py-1.5 text-left text-xs font-medium transition-colors",
        isDanger ? "text-danger hover:bg-danger/10" : "text-foreground hover:bg-secondary/60",
        className,
      )}
    >
      {children}
    </button>
  );
}

// ----------------------------------------------------
// 4. ACCORDION COMPONENT
// ----------------------------------------------------
interface AccordionProps {
  children: ReactNode;
  className?: string;
}

export function Accordion({ children, className }: AccordionProps) {
  return <div className={cn("w-full space-y-2", className)}>{children}</div>;
}

interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

export function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-border/40 bg-surface overflow-hidden rounded-lg border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-foreground hover:bg-secondary/20 flex w-full cursor-pointer items-center justify-between p-4 text-left text-xs font-semibold transition-all"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "text-muted-foreground duration-normal h-4 w-4 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
          >
            <div className="text-muted-foreground border-border/10 border-t p-4 pt-0 text-xs leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ----------------------------------------------------
// 5. TABS COMPONENT
// ----------------------------------------------------
interface TabsProps {
  value: string;
  onValueChange: (val: string) => void;
  children: ReactNode;
  className?: string;
}

const TabsContext = createContext<{ value: string; onValueChange: (val: string) => void } | null>(
  null,
);

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn("w-full space-y-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "bg-secondary/70 border-border/10 text-muted-foreground relative z-10 inline-flex h-10 items-center justify-center rounded-lg border p-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used inside Tabs");

  const isActive = context.value === value;

  return (
    <button
      onClick={() => context.onValueChange(value)}
      className={cn(
        "focus-visible:ring-ring text-muted-foreground hover:text-foreground relative z-20 inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-1.5 text-xs font-semibold tracking-wide whitespace-nowrap transition-all focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        isActive && "text-foreground",
        className,
      )}
    >
      {children}
      {isActive && (
        <motion.span
          layoutId="activeTabIndicator"
          className="bg-background shadow-premium-sm border-border/25 absolute inset-0 -z-10 rounded-md border"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used inside Tabs");

  if (context.value !== value) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ----------------------------------------------------
// 6. AVATAR COMPONENT
// ----------------------------------------------------
interface AvatarProps {
  src?: string;
  fallback: string;
  className?: string;
}

export function Avatar({ src, fallback, className }: AvatarProps) {
  const [error, setError] = useState(false);

  return (
    <div
      className={cn(
        "border-border/40 bg-surface shadow-premium-sm text-foreground relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border font-mono text-xs font-bold uppercase select-none",
        className,
      )}
    >
      {src && !error ? (
        <img
          src={src}
          alt={fallback}
          onError={() => setError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{fallback.substring(0, 2)}</span>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 7. LINEAR PROGRESS COMPONENT
// ----------------------------------------------------
export function Progress({ value, className }: { value: number; className?: string }) {
  const cappedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "bg-secondary/80 border-border/10 relative h-2 w-full overflow-hidden rounded-full border",
        className,
      )}
    >
      <div
        className="from-primary to-growth duration-slow ease-premium h-full rounded-full bg-gradient-to-r transition-all"
        style={{ width: `${cappedValue}%` }}
      />
    </div>
  );
}
