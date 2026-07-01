import { Metadata } from "next";

export const siteConfig = {
  name: "CareerOS",
  description: "Career Operating System for Product Management Transition",
  url: "https://careeros.dev",
  ogImage: "https://careeros.dev/og.png",
  links: {
    linkedin: "https://linkedin.com/in/alex-mercer",
    github: "https://github.com/career-os",
  },
};

interface MetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title = "CareerOS - BA to PM Transition Operating System",
  description = "A high-fidelity platform mapping transferable Business Analyst competencies to Product Management achievements, strategic projects, and learning metrics.",
  image = siteConfig.ogImage,
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@career_os",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
