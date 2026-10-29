import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import "./globals.css";
import { Nav } from "@/components/nav/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { primaryNavigation, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  keywords: [
    "AI Builder",
    "Product Engineering",
    "Solution Engineering",
    "Agentic AI",
    "Enterprise AI",
    "Business Analysis",
    "Technical Project Management",
    "Software Engineering",
    "Enterprise Software",
    "Cloud Architecture",
    "Kubernetes",
    ".NET",
    "TypeScript",
    "Python",
    "Paris",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
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

export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "light dark" };

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: "AI Builder at Salesforce",
  sameAs: [siteConfig.github, siteConfig.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${GeistSans.className} ${GeistMono.variable} min-w-80 antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <header className="site-header">
            <Nav items={primaryNavigation} />
          </header>
          <main id="main-content" className="min-h-[70vh]">{children}</main>
          <footer className="border-t border-slate-200/80 bg-white/60 dark:border-slate-800 dark:bg-[#0a0f1b]/70">
            <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-end lg:px-12">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">ENSTSO.</p>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Connecting product thinking, business needs and technical engineering to deliver intelligent solutions.
                </p>
                <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">© {new Date().getFullYear()} {siteConfig.name}</p>
              </div>
              <nav aria-label="Social links" className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                <a className="text-link" href={siteConfig.github} target="_blank" rel="noreferrer">GitHub</a>
                <a className="text-link" href={siteConfig.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="text-link" href={`mailto:${siteConfig.email}`}>Email</a>
                <a className="text-link" href="/feed.xml">RSS</a>
              </nav>
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
