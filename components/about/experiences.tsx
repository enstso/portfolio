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
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-400 to-blue-200 dark:from-blue-400 dark:via-blue-600 dark:to-blue-800"></div>

            <div className="space-y-6">
                {items.map((item, index) => {
                    const isOpen = openItems.has(index);
                    return (
                        <div key={index} className="relative">
                            {/* Timeline Dot */}
                            <div className="absolute left-6 top-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-slate-800 shadow-lg z-10"></div>

                            {/* Experience Card */}
                            <div className="ml-16 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-750 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 group">

                                {/* Header */}
                                <div
                                    className="p-6 cursor-pointer"
                                    onClick={() => toggleItem(index)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            {/* Company & Position */}
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                                                    <Building className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {item.jobOccupation}
                                                    </h3>
                                                    <p className="text-blue-600 dark:text-blue-400 font-semibold">
                                                        {item.name}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Location & Date */}
                                            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    {item.place}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
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
                                                </div>
                                            </div>
                                        </div>

                                        {/* Toggle Button */}
                                        <button
                                            className="ml-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                            aria-label={isOpen ? "Collapse details" : "Expand details"}
                                        >
                                            {isOpen ? (
                                                <ChevronUp className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Expandable Content */}
                                {isOpen && (
                                    <div className="px-6 pb-6">
                                        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                                            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                                                Key Responsibilities & Achievements:
                                            </h4>
                                            <ul className="space-y-3">
                                                {item.description.map((desc, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
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
