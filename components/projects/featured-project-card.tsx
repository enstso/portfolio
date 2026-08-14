import { CheckCircle2, ExternalLink, LockKeyhole } from "lucide-react";

import type { FeaturedProject } from "@/lib/data/featuredProjects";

type FeaturedProjectCardProps = {
  project: FeaturedProject;
  index: number;
};

export function FeaturedProjectCard({ project, index }: FeaturedProjectCardProps) {
  const projectUrl = project.externalUrl ?? project.githubUrl;

  return (
    <article
      id={project.slug}
      className="scroll-mt-28 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:border-blue-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-600 sm:rounded-2xl sm:p-7"
    >
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {String(index).padStart(2, "0")} · {project.category}
          </p>
          <h3 className="text-xl font-bold leading-tight text-slate-900 dark:text-white sm:text-2xl">
            {project.name}
          </h3>
        </div>
        {project.private && (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-700/60 dark:text-slate-300">
            <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
            Private case study
          </span>
        )}
      </div>

      <p className="mb-5 max-w-4xl leading-relaxed text-slate-600 dark:text-slate-400">
        {project.description}
      </p>

      <ul className="mb-5 grid gap-2 text-sm text-slate-700 dark:text-slate-300 md:grid-cols-2">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2.5 leading-relaxed">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <span key={technology} className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-800 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            {technology}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
        {project.metric ? (
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {project.metric}
          </p>
        ) : (
          <span />
        )}

        {projectUrl && (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
          >
            View project
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
