"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Button from "@/components/buttons/button";

// ----------------------------------------------------
// 1. NAVBAR COMPONENT
// ----------------------------------------------------
interface NavbarProps {
  logo: React.ReactNode;
  navItems: { label: string; href: string; active?: boolean }[];
  actions?: React.ReactNode;
  className?: string;
}

export function Navbar({ logo, navItems, actions, className }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "glass-panel border-border/20 duration-normal sticky top-0 z-40 w-full border-b px-6 py-3 transition-all",
        className,
      )}
    >
      <div className="max-w-container-max mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">{logo}</div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-1 md:flex">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className={cn(
                "relative rounded-md px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors",
                item.active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/40",
              )}
            >
              {item.label}
              {item.active && (
                <motion.span
                  layoutId="activeNavPill"
                  className="bg-primary/5 border-primary/10 absolute inset-0 -z-10 rounded-md border"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Action Buttons & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 md:flex">{actions}</div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="border-border/30 bg-secondary/20 text-foreground hover:bg-secondary/60 inline-flex h-9 w-9 items-center justify-center rounded-lg border md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="bg-background border-border/20 mt-3 w-full overflow-hidden border-t md:hidden"
          >
            <div className="flex flex-col space-y-3 py-4">
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "border-l-2 px-4 py-2 text-sm font-medium",
                    item.active
                      ? "border-primary text-foreground bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40 border-transparent",
                  )}
                >
                  {item.label}
                </a>
              ))}
              <div className="border-border/20 flex flex-col gap-2 border-t px-4 pt-4">
                {actions}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ----------------------------------------------------
// 2. COLLAPSIBLE SIDEBAR COMPONENT
// ----------------------------------------------------
interface SidebarProps {
  title: string;
  items: { label: string; href: string; icon: React.ReactNode; active?: boolean }[];
  footerProfile?: { name: string; email: string; avatar?: string };
  className?: string;
}

export function Sidebar({ title, items, footerProfile, className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <aside
      className={cn(
        "border-border/20 bg-card text-card-foreground duration-normal ease-premium sticky top-0 z-20 flex h-screen flex-col border-r transition-all",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Title Header */}
      <div className="border-border/20 flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-foreground bg-clip-text text-sm font-extrabold tracking-widest uppercase"
          >
            {title}
          </motion.span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="border-border/60 bg-background text-foreground shadow-premium-sm hover:bg-secondary/60 absolute top-6 -right-3.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border"
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto p-3">
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            className={cn(
              "group relative flex items-center overflow-hidden rounded-lg px-3 py-2.5 text-xs font-medium tracking-wide transition-all",
              item.active
                ? "text-primary-foreground bg-primary shadow-premium-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
            )}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-3 truncate"
              >
                {item.label}
              </motion.span>
            )}

            {/* Tooltip on Collapsed */}
            {collapsed && (
              <div className="bg-foreground text-background absolute left-16 z-50 origin-left scale-0 rounded px-2 py-1 text-[10px] font-semibold transition-all group-hover:scale-100">
                {item.label}
              </div>
            )}
          </a>
        ))}
      </nav>

      {/* Footer Profile & Theme Toggle */}
      <div className="border-border/20 bg-secondary/10 flex flex-col gap-3 border-t p-3">
        {footerProfile && !collapsed && (
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 border-primary/20 text-primary flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold uppercase">
              {footerProfile.name.substring(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate text-xs leading-tight font-bold">
                {footerProfile.name}
              </p>
              <p className="text-muted-foreground truncate text-[10px] leading-tight">
                {footerProfile.email}
              </p>
            </div>
          </div>
        )}

        {/* Theme Toggle */}
        <Button
          variant="glass"
          size="sm"
          className="border-border/10 flex h-8 w-full items-center justify-center gap-2 py-1.5 text-[10px] font-semibold tracking-wider uppercase"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <>
              <Sun className="text-insight h-3.5 w-3.5" />
              {!collapsed && <span>Light Mode</span>}
            </>
          ) : (
            <>
              <Moon className="text-primary h-3.5 w-3.5" />
              {!collapsed && <span>Dark Mode</span>}
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
