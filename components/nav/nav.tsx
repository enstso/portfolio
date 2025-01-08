"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavItems } from "@/lib/utils";
import { ModeToggle } from "@/components/toggle-mode";
import { deleteSession } from "@/app/session";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex justify-between items-center w-full gap-6 md:gap-10 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black py-4">
      {/* Logo et navigation */}
      <nav className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="ms-4 md:ms-8">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Enstso
          </h1>
        </div>

        {/* Menu pour les grands écrans */}
        <div className="hidden md:flex gap-6 items-center">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                    pathname === item.href
                      ? "text-white bg-black dark:bg-white dark:text-black border border-black dark:border-white shadow-md"
                      : "text-neutral-600 hover:text-black hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}

          {/* Bouton de déconnexion */}
          {pathname == "/admin" && (
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-black hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition-all duration-300 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mode Toggle */}
        <div className="me-4 md:me-8 flex items-center">
          <ModeToggle />
        </div>

        {/* Bouton menu pour les petits écrans */}
        <button
          className="block md:hidden ms-4 me-4"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 z-50">
          <div className="flex flex-col items-center gap-4 py-4">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                      pathname === item.href
                        ? "text-white bg-black dark:bg-white dark:text-black shadow-lg"
                        : "text-neutral-600 hover:text-black hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}

            {pathname == "/admin" && (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-black hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition-all duration-300 rounded-lg"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
