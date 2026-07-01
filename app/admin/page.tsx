"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Settings,
  User,
  Briefcase,
  FolderGit,
  Award,
  BookOpen,
  Rss,
  Image as ImageIcon,
  Cpu,
  Search,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle,
  Eye,
  FileText,
  Clock,
  Compass,
  Database,
  CloudLightning,
  Activity,
  AlertCircle,
  Calendar,
} from "lucide-react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Button } from "@/components/buttons/button";
import { Badge } from "@/components/ui/badges";
import { cn } from "@/lib/utils";

// Data Source imports
import profileData from "@/data/profile.json";
import experienceData from "@/data/experience.json";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import timelineData from "@/data/timeline.json";
import learningData from "@/data/learning.json";
import achievementsData from "@/data/achievements.json";
import blogData from "@/data/blog.json";

// Zod CMS validations definitions
const ProfileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  headline: z.string().min(5, "Headline is required"),
  summary: z.string().min(10, "Summary must be descriptive"),
  email: z.string().email("Invalid email formatting"),
  location: z.string().min(2, "Location is required"),
});

const ProjectFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(2, "Slug must be defined"),
  category: z.string().min(2, "Category is required"),
  status: z.enum(["draft", "published"]),
  problem: z.string().min(10, "Problem must detail context"),
  solution: z.string().min(10, "Solution must define details"),
});

const BlogFormSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  category: z.string().min(2, "Category is required"),
  content: z.string().min(10, "Post content is required"),
  readingTime: z.string().min(2, "Reading time value (e.g. 5 min read)"),
  featured: z.boolean(),
});

type Tab =
  | "overview"
  | "profile"
  | "experience"
  | "projects"
  | "skills"
  | "timeline"
  | "learning"
  | "achievements"
  | "blog"
  | "media"
  | "settings";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [autosaveText, setAutosaveText] = useState("Draft clean");

  // Local state cache simulation
  const [profile, setProfile] = useState(profileData.example);
  const [experiences, setExperiences] = useState(experienceData.example);
  const [projects, setProjects] = useState(projectsData.example);
  const [skills, setSkills] = useState(skillsData.example.productManagement || []);
  const [timeline, setTimeline] = useState(timelineData.example);
  const [learning, setLearning] = useState(learningData.example);
  const [achievements, setAchievements] = useState(achievementsData.example);
  const [blogs, setBlogs] = useState(blogData.example);

  // Forms mapping
  const profileForm = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: profile.name,
      headline: profile.headline,
      summary: profile.summary,
      email: profile.email,
      location: profile.location,
    },
  });

  const projectForm = useForm<z.infer<typeof ProjectFormSchema>>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "Product Management",
      status: "draft",
      problem: "",
      solution: "",
    },
  });

  const blogForm = useForm<z.infer<typeof BlogFormSchema>>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "Telemetry",
      content: "",
      readingTime: "5 min read",
      featured: false,
    },
  });

  // Modal selectors
  const [editingItem, setEditingItem] = useState<{ type: string; item: any } | null>(null);

  // Autosave Simulator architecture hooks
  useEffect(() => {
    const subscription = profileForm.watch(() => {
      setAutosaveText("Autosaving change...");
      const timer = setTimeout(() => {
        setAutosaveText("Draft saved (autosave active)");
      }, 1500);
      return () => clearTimeout(timer);
    });
    return () => subscription.unsubscribe();
  }, [profileForm.watch]);

  const handleProfileSubmit = (data: any) => {
    setSaveStatus("saving");
    setTimeout(() => {
      setProfile((prev) => ({ ...prev, ...data }));
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  const handleAddProject = (data: any) => {
    setSaveStatus("saving");
    setTimeout(() => {
      const newItem = { id: `proj-${Date.now()}`, ...data };
      setProjects((prev) => [newItem, ...prev]);
      projectForm.reset();
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  const handleDeleteItem = (
    collection: "projects" | "blog" | "skills" | "experience",
    id: string,
  ) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    if (collection === "projects") {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } else if (collection === "blog") {
      setBlogs((prev) => prev.filter((b) => b.slug !== id)); // blog key is slug
    } else if (collection === "experience") {
      setExperiences((prev) => prev.filter((e) => e.id !== id));
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-container-max mx-auto w-full space-y-8 p-6 pb-24 md:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 border-primary/20 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border">
              <Cpu className="text-primary h-5 w-5 animate-pulse" />
            </div>
            <div>
              <span className="text-primary font-mono text-[9px] tracking-widest uppercase">
                CMS System
              </span>
              <h1 className="text-foreground text-2xl font-extrabold tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-0.5 text-xs">
                Internal metadata controls console. Edit site data schemas instantly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="text-muted-foreground font-mono text-[9px] uppercase"
            >
              {autosaveText}
            </Badge>
            {saveStatus === "saving" && (
              <span className="text-primary animate-pulse font-mono text-[10px]">
                Syncing Changes...
              </span>
            )}
            {saveStatus === "saved" && (
              <span className="text-success flex items-center gap-1 font-mono text-[10px]">
                <CheckCircle className="h-3 w-3" /> Saved successfully
              </span>
            )}
          </div>
        </div>

        {/* Outer Layout Tabs Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
          {/* CMS Selector Sidebar */}
          <aside className="space-y-2 lg:sticky lg:top-24 lg:self-start">
            <Card variant="glass" className="p-3">
              <span className="text-primary mb-2 block pl-1 font-mono text-[8px] font-bold uppercase">
                CMS MODULES
              </span>
              <nav className="space-y-1">
                {[
                  { id: "overview", label: "Overview", icon: <Activity className="h-3.5 w-3.5" /> },
                  { id: "profile", label: "Profile", icon: <User className="h-3.5 w-3.5" /> },
                  {
                    id: "experience",
                    label: "Experience",
                    icon: <Briefcase className="h-3.5 w-3.5" />,
                  },
                  {
                    id: "projects",
                    label: "Projects",
                    icon: <FolderGit className="h-3.5 w-3.5" />,
                  },
                  { id: "skills", label: "Skills", icon: <Settings className="h-3.5 w-3.5" /> },
                  { id: "learning", label: "Learning", icon: <BookOpen className="h-3.5 w-3.5" /> },
                  {
                    id: "achievements",
                    label: "Achievements",
                    icon: <Award className="h-3.5 w-3.5" />,
                  },
                  { id: "blog", label: "Blog Engine", icon: <Rss className="h-3.5 w-3.5" /> },
                  {
                    id: "media",
                    label: "Media Manager",
                    icon: <ImageIcon className="h-3.5 w-3.5" />,
                  },
                  { id: "settings", label: "Settings", icon: <Settings className="h-3.5 w-3.5" /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-2.5 rounded px-2.5 py-1.5 text-left font-mono text-[9px] tracking-wider uppercase transition-all",
                      activeTab === tab.id
                        ? "bg-primary/15 text-primary border-primary border-l-2 font-bold"
                        : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground",
                    )}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </nav>
            </Card>
          </aside>

          {/* CMS Workspace Panel */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {/* Tab 1: Overview */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[
                      {
                        label: "Active Databases",
                        value: "8 collections",
                        icon: <Database className="text-primary" />,
                      },
                      {
                        label: "Blog articles",
                        value: `${blogs.length} published`,
                        icon: <Rss className="text-warning" />,
                      },
                      {
                        label: "Projects indexed",
                        value: `${projects.length} cases`,
                        icon: <FolderGit className="text-success" />,
                      },
                    ].map((card, i) => (
                      <Card key={i} variant="solid" className="flex items-center gap-4 p-4">
                        <div className="bg-secondary/50 border-border/10 rounded-xl border p-2.5">
                          {card.icon}
                        </div>
                        <div>
                          <div className="text-foreground font-mono text-lg font-black">
                            {card.value}
                          </div>
                          <div className="text-muted-foreground font-mono text-[8px] uppercase">
                            {card.label}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Card variant="solid" className="space-y-4 p-6">
                    <h3 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                      CMS System Health
                    </h3>
                    <div className="text-muted-foreground space-y-2.5 font-mono text-[10px]">
                      <div className="border-border/5 flex justify-between border-b pb-2">
                        <span>Local JSON Sync</span>
                        <span className="text-success font-bold">ONLINE (100% Synced)</span>
                      </div>
                      <div className="border-border/5 flex justify-between border-b pb-2">
                        <span>Database API connection path</span>
                        <span className="text-muted-foreground">
                          None (Ready for headless CMS migration)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last backup snapshot</span>
                        <span>Just now</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Tab 2: Profile Editor */}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card variant="solid" className="p-6">
                    <h3 className="text-foreground mb-6 font-mono text-xs font-bold tracking-wider uppercase">
                      Profile Settings
                    </h3>
                    <form
                      onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-foreground font-mono text-[9px] font-bold uppercase">
                            Name
                          </label>
                          <input
                            type="text"
                            {...profileForm.register("name")}
                            className="bg-background border-border/30 text-foreground focus:border-primary/50 w-full rounded-lg p-2.5 text-xs outline-none"
                          />
                          {profileForm.formState.errors.name && (
                            <p className="text-destructive font-mono text-[8px]">
                              {profileForm.formState.errors.name.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-foreground font-mono text-[9px] font-bold uppercase">
                            Email
                          </label>
                          <input
                            type="text"
                            {...profileForm.register("email")}
                            className="bg-background border-border/30 text-foreground focus:border-primary/50 w-full rounded-lg p-2.5 text-xs outline-none"
                          />
                          {profileForm.formState.errors.email && (
                            <p className="text-destructive font-mono text-[8px]">
                              {profileForm.formState.errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-foreground font-mono text-[9px] font-bold uppercase">
                          Headline Formula
                        </label>
                        <input
                          type="text"
                          {...profileForm.register("headline")}
                          className="bg-background border-border/30 text-foreground focus:border-primary/50 w-full rounded-lg p-2.5 text-xs outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-foreground font-mono text-[9px] font-bold uppercase">
                          Bio summary
                        </label>
                        <textarea
                          rows={4}
                          {...profileForm.register("summary")}
                          className="bg-background border-border/30 text-foreground focus:border-primary/50 w-full rounded-lg p-2.5 text-xs outline-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="sm"
                        variant="default"
                        leftIcon={<Save className="h-3.5 w-3.5" />}
                      >
                        Save Profile
                      </Button>
                    </form>
                  </Card>
                </motion.div>
              )}

              {/* Tab 3: Projects CRUD */}
              {activeTab === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <Card variant="solid" className="p-6">
                    <h3 className="text-foreground mb-4 font-mono text-xs font-bold tracking-wider uppercase">
                      Add Project
                    </h3>
                    <form
                      onSubmit={projectForm.handleSubmit(handleAddProject)}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="space-y-1.5">
                          <label className="text-foreground font-mono text-[9px] font-bold uppercase">
                            Title
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Telemetry Dashboard"
                            {...projectForm.register("title")}
                            className="bg-background border-border/30 text-foreground focus:border-primary/50 w-full rounded-lg p-2.5 text-xs outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-foreground font-mono text-[9px] font-bold uppercase">
                            Slug
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. telemetry-cohort-analytics"
                            {...projectForm.register("slug")}
                            className="bg-background border-border/30 text-foreground focus:border-primary/50 w-full rounded-lg p-2.5 text-xs outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-foreground font-mono text-[9px] font-bold uppercase">
                            Status
                          </label>
                          <select
                            {...projectForm.register("status")}
                            className="bg-background border-border/30 text-foreground focus:border-primary/50 w-full rounded-lg p-2.5 text-xs outline-none"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </div>
                      </div>

                      {/* Markdown editor & Split Live Preview */}
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-foreground font-mono text-[9px] font-bold uppercase">
                            Problem Definition (Markdown)
                          </label>
                          <textarea
                            rows={6}
                            placeholder="Type markdown syntax here..."
                            {...projectForm.register("problem")}
                            className="bg-background border-border/30 text-foreground focus:border-primary/50 w-full rounded-lg p-2.5 font-mono text-[10px] outline-none"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <span className="text-primary font-mono text-[8px] font-bold tracking-wider uppercase">
                            LIVE MARKDOWN PREVIEW
                          </span>
                          <div className="bg-secondary/20 border-border/10 text-muted-foreground min-h-[110px] flex-1 overflow-y-auto rounded-lg border p-3 text-[10px] leading-relaxed select-text">
                            {projectForm.watch("problem") ? (
                              <div className="prose prose-xs select-text">
                                {projectForm.watch("problem")}
                              </div>
                            ) : (
                              <span className="text-muted-foreground/50 italic">
                                Markdown previewer content will render here...
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-foreground font-mono text-[9px] font-bold uppercase">
                          Solution
                        </label>
                        <textarea
                          rows={3}
                          {...projectForm.register("solution")}
                          className="bg-background border-border/30 text-foreground focus:border-primary/50 w-full rounded-lg p-2.5 text-xs outline-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="sm"
                        variant="default"
                        leftIcon={<Plus className="h-3.5 w-3.5" />}
                      >
                        Add Project
                      </Button>
                    </form>
                  </Card>

                  {/* List table */}
                  <Card variant="solid" className="space-y-4 p-6">
                    <h3 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                      Projects List
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left font-mono text-[9px]">
                        <thead>
                          <tr className="border-border/10 text-muted-foreground border-b uppercase">
                            <th className="py-2.5">Title</th>
                            <th className="py-2.5">Category</th>
                            <th className="py-2.5">Status</th>
                            <th className="py-2.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects.map((p) => (
                            <tr
                              key={p.id}
                              className="border-border/5 hover:bg-secondary/15 border-b transition-colors"
                            >
                              <td className="text-foreground py-2.5 font-bold">{p.title}</td>
                              <td className="py-2.5">{p.category}</td>
                              <td className="py-2.5">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-[7px]",
                                    p.status === "published"
                                      ? "text-success border-success/30"
                                      : "text-muted-foreground",
                                  )}
                                >
                                  {p.status}
                                </Badge>
                              </td>
                              <td className="flex justify-end gap-1.5 py-2.5 text-right">
                                <button
                                  onClick={() => handleDeleteItem("projects", p.id)}
                                  className="text-destructive hover:bg-destructive/10 rounded p-1 transition-colors"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Tab 8: Blog CRUD */}
              {activeTab === "blog" && (
                <motion.div
                  key="blog"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <Card variant="solid" className="p-6">
                    <h3 className="text-foreground mb-4 font-mono text-xs font-bold tracking-wider uppercase">
                      Create Blog Post
                    </h3>
                    <form
                      onSubmit={blogForm.handleSubmit((data) => {
                        setBlogs((prev) => [
                          { ...data, date: new Date().toISOString().split("T")[0], tags: [] },
                          ...prev,
                        ]);
                        blogForm.reset();
                        setSaveStatus("saved");
                        setTimeout(() => setSaveStatus("idle"), 2000);
                      })}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="space-y-1.5">
                          <label className="text-foreground font-mono text-[9px] font-bold uppercase">
                            Title
                          </label>
                          <input
                            type="text"
                            {...blogForm.register("title")}
                            className="bg-background border-border/30 text-foreground focus:border-primary/50 w-full rounded-lg p-2.5 text-xs outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-foreground font-mono text-[9px] font-bold uppercase">
                            Slug
                          </label>
                          <input
                            type="text"
                            {...blogForm.register("slug")}
                            className="bg-background border-border/30 text-foreground focus:border-primary/50 w-full rounded-lg p-2.5 text-xs outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-foreground font-mono text-[9px] font-bold uppercase">
                            Reading time
                          </label>
                          <input
                            type="text"
                            {...blogForm.register("readingTime")}
                            className="bg-background border-border/30 text-foreground focus:border-primary/50 w-full rounded-lg p-2.5 text-xs outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-foreground font-mono text-[9px] font-bold uppercase">
                          Post Content (Markdown supported)
                        </label>
                        <textarea
                          rows={6}
                          {...blogForm.register("content")}
                          className="bg-background border-border/30 text-foreground focus:border-primary/50 w-full rounded-lg p-2.5 font-mono text-[10px] outline-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="sm"
                        variant="default"
                        leftIcon={<Plus className="h-3.5 w-3.5" />}
                      >
                        Publish Blog Post
                      </Button>
                    </form>
                  </Card>

                  {/* Blog list */}
                  <Card variant="solid" className="space-y-4 p-6">
                    <h3 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                      Published Articles
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left font-mono text-[9px]">
                        <thead>
                          <tr className="border-border/10 text-muted-foreground border-b uppercase">
                            <th className="py-2.5">Title</th>
                            <th className="py-2.5">Category</th>
                            <th className="py-2.5">Date</th>
                            <th className="py-2.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blogs.map((b) => (
                            <tr
                              key={b.slug}
                              className="border-border/5 hover:bg-secondary/15 border-b transition-colors"
                            >
                              <td className="text-foreground py-2.5 font-bold">{b.title}</td>
                              <td className="py-2.5">{b.category}</td>
                              <td className="py-2.5">{b.date}</td>
                              <td className="flex justify-end gap-1.5 py-2.5 text-right">
                                <button
                                  onClick={() => handleDeleteItem("blog", b.slug)}
                                  className="text-destructive hover:bg-destructive/10 rounded p-1 transition-colors"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Tab 9: Media Manager */}
              {activeTab === "media" && (
                <motion.div
                  key="media"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <Card variant="solid" className="space-y-4 p-6">
                    <h3 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                      Media Upload Manager
                    </h3>

                    {/* Visual drag & drop area */}
                    <div className="border-border/40 hover:border-primary/45 bg-secondary/5 cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors select-none">
                      <ImageIcon className="text-muted-foreground/60 mx-auto mb-2 h-10 w-10" />
                      <h4 className="text-foreground text-xs font-bold">
                        Drag and drop assets here
                      </h4>
                      <p className="text-muted-foreground mt-0.5 text-[9px]">
                        Supports PNG, JPG, WebP formats (Max size: 5MB)
                      </p>
                      <input type="file" className="hidden" />
                    </div>

                    {/* Mock uploads previews grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
                      {[
                        { name: "avatar.jpg", path: "/assets/avatar.jpg", size: "142 KB" },
                        { name: "og_banner.png", path: "/assets/og.png", size: "842 KB" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="border-border/10 bg-secondary/15 flex flex-col justify-between space-y-2 rounded-xl border p-3 select-text"
                        >
                          <div className="bg-background/80 border-border/5 flex h-24 items-center justify-center rounded-lg border">
                            <ImageIcon className="text-muted-foreground/40 h-8 w-8" />
                          </div>
                          <div>
                            <span className="text-foreground block truncate text-[10px] font-bold">
                              {item.name}
                            </span>
                            <span className="text-muted-foreground block font-mono text-[8px]">
                              {item.size}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(item.path);
                              alert("Copied asset path to clipboard!");
                            }}
                            className="bg-secondary text-foreground border-border/15 hover:bg-secondary/85 w-full cursor-pointer rounded border py-1 text-center font-mono text-[8px] font-bold uppercase"
                          >
                            Copy URL
                          </button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Tab 10: Settings */}
              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <Card variant="solid" className="space-y-6 p-6">
                    <div>
                      <h3 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                        CMS Settings
                      </h3>
                      <p className="text-muted-foreground mt-0.5 text-[11px] leading-relaxed">
                        Setup database backends, backup configurations, or synchronize data schema
                        targets.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-secondary/15 border-border/10 flex flex-col justify-between gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
                        <div>
                          <h4 className="text-foreground flex items-center gap-1.5 text-xs font-bold">
                            <Database className="text-primary h-4 w-4" /> Download JSON Backup
                          </h4>
                          <p className="text-muted-foreground text-[10px]">
                            Compress and download a backup archive containing all 8 JSON database
                            files.
                          </p>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => alert("Creating backup archive download...")}
                        >
                          Backup Data
                        </Button>
                      </div>

                      <div className="bg-secondary/15 border-border/10 flex flex-col justify-between gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
                        <div>
                          <h4 className="text-foreground flex items-center gap-1.5 text-xs font-bold">
                            <CloudLightning className="text-warning h-4 w-4" /> Headless CMS
                            Connection
                          </h4>
                          <p className="text-muted-foreground text-[10px]">
                            Connect database layer outputs to remote Strapi, Contentful, or local
                            mock databases.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => alert("CMS integration configuration panel...")}
                        >
                          Configure Sync
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
