"use client";

import { useState } from "react";
import { IProject } from "@/lib/projectService";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Calendar, ExternalLink, Tag } from "lucide-react";

interface ProjectProps {
  items: IProject[];
}

export default function Projects({ items }: ProjectProps) {
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
      <div className="space-y-4 sm:space-y-6">
        {items.map((item, index) => {
          const isOpen = openItems.has(index);
          return (
              <div
                  key={index}
                  className={cn(
                      "bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-300",
                      "hover:shadow-md sm:hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600"
                  )}
              >
                {/* Header - Mobile Optimized */}
                <div
                    className="p-4 sm:p-6 cursor-pointer"
                    onClick={() => toggleItem(index)}
                >
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="truncate">
                          {new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: window.innerWidth < 640 ? "short" : "long",
                            day: "numeric"
                          })}
                        </span>
                      </div>
                    </div>

                    <button
                        className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
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

                {/* Expandable Content - Mobile First */}
                {isOpen && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-700 space-y-4 sm:space-y-6">

                        {/* Description */}
                        <div>
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 sm:mb-3">
                            Project Description
                          </h4>
                          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Technologies - Mobile Grid */}
                        <div>
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                            <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-slate-600 dark:text-slate-400" />
                            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                              Technologies Used
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {item.technologies.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-1 sm:px-3 sm:py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800"
                                >
                                  {tech}
                                </span>
                            ))}
                          </div>
                        </div>

                        {/* Project Link - Mobile Friendly */}
                        <div className="pt-2">
                          <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-3 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View Project
                          </a>
                        </div>
                      </div>
                    </div>
                )}
              </div>
          );
        })}
      </div>
  );
}
