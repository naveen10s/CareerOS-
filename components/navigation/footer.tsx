"use client";

import React from "react";
import { Activity, ShieldCheck, Cpu } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border/40 bg-card/40 relative z-20 w-full border-t px-6 py-4 backdrop-blur-sm select-none md:px-8">
      <div className="max-w-container-max text-muted-foreground mx-auto flex flex-col items-center justify-between gap-4 font-mono text-[10px] tracking-wider uppercase md:flex-row">
        {/* Left Side: System status indicators */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-success relative inline-flex h-2 w-2 rounded-full" />
            </span>
            <span>SYSTEM: OPERATIONAL</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="text-primary h-3.5 w-3.5" />
            <span>TELEMETRY: ACTIVE (100% SYNC)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="text-info h-3.5 w-3.5" />
            <span>API RESPONSE: 12MS</span>
          </div>
        </div>

        {/* Right Side: Copyright info */}
        <div className="text-center md:text-right">
          <span>&copy; {currentYear} CAREEROS. ALL RIGHTS OPERATIONAL.</span>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
