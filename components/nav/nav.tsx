"use client";

import { useState } from "react";
import Link from "next/link";
import { Code2, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { ModeToggle } from "@/components/toggle-mode";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  href: string;
};

type NavProps = {
  items: readonly NavItem[];
};

export function Nav({ items }: NavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function logout() {
    await fetch("/api/user", { method: "DELETE" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative flex w-full items-center justify-between gap-4 border-b-2 border-slate-200 bg-gradient-to-r from-slate-50 to-white py-3 shadow-sm dark:border-slate-700 dark:from-slate-900 dark:to-slate-800 sm:py-4">
      <nav className="flex w-full items-center justify-between" aria-label="Primary navigation">
        <Link
          href="/"
          className="ms-4 flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:ms-8"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 shadow-md sm:h-10 sm:w-10" aria-hidden="true">
            <Code2 className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </span>
          <span>
            <span className="block bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-xl font-bold text-transparent dark:from-white dark:to-blue-400 sm:text-2xl">
              Enstso
            </span>
            <span className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 sm:text-xs">
              IT Engineer &amp; Analyst
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2 shadow-lg dark:border-slate-700 dark:bg-slate-800 md:flex">
          {items.map((item) => (
            <NavLink key={item.href} item={item} active={pathname === item.href} />
          ))}
          {pathname === "/admin" && (
            <button type="button" onClick={logout} className="rounded-full px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:text-red-400 dark:hover:bg-red-900/20">
              Logout
            </button>
          )}
        </div>

        <div className="ms-auto flex items-center gap-2 me-4 md:ms-0 md:me-8">
          <ModeToggle />
          <button
            type="button"
            className="rounded-lg p-2 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-slate-700 md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-slate-700 dark:text-slate-300" /> : <Menu className="h-6 w-6 text-slate-700 dark:text-slate-300" />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div id="mobile-navigation" className="absolute left-4 right-4 top-[calc(100%+0.5rem)] z-50 rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800 md:hidden">
          <div className="flex flex-col gap-2 p-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  pathname === item.href
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-blue-400",
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        active
          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
          : "text-slate-700 hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-blue-400",
      )}
    >
      {item.title}
    </Link>
  );
}
