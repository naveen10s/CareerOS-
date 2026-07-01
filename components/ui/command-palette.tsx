"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Terminal, Plus, FileText, Settings, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CommandItem {
  icon: React.ReactNode;
  label: string;
  category: string;
  action: () => void;
}

import { useCommandPalette } from "@/providers/command-palette-provider";

export function CommandPalette() {
  const { isOpen, setIsOpen } = useCommandPalette();
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: CommandItem[] = [
    {
      icon: <User className="h-4 w-4" />,
      label: "View Profile Data",
      category: "Account",
      action: () => alert("Viewing profile..."),
    },
    {
      icon: <Plus className="h-4 w-4" />,
      label: "Add New Product Case Study",
      category: "Actions",
      action: () => alert("Adding case study..."),
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "Export Resumé to PDF",
      category: "Actions",
      action: () => alert("Exporting Resumé..."),
    },
    {
      icon: <Terminal className="h-4 w-4" />,
      label: "Open System Log Diagnostics",
      category: "Developer",
      action: () => alert("Opening logs..."),
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: "Open Settings",
      category: "Account",
      action: () => alert("Opening settings..."),
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase()),
  );

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
      if (!isOpen) return;

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

  return (
    <>
      {/* Floating Indicator */}
      <button
        onClick={() => setIsOpen(true)}
        className="border-border/40 bg-card shadow-premium-md hover:bg-secondary fixed right-6 bottom-6 z-40 flex cursor-pointer items-center justify-center gap-2 rounded-full border px-4 py-2 font-mono text-xs font-bold transition-colors select-none"
      >
        <kbd className="border-border bg-secondary/80 text-muted-foreground rounded border px-1.5 py-0.5 text-[10px]">
          Ctrl+K
        </kbd>
        <span className="text-foreground">Command Bar</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh]">
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
                  placeholder="Type a command or search metrics..."
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
                          <span>{cmd.label}</span>
                        </span>
                        <span
                          className={cn(
                            "rounded border px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider uppercase",
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
