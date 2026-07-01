# Deployment Instructions - CareerOS

This document details the configuration, build directives, and commands to release and deploy CareerOS onto **Vercel** and maintain version control on **GitHub**.

---

## 🚀 Deployment Targets

### Target 1: Vercel (Recommended)

CareerOS is fully optimized for Next.js App Router static optimization rules.

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Configure Environment Variables

Copy `.env.example` configurations to your Vercel Dashboard project settings:

- Set `NEXT_PUBLIC_SITE_URL` to your production URL.

#### Step 3: Run Deployment Commands

```bash
# Link project to Vercel and trigger staging preview
vercel

# Deploy to production release channel
vercel --prod
```

---

## 🛠️ Build Diagnostics

Before pushing changes, verify compilation checks pass locally:

```bash
# Linting checks
pnpm run lint

# TypeScript verification
pnpm tsc --noEmit

# Static output generation
pnpm run build
```

---

## 🔒 Security Headers

Vercel configurations in [vercel.json](file:///c:/Users/navee/Naveen%20Development/vercel.json) apply Content-Security-Policy (CSP) headers protecting routes against cross-site scripting (XSS) and clickjacking.
