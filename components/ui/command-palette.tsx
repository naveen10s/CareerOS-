"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  Terminal,
  FileText,
  Settings,
  User,
  Compass,
  Cpu,
  Globe,
  Rss,
  Home,
  Activity,
  TrendingUp,
  Briefcase,
  FolderGit,
  Code2,
  Layers,
  BookOpen,
  Mail,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useCommandPalette } from "@/providers/command-palette-provider";

// Import datasets for search index
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import experienceData from "@/data/experience.json";
import learningData from "@/data/learning.json";
import blogData from "@/data/blog.json";

interface CommandItem {
  icon: React.ReactNode;
  label: string;
  category: string;
  action: () => void;
}

export function CommandPalette() {
  const { isOpen, setIsOpen } = useCommandPalette();
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setTheme } = useTheme();

  // 1. Base command list (Navigation and Theme Actions)
  const baseCommands: CommandItem[] = useMemo(() => {
    return [
      {
        icon: <Home className="h-4 w-4" />,
        label: "Go to Home page",
        category: "Navigation",
        action: () => router.push("/"),
      },
      {
        icon: <Activity className="h-4 w-4" />,
        label: "Go to Career Dashboard",
        category: "Navigation",
        action: () => router.push("/dashboard"),
      },
      {
        icon: <TrendingUp className="h-4 w-4" />,
        label: "Go to Career Journey Timeline",
        category: "Navigation",
        action: () => router.push("/journey"),
      },
      {
        icon: <Briefcase className="h-4 w-4" />,
        label: "Go to Experience / Work History",
        category: "Navigation",
        action: () => router.push("/experience"),
      },
      {
        icon: <FolderGit className="h-4 w-4" />,
        label: "Go to Projects List",
        category: "Navigation",
        action: () => router.push("/projects"),
      },
      {
        icon: <Code2 className="h-4 w-4" />,
        label: "Go to Product Case Study Lab",
        category: "Navigation",
        action: () => router.push("/product-lab"),
      },
      {
        icon: <Layers className="h-4 w-4" />,
        label: "Go to Impact Analytics Dashboard",
        category: "Navigation",
        action: () => router.push("/analytics"),
      },
      {
        icon: <BookOpen className="h-4 w-4" />,
        label: "Go to Learning Hub",
        category: "Navigation",
        action: () => router.push("/learning"),
      },
      {
        icon: <Cpu className="h-4 w-4" />,
        label: "Go to AI Workspace",
        category: "Navigation",
        action: () => router.push("/ai-workspace"),
      },
      {
        icon: <Globe className="h-4 w-4" />,
        label: "Go to LinkedIn Center",
        category: "Navigation",
        action: () => router.push("/linkedin"),
      },
      {
        icon: <Rss className="h-4 w-4" />,
        label: "Go to Blog Engine",
        category: "Navigation",
        action: () => router.push("/blog"),
      },
      {
        icon: <FileText className="h-4 w-4" />,
        label: "Go to Resume Spec Sheet",
        category: "Navigation",
        action: () => router.push("/resume"),
      },
      {
        icon: <Mail className="h-4 w-4" />,
        label: "Go to Contact Hub & Availability",
        category: "Navigation",
        action: () => router.push("/contact"),
      },
      {
        icon: <Sun className="h-4 w-4" />,
        label: "Switch Theme: Light",
        category: "Theme",
        action: () => setTheme("light"),
      },
      {
        icon: <Moon className="h-4 w-4" />,
        label: "Switch Theme: Dark",
        category: "Theme",
        action: () => setTheme("dark"),
      },
      {
        icon: <Monitor className="h-4 w-4" />,
        label: "Switch Theme: System Default",
        category: "Theme",
        action: () => setTheme("system"),
      },
    ];
  }, [router, setTheme]);

  // 2. Compute search index results dynamically based on database JSON matches
  const searchResults = useMemo(() => {
    if (!search.trim()) return [];

    const query = search.toLowerCase();
    const results: CommandItem[] = [];

    // Search Projects
    projectsData.example.forEach((p) => {
      if (
        p.title.toLowerCase().includes(query) ||
        p.problem.toLowerCase().includes(query) ||
        p.role.toLowerCase().includes(query)
      ) {
        results.push({
          icon: <Code2 className="text-primary h-4 w-4" />,
          label: `Project: ${p.title} (${p.category})`,
          category: "Project Case Studies",
          action: () => router.push(`/product-lab?slug=${p.slug}`),
        });
      }
    });

    // Search Skills
    const pmSkills = skillsData.example.productManagement || [];
    const baSkills = skillsData.example.businessAnalysis || [];
    const techSkills = skillsData.example.technical || [];

    [...pmSkills, ...baSkills, ...techSkills].forEach((s: any) => {
      if (
        s.name.toLowerCase().includes(query) ||
        (s.description && s.description.toLowerCase().includes(query))
      ) {
        results.push({
          icon: <Settings className="text-warning h-4 w-4" />,
          label: `Skill: ${s.name} (Level ${s.level}/5)`,
          category: "Skills Inventory",
          action: () => router.push("/skills"),
        });
      }
    });

    // Search Experience
    experienceData.example.forEach((exp) => {
      if (
        exp.role.toLowerCase().includes(query) ||
        exp.company.toLowerCase().includes(query) ||
        exp.responsibilities.some((r) => r.toLowerCase().includes(query))
      ) {
        results.push({
          icon: <Briefcase className="text-info h-4 w-4" />,
          label: `Experience: ${exp.role} at ${exp.company}`,
          category: "Work Experience",
          action: () => router.push("/experience"),
        });
      }
    });

    // Search Learning Hub
    learningData.example.forEach((l) => {
      if (l.topic.toLowerCase().includes(query) || l.relevance.toLowerCase().includes(query)) {
        results.push({
          icon: <BookOpen className="text-success h-4 w-4" />,
          label: `Learning: ${l.topic} (${l.platform})`,
          category: "Knowledge Layer",
          action: () => router.push("/learning"),
        });
      }
    });

    // Search Blog posts
    blogData.example.forEach((art) => {
      if (art.title.toLowerCase().includes(query) || art.content.toLowerCase().includes(query)) {
        results.push({
          icon: <Rss className="text-primary h-4 w-4" />,
          label: `Blog: ${art.title}`,
          category: "Thoughts & Strategy",
          action: () => router.push(`/blog/${art.slug}`),
        });
      }
    });

    return results;
  }, [search, router]);

  // Combine commands
  const filteredCommands = useMemo(() => {
    if (!search.trim()) {
      return baseCommands;
    }
    // Filter baseCommands (e.g. Navigation) first, then append search results
    const matchingBase = baseCommands.filter((cmd) =>
      cmd.label.toLowerCase().includes(search.toLowerCase()),
    );
    return [...matchingBase, ...searchResults];
  }, [baseCommands, searchResults, search]);

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  // Keyboard navigation through list items
  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
      if (!isOpen || filteredCommands.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[activeIndex]) {
          filteredCommands[activeIndex].action();
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleNavigation);
    return () => window.removeEventListener("keydown", handleNavigation);
  }, [isOpen, activeIndex, filteredCommands]);

  // Reset active item on search change
  useEffect(() => {
    setActiveIndex(0);
  }, [search]);

  // Scroll active element into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  return (
    <>
      {/* Floating Indicator */}
      <button
        onClick={() => setIsOpen(true)}
        className="border-border/40 bg-card shadow-premium-md hover:bg-secondary no-print fixed right-6 bottom-6 z-40 flex cursor-pointer items-center justify-center gap-2 rounded-full border px-4 py-2 font-mono text-xs font-bold transition-colors select-none"
      >
        <kbd className="border-border bg-secondary/80 text-muted-foreground rounded border px-1.5 py-0.5 text-[10px]">
          Ctrl+K
        </kbd>
        <span className="text-foreground">Command Bar</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="no-print fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh]">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="bg-background/60 absolute inset-0 backdrop-blur-sm"
            />

            {/* Floating Palette Body */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-card/95 border-border/40 shadow-premium-lg relative z-10 flex w-full max-w-lg flex-col gap-2 overflow-hidden rounded-xl border p-2"
            >
              {/* Search Field */}
              <div className="border-border/20 relative flex items-center border-b px-3 pt-1 pb-2">
                <Search className="text-muted-foreground mr-2 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search workspace (e.g. projects, skills, resume, blog)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="text-foreground placeholder:text-muted-foreground w-full border-0 bg-transparent text-xs outline-none focus:ring-0"
                  autoFocus
                />
              </div>

              {/* List items */}
              <div ref={listRef} className="max-h-72 space-y-1 overflow-y-auto p-1.5">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          cmd.action();
                          setIsOpen(false);
                        }}
                        className={cn(
                          "relative flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors select-none",
                          isActive
                            ? "text-primary-foreground bg-primary"
                            : "text-foreground hover:bg-secondary/40",
                        )}
                      >
                        <span className="flex items-center gap-3">
                          {cmd.icon}
                          <span className="max-w-[280px] truncate">{cmd.label}</span>
                        </span>
                        <span
                          className={cn(
                            "shrink-0 rounded border px-1.5 py-0.5 font-mono text-[8px] font-bold tracking-wider uppercase",
                            isActive
                              ? "border-white/25 bg-white/20 text-white"
                              : "bg-secondary border-border text-muted-foreground",
                          )}
                        >
                          {cmd.category}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <p className="text-muted-foreground py-8 text-center text-xs">
                    No results match your search.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
export default CommandPalette;
