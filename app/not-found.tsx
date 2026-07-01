"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Home, ArrowLeft, RefreshCw, Command } from "lucide-react";
import { Button } from "@/components/buttons/button";
import { Card } from "@/components/cards/card";
import { ThemeProvider } from "next-themes";

export default function NotFoundPage() {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "System Diagnostics: Route mismatch detected.",
    "Type 'help' to query system core registry or navigate using CTA controls below.",
  ]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = "";
    switch (cmd) {
      case "help":
        response = "Available targets: home, resume, projects, learning, ai-workspace";
        break;
      case "home":
        window.location.href = "/";
        response = "Routing to system core / ...";
        break;
      case "resume":
        window.location.href = "/resume";
        response = "Routing to resume registry...";
        break;
      case "projects":
        window.location.href = "/projects";
        response = "Routing to product case study lab...";
        break;
      case "learning":
        window.location.href = "/learning";
        response = "Routing to learning hub...";
        break;
      case "ai-workspace":
        window.location.href = "/ai-workspace";
        response = "Routing to operations workspace...";
        break;
      default:
        response = `Error: unknown target command '${cmd}'. Type 'help' for targets registry.`;
    }

    setTerminalLogs((prev) => [...prev, `> ${terminalInput}`, response]);
    setTerminalInput("");
  };

  return (
    <div className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 text-center select-none">
      {/* Aurora glow effect background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-teal-500/5" />
      <div className="bg-primary/10 pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="z-10 w-full max-w-md space-y-6"
      >
        {/* Visual 404 block */}
        <div className="space-y-2">
          <div className="bg-primary/10 border-primary/20 mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border">
            <Command className="text-primary h-6 w-6 animate-pulse" />
          </div>
          <h1 className="text-foreground font-mono text-5xl font-black tracking-tighter">404</h1>
          <h2 className="text-foreground text-sm font-bold tracking-tight">
            PAGE REGISTRY NOT FOUND
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xs text-[10px]">
            The target layout path does not exist in the CareerOS workspace registry.
          </p>
        </div>

        {/* Terminal Widget Mock */}
        <Card
          variant="solid"
          className="bg-secondary/30 border-border/10 space-y-3 p-4 text-left font-mono text-[9px]"
        >
          <div className="border-border/10 flex items-center gap-1.5 border-b pb-2">
            <span className="bg-destructive/60 h-2 w-2 rounded-full" />
            <span className="bg-warning/60 h-2 w-2 rounded-full" />
            <span className="bg-success/60 h-2 w-2 rounded-full" />
            <span className="text-muted-foreground ml-auto text-[8px] uppercase">
              diagnostics.sh
            </span>
          </div>

          <div className="text-muted-foreground max-h-32 space-y-1.5 overflow-y-auto">
            {terminalLogs.map((log, i) => (
              <div
                key={i}
                className={log.startsWith(">") ? "text-primary font-bold" : "text-muted-foreground"}
              >
                {log}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleCommandSubmit}
            className="border-border/5 flex items-center gap-2 border-t pt-2"
          >
            <span className="text-primary shrink-0 font-bold">$</span>
            <input
              type="text"
              placeholder="Query terminal command..."
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              className="text-foreground placeholder:text-muted-foreground/50 w-full border-0 bg-transparent p-0 font-mono text-[9px] outline-none focus:ring-0"
            />
          </form>
        </Card>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3">
          <a href="/">
            <Button variant="default" size="sm" leftIcon={<Home className="h-3.5 w-3.5" />}>
              Return Home
            </Button>
          </a>
          <button
            onClick={() => window.history.back()}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border/50 flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 font-mono text-[10px] tracking-wider uppercase"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
