"use client";

import { useMemo, useState } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  Tag,
} from "lucide-react";

import type { AdditionalProject, ProjectCategory } from "@/lib/data/additionalProjects";
import { projectCategories } from "@/lib/data/additionalProjects";
import { cn } from "@/lib/utils";

const projectsPerPage = 6;

type AdditionalProjectsProps = {
  projects: AdditionalProject[];
};

export function AdditionalProjects({ projects }: AdditionalProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<"All" | ProjectCategory>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [openProjects, setOpenProjects] = useState<Set<string>>(new Set());

  const filteredProjects = useMemo(
    () =>
      selectedCategory === "All"
        ? projects
        : projects.filter((project) => project.category === selectedCategory),
    [projects, selectedCategory],
  );

  const categoryCounts = useMemo(
    () =>
      Object.fromEntries(
        projectCategories.map((category) => [
          category,
          category === "All"
            ? projects.length
            : projects.filter((project) => project.category === category).length,
        ]),
      ) as Record<(typeof projectCategories)[number], number>,
    [projects],
  );

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));
  const visibleProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage,
  );

  function selectCategory(category: "All" | ProjectCategory) {
    setSelectedCategory(category);
    setCurrentPage(1);
    setOpenProjects(new Set());
  }

  function toggleProject(slug: string) {
    setOpenProjects((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  return (
    <div>
      <div className="mb-7 flex flex-wrap gap-2" aria-label="Filter projects by category">
        {projectCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => selectCategory(category)}
            aria-pressed={selectedCategory === category}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900",
              selectedCategory === category
                ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:text-blue-400",
            )}
          >
            {category} <span className="opacity-75">({categoryCounts[category]})</span>
          </button>
        ))}
      </div>

      <div className="space-y-4 sm:space-y-6">
        {visibleProjects.map((project) => {
          const isOpen = openProjects.has(project.slug);
          const panelId = `additional-project-${project.slug}`;

          return (
            <article
              key={project.slug}
              className="rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-blue-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-600 sm:rounded-2xl"
            >
              <button
                type="button"
                onClick={() => toggleProject(project.slug)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-start justify-between gap-4 rounded-xl p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 sm:rounded-2xl sm:p-6"
              >
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                    {project.category}
                  </p>
                  <h3 className="mb-2 text-lg font-bold leading-tight text-slate-900 dark:text-white sm:text-xl">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
                    <Calendar className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <time dateTime={project.date}>{formatProjectDate(project.date)}</time>
                  </div>
                </div>
                <span className="rounded-lg p-2 text-slate-600 dark:text-slate-400" aria-hidden="true">
                  {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </span>
              </button>

              {isOpen && (
                <div id={panelId} className="px-4 pb-4 sm:px-6 sm:pb-6">
                  <div className="space-y-5 border-t border-slate-200 pt-4 dark:border-slate-700">
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                      {project.description}
                    </p>
                    <div>
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <Tag className="h-4 w-4" aria-hidden="true" />
                        Technologies
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <span key={technology} className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-800 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
                    >
                      View repository
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {totalPages > 1 && (
        <nav className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row" aria-label="Additional projects pagination">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Previous
          </button>
          <p className="text-sm text-slate-600 dark:text-slate-400" aria-live="polite">
            Page {currentPage} of {totalPages}
          </p>
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            Next
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  );
}

function formatProjectDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
