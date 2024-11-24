"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavItems } from "@/lib/utils";
import { ModeToggle } from "@/components/toggle-mode";
import { deleteSession } from "@/app/session";
import { usePathname } from "next/navigation";

interface NavProps {
  items: NavItems[];
}

async function logout() {
  await deleteSession();
  setTimeout(() => {
    window.location.href = "/";
  }, 1500);
}

export function Nav({ items }: NavProps) {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center w-full gap-6 md:gap-10 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black py-4">
      {/* Logo et navigation */}
      <nav className="flex ms-8 gap-6 items-center">
        {/* Logo */}
        <h1 className="text-xl font-semibold text-black dark:text-white">
          Enstso
        </h1>

        {/* Liens de navigation */}
        {items?.map(
          (item, index) =>
            item.href && (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-all duration-300",
                  pathname === item.href
                    ? "text-black dark:text-white"
                    : "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                )}
              >
                {item.title}

                {/* Indicateur actif */}
                {pathname === item.href && (
                  <span
                    className="absolute inset-x-1 bottom-0 h-0.5 bg-black dark:bg-white rounded transition-all duration-300"
                    aria-hidden="true"
                  />
                )}
              </Link>
            )
        )}

        {/* Bouton de déconnexion */}
        {pathname == "/admin" && (
          <button
            onClick={logout}
            className="px-3 py-2 text-sm font-medium text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-all duration-300"
          >
            Logout
          </button>
        )}
      </nav>

      {/* Mode Toggle */}
      <div className="me-8 flex items-center">
        <ModeToggle />
      </div>
    </div>
  );
}
