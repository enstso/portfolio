"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { ModeToggle } from "@/components/toggle-mode";
import { cn } from "@/lib/utils";

type NavItem = { title: string; href: string };

export function Nav({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/user", { method: "DELETE" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-18 sm:px-8 lg:px-12">
      <Link href="/" className="group inline-flex items-center gap-3 rounded-sm focus-ring" aria-label="Enstso Janvier, home">
        <span className="font-mono text-base font-bold tracking-[0.13em] text-slate-950 dark:text-white">ENSTSO<span className="text-blue-600 dark:text-blue-400">.</span></span>
        <span className="hidden h-4 w-px bg-slate-300 dark:bg-slate-700 sm:block" aria-hidden="true" />
        <span className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">Software Engineer · AI Builder</span>
      </Link>

      <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
        {items.map((item) => <NavLink key={item.href} item={item} pathname={pathname} />)}
      </nav>

      <div className="flex items-center gap-2">
        {pathname.startsWith("/admin") && (
          <button onClick={logout} type="button" className="hidden items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 focus-ring dark:text-red-400 dark:hover:bg-red-950/30 sm:inline-flex">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        )}
        <ModeToggle />
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 focus-ring dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="absolute inset-x-4 top-[calc(100%+0.5rem)] border border-slate-200 bg-white p-3 shadow-2xl dark:border-slate-700 dark:bg-slate-950 md:hidden">
          <nav className="grid" aria-label="Mobile navigation">
            {items.map((item) => <NavLink key={item.href} item={item} pathname={pathname} mobile onNavigate={() => setOpen(false)} />)}
            {pathname.startsWith("/admin") && (
              <button onClick={logout} type="button" className="flex items-center gap-2 px-4 py-3 text-left text-sm font-semibold text-red-600 dark:text-red-400">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}

function NavLink({ item, pathname, mobile = false, onNavigate }: { item: NavItem; pathname: string; mobile?: boolean; onNavigate?: () => void }) {
  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-md text-sm font-medium transition-colors focus-ring",
        mobile ? "px-4 py-3" : "px-3 py-2",
        active
          ? "text-blue-700 dark:text-blue-300"
          : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white",
      )}
    >
      {item.title}
      {active && !mobile && <span className="absolute inset-x-3 -bottom-[13px] h-0.5 bg-blue-600 dark:bg-blue-400" aria-hidden="true" />}
    </Link>
  );
}
