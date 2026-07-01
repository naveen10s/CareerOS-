"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/buttons/button";
import { Card } from "@/components/cards/card";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log crash telemetry in diagnostic console
    console.error("Runtime exception caught by core boundaries:", error);
  }, [error]);

  return (
    <div className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 text-center select-none">
      {/* Visual warning aurora glow */}
      <div className="from-destructive/5 to-warning/5 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent" />
      <div className="bg-destructive/10 pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="z-10 w-full max-w-md space-y-6"
      >
        {/* Core alert block */}
        <div className="space-y-2">
          <div className="bg-destructive/10 border-destructive/20 mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border">
            <AlertCircle className="text-destructive h-6 w-6" />
          </div>
          <h1 className="text-foreground font-mono text-xl font-black tracking-tight">
            KERNEL EXCEPTION DETECTED
          </h1>
          <h2 className="text-muted-foreground text-xs leading-relaxed">
            The workspace core crashed due to an unhandled runtime error state.
          </h2>
        </div>

        {/* Runtime Diagnostics Details */}
        <Card
          variant="solid"
          className="bg-destructive/5 border-destructive/10 space-y-2.5 p-4 text-left font-mono text-[9px]"
        >
          <div className="border-destructive/10 text-destructive flex items-center gap-1.5 border-b pb-2">
            <span className="bg-destructive h-2.5 w-2.5 animate-pulse rounded-full" />
            <span className="font-bold tracking-wider uppercase">Exception Trace Logs</span>
          </div>

          <div className="text-foreground/80 space-y-1 leading-normal select-all">
            <p className="text-destructive font-bold">
              Error: {error.message || "Unknown error details"}
            </p>
            {error.digest && (
              <p className="text-muted-foreground/80">Diagnostic Digest Code: {error.digest}</p>
            )}
            <p className="text-muted-foreground/60 mt-2 text-[8px]">
              Trace Location: app-router-segment-boundary
            </p>
          </div>
        </Card>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="default"
            size="sm"
            onClick={() => reset()}
            leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
          >
            Restart Session
          </Button>
          <a href="/">
            <Button variant="outline" size="sm" leftIcon={<Home className="h-3.5 w-3.5" />}>
              Return Home
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
