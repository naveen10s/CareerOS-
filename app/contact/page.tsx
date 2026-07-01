"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Link2,
  Send,
  CheckCircle,
  AlertCircle,
  MapPin,
  Clock,
  ExternalLink,
} from "lucide-react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardContent } from "@/components/cards/card";
import { cn } from "@/lib/utils";
import profileData from "@/data/profile.json";
import socialLinksData from "@/data/social-links.json";

// ── Form schema ────────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message too long"),
  intent: z.enum(["role", "collaboration", "project", "general"]),
});

type ContactForm = z.infer<typeof contactSchema>;

const INTENTS = [
  { value: "role", label: "Job Opportunity" },
  { value: "collaboration", label: "Collaboration" },
  { value: "project", label: "Project Inquiry" },
  { value: "general", label: "General Chat" },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  email: <Mail className="h-4 w-4" />,
  linkedin: <Link2 className="h-4 w-4" />,
  github: <Link2 className="h-4 w-4" />,
};

export default function ContactPage() {
  const profile = profileData.example as any;
  const socialLinks = (socialLinksData as any).example ?? [];

  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: { intent: "role" },
  });

  const onSubmit = async (data: ContactForm) => {
    setSubmitStatus("sending");
    // Simulate async send (wire to actual endpoint in production)
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitStatus("success");
    reset();
    setTimeout(() => setSubmitStatus("idle"), 5000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start gap-3"
        >
          <div className="bg-primary/10 border-primary/20 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border">
            <Mail className="text-primary h-5 w-5" />
          </div>
          <div>
            <span className="text-primary font-mono text-[9px] tracking-widest uppercase">
              Open to Opportunities
            </span>
            <h1 className="text-foreground text-2xl font-extrabold tracking-tight">
              Let's Connect
            </h1>
            <p className="text-muted-foreground mt-1 max-w-2xl text-xs leading-relaxed">
              Currently exploring Associate Product Manager roles. Open to conversations about
              product strategy, data-driven PM transitions, and collaborative opportunities.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          {/* ── Contact Form ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06 }}
          >
            <Card variant="solid" className="p-6">
              <AnimatePresence mode="wait">
                {submitStatus === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                  >
                    <div className="bg-success/15 border-success/30 flex h-14 w-14 items-center justify-center rounded-full border">
                      <CheckCircle className="text-success h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-foreground text-sm font-bold">Message sent!</h3>
                      <p className="text-muted-foreground mt-1 text-xs">
                        Thanks — I'll get back to you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
                  >
                    <div className="space-y-1">
                      <h2 className="text-foreground text-sm font-bold">Send a message</h2>
                      <p className="text-muted-foreground text-[10px]">
                        Fill in the form below — or reach out directly via the links on the right.
                      </p>
                    </div>

                    {/* Intent selector */}
                    <div className="space-y-1.5">
                      <label className="text-foreground block font-mono text-[9px] font-bold uppercase">
                        Reason for reaching out *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {INTENTS.map((intent) => (
                          <label key={intent.value} className="cursor-pointer">
                            <input
                              type="radio"
                              value={intent.value}
                              {...register("intent")}
                              className="peer sr-only"
                            />
                            <span className="peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary border-border/30 text-muted-foreground hover:border-border/60 hover:text-foreground inline-block rounded-lg border px-3 py-1.5 font-mono text-[9px] tracking-wider uppercase transition-all">
                              {intent.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField label="Your Name" required error={errors.name?.message}>
                        <input
                          {...register("name")}
                          type="text"
                          placeholder="Alex Chen"
                          className={inputClass(!!errors.name)}
                          aria-describedby={errors.name ? "name-error" : undefined}
                        />
                      </FormField>
                      <FormField label="Email Address" required error={errors.email?.message}>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="you@company.com"
                          className={inputClass(!!errors.email)}
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                      </FormField>
                    </div>

                    {/* Subject */}
                    <FormField label="Subject" required error={errors.subject?.message}>
                      <input
                        {...register("subject")}
                        type="text"
                        placeholder="APM role at your company"
                        className={inputClass(!!errors.subject)}
                      />
                    </FormField>

                    {/* Message */}
                    <FormField label="Message" required error={errors.message?.message}>
                      <textarea
                        {...register("message")}
                        rows={5}
                        placeholder="Tell me about the opportunity, project, or idea..."
                        className={cn(inputClass(!!errors.message), "resize-none")}
                      />
                    </FormField>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitStatus === "sending" || !isDirty}
                      className={cn(
                        "flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 font-mono text-[10px] tracking-wider uppercase transition-all",
                        submitStatus === "sending" || !isDirty
                          ? "bg-primary/40 text-primary-foreground/60 cursor-not-allowed"
                          : "bg-primary text-primary-foreground hover:opacity-90",
                      )}
                      aria-busy={submitStatus === "sending"}
                    >
                      {submitStatus === "sending" ? (
                        <>
                          <span className="border-primary-foreground/30 border-t-primary-foreground h-3.5 w-3.5 animate-spin rounded-full border-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" /> Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>

          {/* ── Right panel: identity + social links ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4"
          >
            {/* Identity card */}
            <Card variant="glow" className="space-y-4 p-5">
              <div className="space-y-1">
                <h3 className="text-foreground text-sm font-bold">{profile.name}</h3>
                <p className="text-primary font-mono text-[9px]">{profile.targetRole}</p>
                <div className="text-muted-foreground mt-2 flex flex-col gap-1 font-mono text-[9px]">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {profile.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Mail className="h-3 w-3 shrink-0" />
                    {profile.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-3 w-3 shrink-0" />
                    Responds within 24h
                  </span>
                </div>
              </div>
              <div className="border-border/10 border-t pt-3">
                <span className="text-muted-foreground mb-2 block font-mono text-[8px] uppercase">
                  Availability
                </span>
                <div className="flex items-center gap-2">
                  <span className="bg-success h-2 w-2 animate-pulse rounded-full" />
                  <span className="text-success font-mono text-[10px]">
                    Open to APM opportunities
                  </span>
                </div>
              </div>
            </Card>

            {/* Social links */}
            <Card variant="solid" className="space-y-3 p-5">
              <span className="text-foreground block font-mono text-[9px] font-bold uppercase">
                Find Me Online
              </span>
              <div className="space-y-2">
                {socialLinks.map((link: any, i: number) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-border/15 hover:border-primary/30 hover:bg-primary/5 group flex items-center justify-between gap-3 rounded-lg border p-3 transition-all"
                    aria-label={`Visit ${link.platform}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-secondary/50 text-muted-foreground group-hover:text-primary flex h-7 w-7 items-center justify-center rounded-lg transition-colors">
                        {ICON_MAP[link.platform?.toLowerCase()] ?? (
                          <ExternalLink className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div>
                        <span className="text-foreground block font-mono text-[9px] font-bold uppercase">
                          {link.platform}
                        </span>
                        {link.handle && (
                          <span className="text-muted-foreground block font-mono text-[8px]">
                            {link.handle}
                          </span>
                        )}
                      </div>
                    </div>
                    <ExternalLink className="text-muted-foreground group-hover:text-primary h-3 w-3 transition-colors" />
                  </a>
                ))}
              </div>
            </Card>

            {/* Status card */}
            <Card variant="solid" className="p-4">
              <span className="text-muted-foreground mb-3 block font-mono text-[8px] uppercase">
                Current Focus
              </span>
              <ul className="space-y-2">
                {[
                  "Completing PM certification (CSPO)",
                  "Building CareerOS product portfolio",
                  "Exploring APM role opportunities",
                  "Contributing to open-source tools",
                ].map((item, i) => (
                  <li key={i} className="text-muted-foreground flex items-center gap-2 text-xs">
                    <span className="bg-primary h-1.5 w-1.5 shrink-0 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function inputClass(hasError: boolean) {
  return cn(
    "w-full px-3 py-2.5 bg-background/50 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground/50 transition-colors",
    hasError ? "border-danger/50" : "border-border/20",
  );
}

function FormField({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-foreground block font-mono text-[9px] font-bold uppercase">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-danger flex items-center gap-1.5 font-mono text-[9px]"
            role="alert"
          >
            <AlertCircle className="h-3 w-3 shrink-0" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
