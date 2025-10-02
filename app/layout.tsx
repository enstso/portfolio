import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { Nav } from "@/components/nav/nav";
import { componentsRoutes } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
    title: "Enstso JANVIER - IT Analyst Engineer | Portfolio",
    description: "Professional IT Analyst Engineer specializing in full-stack development, cloud architecture, and cybersecurity. Available for consulting and development services in Paris, France.",
    keywords: "IT Analyst, Full Stack Developer, Cloud Architecture, Cybersecurity, React, Angular, .NET, NestJS, Paris",
    authors: [{ name: "Enstso JANVIER" }],
    creator: "Enstso JANVIER",
    openGraph: {
        title: "Enstso JANVIER - IT Analyst Engineer",
        description: "Professional IT solutions and consulting services",
        type: "website",
        locale: "en_US",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body className={`${GeistSans.className} ${GeistMono.className} antialiased bg-slate-50 dark:bg-slate-900`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
                <div className="flex h-20 items-center">
                    <Nav items={componentsRoutes} />
                </div>
            </header>
            <main className="min-h-screen">
                {children}
            </main>
            <footer className="bg-slate-100 dark:bg-slate-800 py-8 text-center text-slate-600 dark:text-slate-400">
                <p>&copy; 2025 Enstso JANVIER. All rights reserved.</p>
            </footer>
        </ThemeProvider>
        </body>
        </html>
    );
}
