import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import "./globals.css";
import { Nav } from "@/components/nav/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { primaryNavigation, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Software Engineering",
    "AI Engineer",
    "Generative AI",
    "AI Agents",
    "RAG",
    "Data Engineering",
    "Cloud",
    "Kubernetes",
    ".NET",
    "Python",
    "Solution Engineering",
    "Paris",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.name} portfolio` }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: "IT Engineer & Analyst",
  sameAs: [siteConfig.github, siteConfig.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${GeistSans.className} ${GeistMono.variable} bg-slate-50 antialiased dark:bg-slate-900`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main-content"
            className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/90">
            <div className="h-16 sm:h-20">
              <Nav items={primaryNavigation} />
            </div>
          </header>
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <footer className="bg-slate-100 py-6 text-slate-600 dark:bg-slate-800 dark:text-slate-400 sm:py-8">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
              <p className="text-sm sm:text-base">
                &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm font-medium">
                <a className="hover:text-blue-600 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:text-blue-400" href={siteConfig.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a className="hover:text-blue-600 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:text-blue-400" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a className="hover:text-blue-600 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:text-blue-400" href={`mailto:${siteConfig.email}`}>
                  Email
                </a>
              </div>
            </div>
          </footer>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData).replaceAll("<", "\\u003c") }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
