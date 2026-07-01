"use client";

import React, { useState, useMemo, useRef } from "react";
import { TrendingUp, Sparkles, MapPin, Calendar, Layers, Search, ChevronDown } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  TimelineFilter,
  TimelineLegend,
  TimelineToolbar,
  TimelineCard,
  TimelineNode,
} from "@/components/timeline/timeline-elements";
import { Badge } from "@/components/ui/badges";

// Import raw JSON data directly
import timelineData from "@/data/timeline.json";

export default function JourneyPage() {
  const rawItems = timelineData.example;

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);

  // Hook scroll settings to animate central path line height on page scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  // Extract unique categories for filter row
  const categories = useMemo(() => {
    const cats = rawItems.map((item) => item.category);
    return Array.from(new Set(cats));
  }, [rawItems]);

  // Filter & search logic
  const filteredItems = useMemo(() => {
    return rawItems.filter((item) => {
      const matchesFilter = activeFilter === "all" || item.category === activeFilter;
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.skills.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.technologies.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [rawItems, activeFilter, searchQuery]);

  // Expansion triggers
  const handleToggleCard = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isAllExpanded = useMemo(() => {
    return filteredItems.every((item) => !!expandedItems[item.id]);
  }, [filteredItems, expandedItems]);

  const handleToggleExpandAll = () => {
    if (isAllExpanded) {
      setExpandedItems({});
    } else {
      const next: Record<string, boolean> = {};
      filteredItems.forEach((item) => {
        next[item.id] = true;
      });
      setExpandedItems(next);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-container-max mx-auto w-full flex-1 space-y-8 p-6 pb-28 md:p-8">
        {/* Header section */}
        <section className="border-border/20 space-y-4 border-b pb-6">
          <div className="space-y-1.5">
            <div className="text-primary flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase">
              <TrendingUp className="h-3.5 w-3.5" />
              Career Journey Map
            </div>
            <h1 className="text-foreground text-4xl font-extrabold tracking-tight">
              Transition Vector
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
              Interactive timeline mapping capabilities growth and telemetry milestones from
              Business Analyst into Product Management.
            </p>
          </div>
        </section>

        {/* Toolbar & Filters Stack */}
        <section className="space-y-4">
          <TimelineToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isAllExpanded={isAllExpanded}
            onToggleExpandAll={handleToggleExpandAll}
          />
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <TimelineFilter
              activeFilter={activeFilter}
              onChange={setActiveFilter}
              categories={categories}
            />
          </div>
          <TimelineLegend />
        </section>

        {/* Timeline Path Workspace */}
        <section ref={containerRef} className="relative mt-6 min-h-[400px] overflow-hidden py-10">
          {/* Alternating layout central line elements */}
          {/* Base background line */}
          <div className="bg-border/25 absolute top-0 bottom-0 left-4 z-0 w-0.5 -translate-x-1/2 md:left-1/2" />

          {/* Animated scroll-reactive path line */}
          <motion.div
            style={{ scaleY }}
            className="from-primary via-success to-warning absolute top-0 bottom-0 left-4 z-0 w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b md:left-1/2"
          />

          {filteredItems.length === 0 ? (
            <div className="text-muted-foreground py-20 text-center font-mono text-xs">
              NO TIMELINE ENTRIES MATCHING ACTIVE QUERY FILTERS.
            </div>
          ) : (
            <div className="space-y-12">
              {filteredItems.map((item, idx) => {
                const isEven = idx % 2 === 0;
                const isExpanded = !!expandedItems[item.id];

                return (
                  <div
                    key={item.id}
                    className="relative flex flex-col items-stretch md:flex-row md:items-center"
                  >
                    {/* Left node (for Desktop desktop layout) */}
                    <div className="hidden w-1/2 pr-12 text-right md:block">
                      {isEven && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.4 }}
                        >
                          <TimelineCard
                            item={item}
                            isExpanded={isExpanded}
                            onToggle={() => handleToggleCard(item.id)}
                          />
                        </motion.div>
                      )}
                    </div>

                    {/* Timeline Node Bullet (aligned dynamically) */}
                    <div className="absolute left-0 z-20 -translate-x-1/2 md:left-1/2">
                      <TimelineNode status={item.status} milestone={item.milestone} />
                    </div>

                    {/* Right node */}
                    <div className="w-full pl-10 text-left md:w-1/2 md:pl-12">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.4 }}
                        className={cn(isEven ? "md:hidden" : "block")}
                      >
                        <TimelineCard
                          item={item}
                          isExpanded={isExpanded}
                          onToggle={() => handleToggleCard(item.id)}
                        />
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
