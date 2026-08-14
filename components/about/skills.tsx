"use client";

import { useState } from "react";
import {
  Bot,
  Boxes,
  ChevronDown,
  CloudCog,
  Code2,
  Database,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { SkillsList } from "@/lib/data/skills";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, LucideIcon> = {
  "Software Engineering": Code2,
  "AI & Agentic Systems": Bot,
  "Data Engineering": Database,
  "Cloud & Platform": CloudCog,
  "Product & Solution Engineering": Boxes,
  "Secure Engineering": ShieldCheck,
  "Additional Tools": Wrench,
};

type SkillsProps = {
  list: SkillsList[];
};

export default function Skills({ list }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const filteredList = selectedCategory
    ? list.filter((category) => category.domain === selectedCategory)
    : list;

  function selectCategory(category: string | null) {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="relative">
        <div className="block sm:hidden">
          <button
            type="button"
            onClick={() => setIsDropdownOpen((open) => !open)}
            aria-expanded={isDropdownOpen}
            aria-controls="skills-mobile-menu"
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
          >
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {selectedCategory ?? "All Skills"}
            </span>
            <ChevronDown className={cn("h-4 w-4 text-slate-500 transition-transform", isDropdownOpen && "rotate-180")} aria-hidden="true" />
          </button>

          {isDropdownOpen && (
            <>
              <button
                type="button"
                aria-label="Close skill categories"
                className="fixed inset-0 z-40 cursor-default bg-black/20"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div id="skills-mobile-menu" className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-800">
                <CategoryButton label="All Skills" active={selectedCategory === null} onClick={() => selectCategory(null)} mobile />
                {list.map((category) => (
                  <CategoryButton
                    key={category.domain}
                    label={category.domain}
                    active={selectedCategory === category.domain}
                    onClick={() => selectCategory(category.domain)}
                    mobile
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="hidden flex-wrap justify-center gap-3 sm:flex" aria-label="Filter skill categories">
          <CategoryButton label="All Skills" active={selectedCategory === null} onClick={() => selectCategory(null)} />
          {list.map((category) => (
            <CategoryButton
              key={category.domain}
              label={category.domain}
              active={selectedCategory === category.domain}
              onClick={() => selectCategory(category.domain)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {filteredList.map((category) => {
          const Icon = categoryIcons[category.domain] ?? Wrench;
          return (
            <article
              key={category.domain}
              className="rounded-xl border border-slate-200 bg-white p-4 text-slate-900 shadow-sm transition duration-300 hover:border-blue-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-blue-600 sm:rounded-2xl sm:p-6"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 sm:text-lg">
                  {category.domain}
                </h3>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {category.description}
              </p>
              <ul className="flex flex-wrap gap-2" aria-label={`${category.domain} skills`}>
                {category.skills.map((skill) => (
                  <li key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-700/60 dark:text-slate-200 sm:text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}

type CategoryButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  mobile?: boolean;
};

function CategoryButton({ label, active, onClick, mobile = false }: CategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        mobile ? "w-full rounded-lg px-3 py-2 text-left text-sm" : "rounded-full border px-5 py-2.5 text-sm",
        active
          ? "border-blue-600 bg-blue-600 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:text-blue-400",
      )}
    >
      {label}
    </button>
  );
}
