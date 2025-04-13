import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { Nav } from "@/components/nav/nav";
import { componentsRoutes } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";



export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio Enstso",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"suppressHydrationWarning={true}>
      <body
        className={`${GeistSans.className} ${GeistMono.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="static top-0 z-40 w-full border-b bg-background mb-10">
            <div className="flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
              <Nav items={componentsRoutes}></Nav>
            </div>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
