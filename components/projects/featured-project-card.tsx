import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";

import type { FeaturedProject } from "@/lib/data/featuredProjects";

export function FeaturedProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  const projectUrl = project.externalUrl ?? project.githubUrl;
  return (
    <article id={project.slug} className="scroll-mt-28 border-b border-slate-200 py-10 last:border-b-0 dark:border-slate-800 lg:grid lg:grid-cols-[7rem_0.9fr_1.1fr] lg:gap-10 lg:py-14">
      <p className="font-mono text-sm font-semibold text-blue-600 dark:text-blue-400">{String(index).padStart(2, "0")}</p>
      <div className="mt-4 lg:mt-0"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{project.category}</p><h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">{project.name}</h3>{project.private && <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-slate-500"><LockKeyhole className="h-3.5 w-3.5" /> Private case study</p>}{project.metric && <p className="mt-6 border-l-2 border-blue-500 pl-4 text-sm font-semibold leading-6 text-slate-800 dark:text-slate-200">{project.metric}</p>}</div>
      <div className="mt-7 lg:mt-0"><p className="text-sm leading-7 text-slate-600 dark:text-slate-400">{project.description}</p><h4 className="mt-7 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Engineering decisions</h4><ul className="mt-4 space-y-3">{project.highlights.map((highlight) => <li key={highlight} className="flex items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300"><Check className="mt-1 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" /> {highlight}</li>)}</ul><div className="mt-7 flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="border border-slate-300 px-2.5 py-1 font-mono text-[11px] text-slate-600 dark:border-slate-700 dark:text-slate-400">{technology}</span>)}</div>{projectUrl && <a href={projectUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline focus-ring dark:text-blue-300">View project <ArrowUpRight className="h-4 w-4" /></a>}</div>
    </article>
  );
}
