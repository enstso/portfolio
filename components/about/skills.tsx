"use client";

import { useState } from "react";
import { SkillsList } from "@/lib/data/skills";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SkillsProps {
    list: SkillsList[];
}

export default function Skills({ list }: SkillsProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filteredList = selectedCategory
        ? list.filter(category => category.domain === selectedCategory)
        : list;

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Mobile Dropdown + Desktop Pills */}
            <div className="relative">
                {/* Mobile Dropdown */}
                <div className="block sm:hidden">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm"
                    >
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {selectedCategory || "All Skills"}
                        </span>
                        <ChevronDown className={cn(
                            "h-4 w-4 text-slate-500 transition-transform duration-200",
                            isDropdownOpen && "rotate-180"
                        )} />
                    </button>

                    {isDropdownOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40 bg-black/20"
                                onClick={() => setIsDropdownOpen(false)}
                            />
                            <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                                <div className="p-2">
                                    <button
                                        onClick={() => {
                                            setSelectedCategory(null);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={cn(
                                            "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200",
                                            selectedCategory === null
                                                ? "bg-blue-600 text-white"
                                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                        )}
                                    >
                                        All Skills
                                    </button>
                                    {list.map((category, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSelectedCategory(category.domain);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={cn(
                                                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200",
                                                selectedCategory === category.domain
                                                    ? "bg-blue-600 text-white"
                                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                            )}
                                        >
                                            {category.domain}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Desktop Pills */}
                <div className="hidden sm:flex flex-wrap gap-3 justify-center">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={cn(
                            "px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border",
                            selectedCategory === null
                                ? "bg-blue-600 text-white shadow-lg border-blue-600 scale-105"
                                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                        )}
                    >
                        All Skills
                    </button>
                    {list.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedCategory(category.domain)}
                            className={cn(
                                "px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border",
                                selectedCategory === category.domain
                                    ? "bg-blue-600 text-white shadow-lg border-blue-600 scale-105"
                                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                            )}
                        >
                            {category.domain}
                        </button>
                    ))}
                </div>
            </div>

            {/* Skills Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredList?.map((item, index) =>
                    item.domain ? (
                        <div
                            key={index}
                            className={cn(
                                "p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm transition-all duration-300",
                                "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100",
                                "hover:shadow-lg hover:scale-[1.02]",
                                "border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                            )}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full flex-shrink-0"></div>
                                <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 truncate">
                                    {item.domain}
                                </h3>
                                <span className="ml-auto text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full">
                                    {item.iconsItems?.length || 0}
                                </span>
                            </div>

                            {/* Skills Grid */}
                            {item.iconsItems && (
                                <div
                                    className={cn(
                                        "grid gap-3 sm:gap-4",
                                        item.iconsItems.length <= 2
                                            ? "grid-cols-2"
                                            : item.iconsItems.length <= 4
                                                ? "grid-cols-2 sm:grid-cols-4"
                                                : item.iconsItems.length <= 6
                                                    ? "grid-cols-3 sm:grid-cols-3"
                                                    : "grid-cols-3 sm:grid-cols-4"
                                    )}
                                >
                                    {item.iconsItems.map((skill, i) => (
                                        <div
                                            key={i}
                                            className="group flex flex-col items-center p-2 sm:p-3 rounded-lg transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 min-h-[70px] sm:min-h-[80px] justify-center"
                                            title={skill.name}
                                        >
                                            <div className="text-lg sm:text-xl mb-1 sm:mb-2 transition-transform duration-300 group-hover:scale-110">
                                                {skill.icon}
                                            </div>
                                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
}
