"use client";

import React, { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { AnimationProvider } from "./animation-provider";
import { LenisProvider } from "./lenis-provider";
import { CommandPaletteProvider } from "./command-palette-provider";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AnimationProvider>
        <LenisProvider>
          <CommandPaletteProvider>{children}</CommandPaletteProvider>
        </LenisProvider>
      </AnimationProvider>
    </ThemeProvider>
  );
}
export default AppProvider;
