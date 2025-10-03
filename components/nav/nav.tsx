"use client";

import React, {useState} from "react";
import Link from "next/link";
import {NavItems, cn} from "@/lib/utils";
import {ModeToggle} from "@/components/toggle-mode";
import {deleteSession} from "@/app/session";
import {usePathname} from "next/navigation";
import {Menu, X, Code2} from "lucide-react";

interface NavProps {
    items: NavItems[];
}

async function logout() {
    await deleteSession();
    setTimeout(() => {
        window.location.href = "/";
    }, 1500);
}

export function Nav({items}: Readonly<NavProps>) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div
            className="flex justify-between items-center w-full gap-6 md:gap-10 border-b-2 border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 py-4 shadow-sm">
            <nav className="flex items-center justify-between w-full">
                {/* Logo Professionnel avec Icon */}
                <div className="ms-4 md:ms-8 flex items-center gap-3">
                    <div
                        className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-md">
                        <Code2 className="h-6 w-6 text-white"/>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                            Enstso
                        </h1>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                            IT Analyst Engineer
                        </p>
                    </div>
                </div>

                {/* Navigation Corporate */}
                <div
                    className="hidden md:flex gap-2 items-center bg-white dark:bg-slate-800 rounded-full px-6 py-2 shadow-lg border border-slate-200 dark:border-slate-700">
                    {items?.map(
                        (item, index) =>
                            item.href && (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={cn(
                                        "relative px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105",
                                        pathname === item.href
                                            ? "text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/25"
                                            : "text-slate-700 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:text-blue-400 dark:hover:bg-slate-700"
                                    )}
                                >
                                    {item.title}
                                    {pathname === item.href && (
                                        <div
                                            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                                    )}
                                </Link>
                            )
                    )}

                    {pathname === "/admin" && (
                        <button
                            onClick={logout}
                            className="px-6 py-3 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 transition-all duration-300 rounded-full"
                        >
                            Logout
                        </button>
                    )}
                </div>

                <div className="me-4 md:me-8 flex items-center">
                    <ModeToggle/>
                </div>

                {/* Menu Mobile */}
                <button
                    className="block md:hidden ms-4 me-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? (
                        <X className="h-6 w-6 text-slate-700 dark:text-slate-300"/>
                    ) : (
                        <Menu className="h-6 w-6 text-slate-700 dark:text-slate-300"/>
                    )}
                </button>
            </nav>

            {/* Menu Mobile Redesigné */}
            {isMenuOpen && (
                <div
                    className="absolute top-20 left-4 right-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl z-50 backdrop-blur-sm">
                    <div className="flex flex-col gap-2 p-6">
                        {items?.map(
                            (item, index) =>
                                item.href && (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={cn(
                                            "block px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300",
                                            pathname === item.href
                                                ? "text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg"
                                                : "text-slate-700 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:text-blue-400 dark:hover:bg-slate-700"
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
