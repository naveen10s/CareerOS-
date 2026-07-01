"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  className?: string;
}

export function Breadcrumb({ className }: BreadcrumbProps) {
  const pathname = usePathname();

  // Split pathname into clean segments
  const segments = pathname.split("/").filter((s) => s !== "");

  // Format label from URL slug (e.g. "product-lab" -> "Product Lab")
  const formatLabel = (slug: string) => {
    return slug
      .replace(/-([a-z])/g, (g) => ` ${g[1].toUpperCase()}`)
      .replace(/^[a-z]/, (val) => val.toUpperCase());
  };

  return (
    <nav
      aria-label="Breadcrumb navigation"
      className={cn(
        "text-muted-foreground flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase select-none",
        className,
      )}
    >
      {/* Root Home node */}
      <Link href="/" className="hover:text-foreground flex items-center gap-1 transition-colors">
        <Home className="h-3 w-3" />
        <span>HOME</span>
      </Link>

      {/* Dynamic Segments */}
      {segments.map((segment, idx) => {
        const url = `/${segments.slice(0, idx + 1).join("/")}`;
        const isLast = idx === segments.length - 1;
        const label = formatLabel(segment);

        return (
          <React.Fragment key={url}>
            <ChevronRight className="text-muted-foreground/60 h-3 w-3 shrink-0" />
            {isLast ? (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-foreground font-bold"
                aria-current="page"
              >
                {label}
              </motion.span>
            ) : (
              <Link href={url} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
export default Breadcrumb;
