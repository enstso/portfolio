"use client";

import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";

import type { ExperienceItem } from "@/lib/data/experiences";
import { cn } from "@/lib/utils";

export default function Experiences({ items }: { items: ExperienceItem[] }) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0, 1]));

  function toggle(index: number) {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index); else next.add(index);
      return next;
    });
  }

  return (
    <div className="border-y border-slate-200 dark:border-slate-800">
      {items.map((item, index) => {
        const open = openItems.has(index);
        const panelId = `experience-${index}`;
        return (
          <article key={`${item.name}-${item.startDate}`} className="border-b border-slate-200 last:border-b-0 dark:border-slate-800">
            <button type="button" onClick={() => toggle(index)} aria-expanded={open} aria-controls={panelId} className="grid w-full gap-4 py-7 text-left focus-ring sm:grid-cols-[10rem_1fr_auto] sm:items-start sm:gap-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-blue-600 dark:text-blue-400">{item.displayDate ?? `${formatMonth(item.startDate)} – ${item.endDate === "present" ? "Present" : formatMonth(item.endDate)}`}</p>
              <div><h3 className="text-xl font-semibold text-slate-950 dark:text-white">{item.jobOccupation}</h3><p className="mt-1 font-medium text-slate-700 dark:text-slate-300">{item.name}{item.employment ? ` · ${item.employment}` : ""}</p><p className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-500"><MapPin className="h-3.5 w-3.5" /> {item.place}</p></div>
              <ChevronDown className={cn("h-5 w-5 text-slate-400 transition-transform", open && "rotate-180")} />
            </button>
            {open && <div id={panelId} className="pb-8 sm:ml-[12rem] sm:pr-14"><ul className="grid gap-3 text-sm leading-6 text-slate-600 dark:text-slate-400 lg:grid-cols-2">{item.description.map((description) => <li key={description} className="flex items-start gap-3"><span className="mt-2.5 h-1 w-1 shrink-0 bg-blue-600 dark:bg-blue-400" /><span>{description}</span></li>)}</ul></div>}
          </article>
        );
      })}
    </div>
  );
}

function formatMonth(date: string) {
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
