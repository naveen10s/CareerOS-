"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Home,
  Activity,
  TrendingUp,
  Briefcase,
  FolderGit,
  Code2,
  Layers,
  BookOpen,
  FileText,
  Mail,
  Search,
  Bell,
  Settings,
  Cpu,
  Rss,
  Globe,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Sidebar, Navbar } from "@/components/navigation/nav-elements";
import { FloatingDock } from "@/components/navigation/floating-dock";
import { Footer } from "@/components/navigation/footer";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { AuroraBackground, AnimatedGrid, NoiseTexture } from "@/components/ui/background-effects";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { RouteTransition } from "@/components/animations/route-transition";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { Button } from "@/components/buttons/button";
import { MouseFollower } from "@/components/animations/motion";
import { CommandPalette } from "@/components/ui/command-palette";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Load state check to prevent loading screens on every internal navigation click
  useEffect(() => {
    const hasBooted = sessionStorage.getItem("career-os-booted");
    if (hasBooted) {
      setLoading(false);
    }
  }, []);

  const handleLoadingComplete = useCallback(() => {
    sessionStorage.setItem("career-os-booted", "true");
    setLoading(false);
  }, []);

  const sidebarLinks = [
    { label: "Home", href: "/", icon: <Home className="h-4 w-4" />, active: pathname === "/" },
    {
      label: "Career Dashboard",
      href: "/dashboard",
      icon: <Activity className="h-4 w-4" />,
      active: pathname === "/dashboard",
    },
    {
      label: "Journey",
      href: "/journey",
      icon: <TrendingUp className="h-4 w-4" />,
      active: pathname === "/journey",
    },
    {
      label: "Experience",
      href: "/experience",
      icon: <Briefcase className="h-4 w-4" />,
      active: pathname === "/experience",
    },
    {
      label: "Projects",
      href: "/projects",
      icon: <FolderGit className="h-4 w-4" />,
      active: pathname === "/projects",
    },
    {
      label: "Product Lab",
      href: "/product-lab",
      icon: <Code2 className="h-4 w-4" />,
      active: pathname === "/product-lab",
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: <Layers className="h-4 w-4" />,
      active: pathname === "/analytics",
    },
    {
      label: "Learning",
      href: "/learning",
      icon: <BookOpen className="h-4 w-4" />,
      active: pathname === "/learning",
    },
    {
      label: "AI Workspace",
      href: "/ai-workspace",
      icon: <Cpu className="h-4 w-4" />,
      active: pathname === "/ai-workspace",
    },
    {
      label: "LinkedIn Center",
      href: "/linkedin",
      icon: <Globe className="h-4 w-4" />,
      active: pathname === "/linkedin",
    },
    {
      label: "Blog Engine",
      href: "/blog",
      icon: <Rss className="h-4 w-4" />,
      active: pathname === "/blog",
    },
    {
      label: "Resume",
      href: "/resume",
      icon: <FileText className="h-4 w-4" />,
      active: pathname === "/resume",
    },
    {
      label: "Contact",
      href: "/contact",
      icon: <Mail className="h-4 w-4" />,
      active: pathname === "/contact",
    },
  ];

  const headerNav = [
    { label: "System Core", href: "/", active: true },
    { label: "Analytics", href: "/analytics" },
    { label: "Product Lab", href: "/product-lab" },
  ];

  const dockItems = [
    { icon: <Home className="h-5 w-5" />, label: "Home", href: "/" },
    { icon: <Activity className="h-5 w-5" />, label: "Dashboard", href: "/dashboard" },
    { icon: <TrendingUp className="h-5 w-5" />, label: "Journey", href: "/journey" },
    { icon: <FolderGit className="h-5 w-5" />, label: "Projects", href: "/projects" },
  ];

  return (
    <div className="bg-background relative min-h-screen">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="boot-loader" onComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            key="workspace-root"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-background text-foreground flex min-h-screen"
          >
            {/* Tactile mouse follower dot */}
            <MouseFollower />

            {/* Keyboard Command Bar Overlay */}
            <CommandPalette />

            {/* Global backgrounds & noise */}
            <NoiseTexture />
            <AuroraBackground />
            <AnimatedGrid />

            {/* Collapsible Sidebar */}
            <Sidebar
              title="CareerOS"
              items={sidebarLinks}
              footerProfile={{ name: "Alex Mercer", email: "alex@careeros.dev" }}
            />

            {/* Main Content Pane */}
            <div className="relative z-10 flex min-h-screen flex-1 flex-col p-4">
              {/* Top Sticky Header */}
              <Navbar
                logo={
                  <div className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground shadow-premium-sm flex h-5 w-5 items-center justify-center rounded font-mono text-[10px] font-extrabold">
                      C
                    </span>
                    <span className="text-foreground font-mono text-xs font-extrabold tracking-wide uppercase">
                      CareerOS Workspace
                    </span>
                  </div>
                }
                navItems={headerNav}
                actions={
                  <>
                    <ThemeSwitch />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="border-border/10 h-8.5 w-8.5 rounded-lg border"
                    >
                      <Bell className="text-muted-foreground h-4 w-4" />
                    </Button>
                  </>
                }
              />

              {/* Scrollable Workspaces */}
              <div className="flex flex-1 flex-col justify-between">
                <main
                  id="main-content"
                  tabIndex={-1}
                  className="flex w-full flex-1 flex-col outline-none"
                >
                  {/* Global Page Breadcrumb Header */}
                  <div className="px-6 pt-6 md:px-8">
                    <Breadcrumb />
                  </div>

                  <RouteTransition>{children}</RouteTransition>
                </main>

                {/* Technical status footer */}
                <Footer />
              </div>
            </div>

            {/* Apple style mouse Proximity Dock Navigation */}
            <FloatingDock items={dockItems} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default DashboardLayout;
