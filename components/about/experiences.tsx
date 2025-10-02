"use client";

import { useState } from "react";
import { ExperienceItem } from "@/lib/data/experiences";
import { ChevronDown, ChevronUp, Calendar, MapPin, Building } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperiencesProps {
    items: ExperienceItem[];
}

export default function Experiences({ items }: Readonly<ExperiencesProps>) {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set());

    const toggleItem = (index: number) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index);
        } else {
            newOpenItems.add(index);
        }
        setOpenItems(newOpenItems);
    };

    return (
        <div className="relative">
            {/* Timeline Line - Responsive */}
            <div className="absolute left-4 sm:left-6 lg:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-400 to-blue-200 dark:from-blue-400 dark:via-blue-600 dark:to-blue-800"></div>

            <div className="space-y-4 sm:space-y-6">
                {items.map((item, index) => {
                    const isOpen = openItems.has(index);
                    return (
                        <div key={index} className="relative">
                            {/* Timeline Dot - Responsive */}
                            <div className="absolute left-2.5 sm:left-4.5 lg:left-6.5 top-4 sm:top-6 w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded-full border-2 sm:border-4 border-white dark:border-slate-800 shadow-lg z-10"></div>

                            {/* Experience Card - Mobile First */}
                            <div className="ml-8 sm:ml-12 lg:ml-16 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-300">

                                {/* Header - Responsive Layout */}
                                <div
                                    className="p-4 sm:p-6 cursor-pointer"
                                    onClick={() => toggleItem(index)}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            {/* Company & Position - Mobile Stack */}
                                            <div className="flex items-start gap-2 sm:gap-3 mb-3">
                                                <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                                                    <Building className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1 leading-tight">
                                                        {item.jobOccupation}
                                                    </h3>
                                                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm sm:text-base">
                                                        {item.name}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Location & Date - Mobile Stack */}
                                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                                    <span className="truncate">{item.place}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                                    <span>
                                                        {item.startDate.toLocaleDateString("en-GB", {
                                                            year: "numeric",
                                                            month: "short",
                                                        })}{" "}
                                                        -{" "}
                                                        {item.endDate === "present"
                                                            ? "Present"
                                                            : new Date(item.endDate).toLocaleDateString("en-GB", {
                                                                year: "numeric",
                                                                month: "short",
                                                            })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Toggle Button - Mobile Friendly */}
                                        <button
                                            className="ml-2 p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
                                            aria-label={isOpen ? "Collapse details" : "Expand details"}
                                        >
                                            {isOpen ? (
                                                <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 dark:text-slate-400" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 dark:text-slate-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Expandable Content - Mobile Optimized */}
                                {isOpen && (
                                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                                        <div className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-700">
                                            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                                                Key Responsibilities & Achievements:
                                            </h4>
                                            <ul className="space-y-2 sm:space-y-3">
                                                {item.description.map((desc, i) => (
                                                    <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                                                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-600 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                                        <span className="leading-relaxed">{desc}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
