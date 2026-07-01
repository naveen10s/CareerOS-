"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rss, Search, Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Badge } from "@/components/ui/badges";
import { Button } from "@/components/buttons/button";
import { cn } from "@/lib/utils";
import blogData from "@/data/blog.json";

export default function BlogEnginePage() {
  const articles = blogData.example;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const list = new Set(articles.map((a) => a.category));
    return ["All", ...Array.from(list)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchesSearch =
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === "All" || a.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [articles, searchTerm, selectedCategory]);

  const featured = useMemo(() => articles.find((a) => a.featured), [articles]);

  return (
    <DashboardLayout>
      <div className="max-w-container-max mx-auto w-full space-y-8 p-6 pb-24 md:p-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start gap-3"
        >
          <div className="bg-primary/10 border-primary/20 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border">
            <Rss className="text-primary h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-mono text-[9px] tracking-widest uppercase">
                Thoughts & Frameworks
              </span>
              <span className="bg-primary/20 h-px w-8" />
              <span className="text-muted-foreground font-mono text-[9px]">
                Product Engine Logs
              </span>
            </div>
            <h1 className="text-foreground text-2xl font-extrabold tracking-tight">Blog Engine</h1>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Insights, guides, telemetry frameworks, and transitions mappings from operations to
              PM.
            </p>
          </div>
        </motion.div>

        {/* Featured Post Card */}
        {featured && selectedCategory === "All" && searchTerm === "" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card variant="glow" className="group overflow-hidden">
              <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                {/* Visual mesh design banner instead of placeholder image */}
                <div className="border-border/10 group-hover:border-primary/20 relative flex min-h-48 items-center justify-center overflow-hidden rounded-lg border bg-gradient-to-br from-violet-600/30 via-indigo-600/20 to-teal-500/20 p-6 transition-colors">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_100%)]" />
                  <div className="z-10 space-y-2 text-center">
                    <BookOpen className="text-primary mx-auto h-10 w-10 opacity-80 transition-transform group-hover:scale-105" />
                    <span className="text-muted-foreground block font-mono text-[8px] tracking-widest uppercase">
                      FEATURED ARTICLE
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="font-mono text-[8px]">
                        {featured.category}
                      </Badge>
                      <span className="text-muted-foreground flex items-center gap-1 font-mono text-[9px]">
                        <Clock className="h-3 w-3" /> {featured.readingTime}
                      </span>
                    </div>
                    <h2 className="text-foreground group-hover:text-primary text-lg font-extrabold transition-colors md:text-xl">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground line-clamp-3 text-xs leading-relaxed">
                      {featured.content}
                    </p>
                  </div>

                  <a href={`/blog/${featured.slug}`} className="inline-flex">
                    <Button
                      variant="default"
                      size="sm"
                      rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                    >
                      Read Full Article
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Filter Toolbar */}
        <div className="bg-secondary/15 border-border/10 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-background/40 border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 w-full rounded-lg border py-2 pr-4 pl-9 text-xs outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "cursor-pointer rounded-lg border px-2.5 py-1.5 font-mono text-[9px] uppercase transition-all",
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "text-muted-foreground border-border/20 hover:border-border/50 hover:text-foreground bg-transparent",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((art, idx) => (
              <motion.div
                key={art.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <a href={`/blog/${art.slug}`} className="group block h-full">
                  <Card
                    variant="solid"
                    className="hover:border-primary/20 flex h-full flex-col justify-between p-5 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Badge variant="outline" className="font-mono text-[8px]">
                          {art.category}
                        </Badge>
                        <span className="text-muted-foreground flex items-center gap-1 font-mono text-[8px]">
                          <Clock className="h-3 w-3" /> {art.readingTime}
                        </span>
                      </div>
                      <h3 className="text-foreground group-hover:text-primary line-clamp-2 text-xs leading-snug font-bold transition-colors">
                        {art.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3 text-[10px] leading-relaxed">
                        {art.content}
                      </p>
                    </div>

                    <div className="border-border/10 mt-4 flex items-center justify-between border-t pt-3">
                      <span className="text-muted-foreground flex items-center gap-1 font-mono text-[8px]">
                        <Calendar className="h-2.5 w-2.5" /> {art.date}
                      </span>
                      <span className="text-primary flex items-center gap-0.5 font-mono text-[8px] font-bold tracking-wider uppercase transition-transform group-hover:translate-x-0.5">
                        READ MORE <ArrowRight className="h-2.5 w-2.5" />
                      </span>
                    </div>
                  </Card>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredArticles.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <BookOpen className="text-muted-foreground/40 mx-auto h-10 w-10" />
              <h3 className="text-foreground mt-2 text-xs font-bold">No articles found</h3>
              <p className="text-muted-foreground text-[10px]">
                Try resetting search query filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
