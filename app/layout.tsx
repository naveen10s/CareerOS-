import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/providers/app-provider";
import { constructMetadata } from "@/app/metadata";
import { SchemaOrg } from "@/components/seo/schema-org";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <SchemaOrg />
      </head>
      <body className="bg-background text-foreground duration-normal ease-premium flex min-h-full flex-col transition-colors">
        {/* WCAG AA Skip to Main Content Link */}
        <a
          href="#main-content"
          className="bg-primary text-primary-foreground absolute top-4 left-4 z-50 -translate-y-20 rounded-md px-4 py-2 font-mono text-xs font-bold transition-transform outline-none select-none focus:translate-y-0"
        >
          Skip to content
        </a>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
