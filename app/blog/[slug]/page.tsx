"use client";

import React, { use } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Rss, BookOpen, Share2 } from "lucide-react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardContent } from "@/components/cards/card";
import { Badge } from "@/components/ui/badges";
import { Button } from "@/components/buttons/button";
import blogData from "@/data/blog.json";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const article = blogData.example.find((a) => a.slug === slug);

  if (!article) {
    return (
      <DashboardLayout>
        <div className="max-w-container-max mx-auto w-full p-6 py-24 text-center">
          <BookOpen className="text-muted-foreground/40 mx-auto h-12 w-12" />
          <h2 className="text-foreground mt-4 text-lg font-extrabold">Article Not Found</h2>
          <p className="text-muted-foreground mt-1 text-xs">
            The article you are looking for does not exist or has been archived.
          </p>
          <a href="/blog" className="mt-6 inline-block">
            <Button variant="default" size="sm">
              Back to Blog
            </Button>
          </a>
        </div>
      </DashboardLayout>
    );
  }

  // Render markdown content using simple regex logic (safe & dependency-free)
  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      // Code blocks
      if (part.startsWith("```")) {
        const lines = part.split("\n");
        const lang = lines[0].replace("```", "").trim();
        const code = lines.slice(1, -1).join("\n");

        return (
          <div
            key={index}
            className="border-border/10 bg-secondary/50 my-5 overflow-hidden rounded-lg border font-mono text-[10px]"
          >
            <div className="bg-secondary border-border/10 text-muted-foreground flex items-center justify-between border-b px-4 py-1.5 select-none">
              <span className="text-[8px] font-bold tracking-widest uppercase">
                {lang || "code"}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(code)}
                className="hover:text-foreground text-[8px] font-bold uppercase transition-colors"
              >
                Copy
              </button>
            </div>
            <pre className="text-foreground/90 overflow-x-auto p-4 leading-normal select-all">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Standard text parsing (paragraphs and headings)
      return part.split("\n\n").map((para, pIdx) => {
        const cleanText = para.trim();
        if (!cleanText) return null;

        // Headings (###)
        if (cleanText.startsWith("###")) {
          return (
            <h3
              key={`${index}-${pIdx}`}
              className="text-foreground mt-6 mb-2 text-xs font-extrabold tracking-tight md:text-sm"
            >
              {cleanText.replace("###", "").trim()}
            </h3>
          );
        }

        // Bullet lists
        if (cleanText.startsWith("-")) {
          const listItems = cleanText.split("\n");
          return (
            <ul
              key={`${index}-${pIdx}`}
              className="text-muted-foreground my-3 list-disc space-y-1 pl-5 text-[11px] leading-relaxed"
            >
              {listItems.map((li, lIdx) => (
                <li key={lIdx}>{li.replace("-", "").trim()}</li>
              ))}
            </ul>
          );
        }

        // Inline Bold formatting (**bold**)
        const formattedPara = cleanText.split(/(\*\*.*?\*\*)/g).map((word, wIdx) => {
          if (word.startsWith("**") && word.endsWith("**")) {
            return (
              <strong key={wIdx} className="text-foreground font-extrabold">
                {word.slice(2, -2)}
              </strong>
            );
          }
          return word;
        });

        // Default Paragraph
        return (
          <p
            key={`${index}-${pIdx}`}
            className="text-muted-foreground my-3 text-[11px] leading-relaxed"
          >
            {formattedPara}
          </p>
        );
      });
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.content.substring(0, 100) + "...",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-container-max mx-auto w-full space-y-8 p-6 pb-24 md:p-8">
        {/* Navigation Toolbar */}
        <div className="no-print flex items-center justify-between">
          <a href="/blog">
            <Button variant="ghost" size="xs" leftIcon={<ArrowLeft className="h-3 w-3" />}>
              Back to Blog
            </Button>
          </a>
          <button
            onClick={handleShare}
            className="hover:bg-secondary/40 border-border/10 text-muted-foreground hover:text-foreground cursor-pointer rounded-lg border p-2 transition-colors"
            aria-label="Share Article"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Content Body Card */}
        <article className="mx-auto max-w-2xl space-y-6">
          {/* Article Header Metadata */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="outline" className="font-mono text-[8px]">
                {article.category}
              </Badge>
              <span className="text-muted-foreground flex items-center gap-1 font-mono text-[9px]">
                <Clock className="h-3 w-3" /> {article.readingTime}
              </span>
              <span className="text-muted-foreground flex items-center gap-1 font-mono text-[9px]">
                <Calendar className="h-3 w-3" /> {article.date}
              </span>
            </div>
            <h1 className="text-foreground text-xl leading-tight font-black tracking-tight md:text-2xl">
              {article.title}
            </h1>
            <div className="border-border/10 flex items-center gap-2 border-y py-3">
              <div className="bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-full font-mono text-[10px] font-black">
                AM
              </div>
              <div>
                <span className="text-foreground block text-[10px] leading-none font-bold">
                  Alex Mercer
                </span>
                <span className="text-muted-foreground mt-0.5 block font-mono text-[8px] leading-none">
                  Author · Senior Business Analyst
                </span>
              </div>
            </div>
          </div>

          {/* Article Paragraph Content */}
          <div className="prose prose-sm dark:prose-invert">{renderContent(article.content)}</div>
        </article>
      </div>
    </DashboardLayout>
  );
}
