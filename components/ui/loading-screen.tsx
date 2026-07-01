"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const bootLogs = [
    "CareerOS",
    "Initializing...",
    "Loading Career Intelligence...",
    "Loading Experience...",
    "Loading Projects...",
    "Ready.",
  ];

  useEffect(() => {
    // 1. Progress counter interval
    const duration = 2000; // 2 seconds total load
    const intervalTime = 40;
    const steps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min(100, Math.floor((step / steps) * 100));
      setProgress(currentProgress);

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 350); // Small pause at 100%
      }
    }, intervalTime);

    // 2. Incremental logs display
    const timeouts: any[] = [];
    const logInterval = duration / bootLogs.length;
    bootLogs.forEach((log, index) => {
      const t = setTimeout(() => {
        setLogs((prev) => [...prev, log]);
      }, index * logInterval);
      timeouts.push(t);
    });

    return () => {
      clearInterval(timer);
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.65 }}
      className="bg-background text-foreground fixed inset-0 z-50 flex flex-col items-center justify-center p-6 select-none"
    >
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* Terminal Boot title */}
        <div className="border-border/20 flex items-center gap-3 border-b pb-4">
          <Terminal className="text-primary h-5 w-5 animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-wider uppercase">
            CareerOS v2.0.0
          </span>
        </div>

        {/* Incrementing Terminal logs list */}
        <div className="text-muted-foreground flex h-32 flex-col gap-1.5 overflow-hidden font-mono text-[10px]">
          {logs.map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-start gap-1"
            >
              <span className="text-primary font-extrabold">&gt;</span>
              <span>{log}</span>
            </motion.div>
          ))}
        </div>

        {/* Progress percent display and bar */}
        <div className="space-y-2 pt-2">
          <div className="text-muted-foreground flex items-center justify-between font-mono text-[10px]">
            <span>CORE BOOTSTRAP PROGRESS</span>
            <span className="text-foreground font-bold">{progress}%</span>
          </div>
          <div className="bg-secondary/80 border-border/10 relative h-1.5 w-full overflow-hidden rounded-full border">
            <motion.div
              className="bg-primary h-full rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default LoadingScreen;
