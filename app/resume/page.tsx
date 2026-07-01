"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  Eye,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  TrendingUp,
  MapPin,
  Mail,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Badge } from "@/components/ui/badges";
import { cn } from "@/lib/utils";
import profileData from "@/data/profile.json";
import experienceData from "@/data/experience.json";
import skillsData from "@/data/skills/example.json";
import certificationsData from "@/data/certifications.json";

type Experience = (typeof experienceData.example)[number];
type Skill = (typeof skillsData)[number];
type Cert = (typeof certificationsData.example)[number];

const RESUME_SECTIONS = [
  { id: "profile", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
];

function formatDate(d: string) {
  if (d === "Present") return "Present";
  const [y, m] = d.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[parseInt(m) - 1]} ${y}`;
}

export default function ResumePage() {
  const profile = profileData.example as any;
  const experiences = experienceData.example as Experience[];
  const skills = skillsData as Skill[];
  const certs = certificationsData.example as Cert[];

  const [activeSection, setActiveSection] = useState("profile");
  const [viewMode, setViewMode] = useState<"interactive" | "ats">("interactive");

  // Group skills by category
  const groupedSkills = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    const cat = s.category.replace(/-/g, " ");
    acc[cat] = acc[cat] ?? [];
    acc[cat].push(s);
    return acc;
  }, {});

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <DashboardLayout>
      {/* Global Print Styles Overrides */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          /* Hide non-resume layout wrappers */
          aside, nav, header, button, footer, .no-print, [role="navigation"], .floating-dock, .sidebar-root, .navbar-root {
            display: none !important;
          }
          body, html, main, .relative {
            background: white !important;
            color: black !important;
            font-size: 11pt !important;
          }
          .print-full-width {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .card-solid, .card-glass {
            border: none !important;
            background: transparent !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin-bottom: 20px !important;
          }
          .text-foreground {
            color: black !important;
          }
          .text-muted-foreground {
            color: #555555 !important;
          }
          .bg-primary/10 {
            background-color: #f0f0f0 !important;
            border-color: #cccccc !important;
          }
        }
      `,
        }}
      />

      <div className="print-full-width space-y-8 pb-24">
        {/* Header */}
        <div className="no-print flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 border-primary/20 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border">
              <FileText className="text-primary h-5 w-5" />
            </div>
            <div>
              <span className="text-primary font-mono text-[9px] tracking-widest uppercase">
                Career Document
              </span>
              <h1 className="text-foreground text-2xl font-extrabold tracking-tight">
                Resume Spec
              </h1>
              <p className="text-muted-foreground mt-0.5 text-xs">
                ATS-compatible resume document, sourced directly from metadata layers.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="bg-secondary/40 border-border/10 flex rounded-lg border p-1">
              <button
                onClick={() => setViewMode("interactive")}
                className={cn(
                  "rounded-md px-2.5 py-1 font-mono text-[8px] font-bold uppercase transition-all",
                  viewMode === "interactive"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Interactive
              </button>
              <button
                onClick={() => setViewMode("ats")}
                className={cn(
                  "rounded-md px-2.5 py-1 font-mono text-[8px] font-bold uppercase transition-all",
                  viewMode === "ats"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                ATS Text
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="bg-primary text-primary-foreground inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 font-mono text-[10px] tracking-wider uppercase transition-opacity hover:opacity-90"
              aria-label="Download PDF resume"
            >
              <Download className="h-3.5 w-3.5" /> Print / PDF
            </button>
          </div>
        </div>

        {/* ATS View Mode Render */}
        {viewMode === "ats" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border-border/20 text-foreground mx-auto max-w-3xl space-y-6 rounded-xl border p-6 font-mono text-xs leading-relaxed whitespace-pre-wrap select-text"
          >
            <div>
              <h2 className="text-primary text-sm font-extrabold">{profile.name.toUpperCase()}</h2>
              <p>
                {profile.location} | {profile.email} | {profile.links?.linkedin}
              </p>
            </div>

            <div>
              <h3 className="border-border/20 border-b pb-1 text-[11px] font-bold tracking-wide uppercase">
                PROFESSIONAL SUMMARY
              </h3>
              <p className="mt-1">{profile.summary}</p>
            </div>

            <div>
              <h3 className="border-border/20 border-b pb-1 text-[11px] font-bold tracking-wide uppercase">
                WORK EXPERIENCE
              </h3>
              {experiences.map((exp) => (
                <div key={exp.id} className="mt-2">
                  <div className="flex justify-between font-bold">
                    <span>
                      {exp.role.toUpperCase()} - {exp.company.toUpperCase()}
                    </span>
                    <span>
                      {formatDate(exp.startDate).toUpperCase()} -{" "}
                      {formatDate(exp.endDate).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-[10px]">{exp.location}</p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px]">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <h3 className="border-border/20 border-b pb-1 text-[11px] font-bold tracking-wide uppercase">
                KEY SKILLS
              </h3>
              {Object.entries(groupedSkills).map(([cat, catSkills]) => (
                <div key={cat} className="mt-1 text-[11px]">
                  <span className="font-bold uppercase">{cat}:</span>{" "}
                  {catSkills.map((s) => s.name).join(", ")}
                </div>
              ))}
            </div>

            <div>
              <h3 className="border-border/20 border-b pb-1 text-[11px] font-bold tracking-wide uppercase">
                CERTIFICATIONS
              </h3>
              {certs.map((cert, i) => (
                <div key={i} className="mt-1">
                  <span className="font-bold">{cert.name}</span> - {cert.issuer} ({cert.date})
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Two-column layout */
          <div className="print-full-width grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
            {/* Sticky section nav */}
            <aside className="no-print space-y-2 lg:sticky lg:top-24 lg:self-start">
              <Card variant="glass" className="p-3">
                <span className="text-primary mb-2 block pl-1 font-mono text-[8px] font-bold uppercase">
                  SECTIONS
                </span>
                <nav className="space-y-1">
                  {RESUME_SECTIONS.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => {
                        setActiveSection(sec.id);
                        document
                          .getElementById(`res-${sec.id}`)
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className={cn(
                        "w-full cursor-pointer rounded px-2 py-1.5 text-left font-mono text-[9px] tracking-wider uppercase transition-all",
                        activeSection === sec.id
                          ? "bg-primary/15 text-primary"
                          : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground",
                      )}
                    >
                      {sec.label}
                    </button>
                  ))}
                </nav>
              </Card>

              {/* Identity card */}
              <Card variant="solid" className="space-y-3 p-4">
                <div className="text-muted-foreground space-y-1.5 font-mono text-[9px] uppercase">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 shrink-0" />
                    <span className="text-foreground">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="text-foreground">{profile.location}</span>
                  </div>
                </div>
                <div className="border-border/10 border-t pt-2">
                  <span className="text-muted-foreground mb-1 block font-mono text-[8px] uppercase">
                    Target Role
                  </span>
                  <span className="text-primary font-mono text-[10px] font-bold">
                    {profile.targetRole}
                  </span>
                </div>
              </Card>
            </aside>

            {/* Resume content */}
            <div className="space-y-10">
              {/* Profile */}
              <section id="res-profile" className="scroll-mt-24 space-y-4">
                <ResumeSection
                  icon={<Eye className="text-primary h-4 w-4" />}
                  title="Professional Profile"
                />
                <Card variant="solid" className="p-6">
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-foreground text-lg font-extrabold">{profile.name}</h2>
                      <p className="text-primary mt-0.5 font-mono text-[10px]">
                        {profile.headline}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {profile.summary}
                    </p>
                    <div>
                      <span className="text-muted-foreground mb-2 block font-mono text-[8px] uppercase">
                        Core Strengths
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.strengths.map((s: string) => (
                          <Badge key={s} variant="default" className="text-[8px]">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="border-border/10 border-t pt-3">
                      <span className="text-muted-foreground mb-2 block font-mono text-[8px] uppercase">
                        Why Product Management
                      </span>
                      <p className="text-muted-foreground border-primary/30 border-l-2 pl-3 text-xs leading-relaxed italic">
                        "{profile.transitionNarrative.whyProductManagement}"
                      </p>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Experience */}
              <section id="res-experience" className="scroll-mt-24 space-y-4">
                <ResumeSection
                  icon={<Briefcase className="text-primary h-4 w-4" />}
                  title="Work Experience"
                />
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <Card key={exp.id} variant="solid" className="space-y-3 p-5">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                        <div>
                          <h3 className="text-foreground text-sm font-bold">{exp.role}</h3>
                          <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-2 font-mono text-[9px]">
                            <span>{exp.company}</span>
                            <span>·</span>
                            <span>{exp.location}</span>
                            {exp.isCurrent && (
                              <Badge variant="growth" className="text-[7px]">
                                Current
                              </Badge>
                            )}
                          </div>
                        </div>
                        <span className="text-muted-foreground shrink-0 font-mono text-[9px]">
                          {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.summary && (
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          {exp.summary}
                        </p>
                      )}
                      <ul className="space-y-1.5">
                        {exp.responsibilities.slice(0, 4).map((r, i) => (
                          <li
                            key={i}
                            className="text-muted-foreground flex items-start gap-2 text-xs"
                          >
                            <ChevronRight className="text-primary mt-0.5 h-3.5 w-3.5 shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {[...exp.pmKeywords.slice(0, 3), ...exp.baKeywords.slice(0, 2)].map((k) => (
                          <Badge key={k} variant="secondary" className="font-mono text-[7px]">
                            {k}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section id="res-skills" className="scroll-mt-24 space-y-4">
                <ResumeSection
                  icon={<Code2 className="text-primary h-4 w-4" />}
                  title="Skills & Capabilities"
                />
                <div className="space-y-4">
                  {Object.entries(groupedSkills).map(([cat, catSkills]) => (
                    <div key={cat}>
                      <span className="text-muted-foreground mb-2 block font-mono text-[9px] font-bold uppercase">
                        {cat}
                      </span>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {catSkills.map((skill) => (
                          <div
                            key={skill.id}
                            className="bg-secondary/10 border-border/10 flex items-center justify-between rounded-lg border px-3 py-2"
                          >
                            <span className="text-foreground text-xs font-medium">
                              {skill.name}
                            </span>
                            <div className="flex shrink-0 items-center gap-2">
                              <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span
                                    key={i}
                                    className={cn(
                                      "h-1.5 w-4 rounded-full",
                                      i < skill.level ? "bg-primary" : "bg-secondary/50",
                                    )}
                                  />
                                ))}
                              </div>
                              <span className="text-muted-foreground font-mono text-[8px]">
                                {skill.level}/5
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications */}
              <section id="res-certifications" className="scroll-mt-24 space-y-4 pb-4">
                <ResumeSection
                  icon={<Award className="text-primary h-4 w-4" />}
                  title="Certifications"
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {certs.map((cert, i) => (
                    <Card key={i} variant="solid" className="flex items-start gap-3 p-4">
                      <div className="bg-warning/10 border-warning/20 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border">
                        <Award className="text-warning h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-foreground text-xs font-bold">{cert.name}</h4>
                        <p className="text-muted-foreground mt-0.5 font-mono text-[9px]">
                          {cert.issuer}
                        </p>
                        <p className="text-muted-foreground font-mono text-[9px]">{cert.date}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function ResumeSection({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="border-border/20 flex items-center gap-2 border-b pb-3">
      <div className="bg-primary/10 border-primary/20 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border">
        {icon}
      </div>
      <h2 className="text-foreground text-sm font-extrabold">{title}</h2>
    </div>
  );
}
