import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/nav/nav";
import { componentsRoutes, componentsAdminRoutes } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { executeDbPush } from "@/lib/dbPush"; // Importer la fonction

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio Enstso",
};
// Appel de la fonction d'exécution de db push une seule fois
async function initializeDatabase() {
  await executeDbPush(); // Appelle la fonction qui va exécuter npx prisma db push
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await initializeDatabase(); 

  return (
    <html lang="en"suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
