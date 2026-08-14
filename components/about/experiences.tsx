"use client";

import { useState } from "react";
import { Building, Calendar, ChevronDown, ChevronUp, MapPin } from "lucide-react";

import type { ExperienceItem } from "@/lib/data/experiences";

type ExperiencesProps = {
  items: ExperienceItem[];
};

export default function Experiences({ items }: ExperiencesProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

  function toggleItem(index: number) {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className="relative">
      <div className="absolute bottom-0 left-4 top-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-400 to-blue-200 dark:from-blue-400 dark:via-blue-600 dark:to-blue-800 sm:left-6 lg:left-8" aria-hidden="true" />

      <div className="space-y-4 sm:space-y-6">
        {items.map((item, index) => {
          const isOpen = openItems.has(index);
          const panelId = `experience-${index}`;
          return (
            <article key={`${item.name}-${item.startDate}`} className="relative">
              <div className="absolute left-2.5 top-4 z-10 h-3 w-3 rounded-full border-2 border-white bg-blue-600 shadow-lg dark:border-slate-800 sm:left-[18px] sm:top-6 sm:h-4 sm:w-4 sm:border-4 lg:left-[26px]" aria-hidden="true" />

              <div className="ml-8 rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 sm:ml-12 lg:ml-16">
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-start justify-between gap-3 rounded-xl p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 sm:p-6"
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex items-start gap-2 sm:gap-3">
                      <div className="flex-shrink-0 rounded-lg bg-blue-100 p-1.5 dark:bg-blue-900/30 sm:p-2">
                        <Building className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 text-base font-bold leading-tight text-slate-900 dark:text-white sm:text-lg">
                          {item.jobOccupation}
                        </h3>
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 sm:text-base">
                          {item.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 text-xs text-slate-600 dark:text-slate-400 sm:flex-row sm:flex-wrap sm:gap-4 sm:text-sm">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        {item.place}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        <time dateTime={item.startDate}>{formatMonth(item.startDate)}</time>
                        <span aria-hidden="true">–</span>
                        {item.endDate === "present" ? (
                          <span>Present</span>
                        ) : (
                          <time dateTime={item.endDate}>{formatMonth(item.endDate)}</time>
                        )}
                      </span>
                    </div>
                  </div>

                  <span className="flex-shrink-0 rounded-lg p-2 text-slate-600 dark:text-slate-400" aria-hidden="true">
                    {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div id={panelId} className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
                      <h4 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Selected responsibilities &amp; outcomes
                      </h4>
                      <ul className="space-y-2.5">
                        {item.description.map((description) => (
                          <li key={description} className="flex items-start gap-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
                            <span>{description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function formatMonth(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
