"use client";

import { useState } from "react";
import { SkillsList } from "@/lib/data/skills";
import { cn } from "@/lib/utils";

interface SkillsProps {
    list: SkillsList[];
}

export default function Skills({ list }: SkillsProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredList = selectedCategory
        ? list.filter(category => category.domain === selectedCategory)
        : list;

    return (
        <div className="space-y-8">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center">
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={cn(
                        "px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border",
                        selectedCategory === null
                            ? "bg-blue-600 text-white shadow-lg border-blue-600"
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
                                ? "bg-blue-600 text-white shadow-lg border-blue-600"
                                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                        )}
                    >
                        {category.domain}
                    </button>
                ))}
            </div>

            {/* Skills Cards Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredList?.map((item, index) =>
                    item.domain ? (
                        <div
                            key={index}
                            className={cn(
                                "p-6 rounded-2xl shadow-sm transition-all duration-300",
                                "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100",
                                "hover:shadow-lg hover:scale-[1.02]",
                                "border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                            )}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                                    {item.domain}
                                </h3>
                            </div>

                            {/* Skills Grid */}
                            {item.iconsItems && (
                                <div className="grid grid-cols-4 gap-3">
                                    {item.iconsItems.map((skill, i) => (
                                        <div
                                            key={i}
                                            className="group flex flex-col items-center p-2 rounded-lg transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                            title={skill.name}
                                        >
                                            <div className="text-xl mb-1 transition-transform duration-300 group-hover:scale-110">
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
