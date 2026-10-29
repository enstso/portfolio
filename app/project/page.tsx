import type { Metadata } from "next";

import { AdditionalProjects } from "@/components/projects/additional-projects";
import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { featuredProjects } from "@/lib/data/featuredProjects";
import { getAdditionalProjects } from "@/lib/projectService";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Work — Product, AI & Solution Engineering",
  description: "Selected work by Enstso J connecting business needs, product thinking and hands-on engineering across agentic AI, software and cloud architecture.",
  alternates: { canonical: "/project" },
  openGraph: { title: `Work | ${siteConfig.shortTitle}`, description: "Selected engineering projects presented through their problems, decisions and supported outcomes.", url: "/project" },
};

export default async function ProjectPage() {
  const additionalProjects = await getAdditionalProjects();
  return (
    <div>
      <header className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:px-12 lg:pb-24 lg:pt-24">
        <div><p className="eyebrow">Selected product &amp; engineering work</p><h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-slate-950 dark:text-white sm:text-6xl">From business need to intelligent solution.</h1></div>
        <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400 lg:justify-self-end">Projects presented through the problem, product and functional choices, architecture decisions, implementation constraints and measurable value.</p>
      </header>

      <section className="border-t border-slate-200 dark:border-slate-800" aria-labelledby="featured-projects-heading">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <p className="eyebrow">Case overviews</p><h2 id="featured-projects-heading" className="section-title mt-4">Featured projects</h2>
          <div className="mt-12 border-y border-slate-200 dark:border-slate-800">{featuredProjects.map((project, index) => <FeaturedProjectCard key={project.slug} project={project} index={index + 1} />)}</div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-slate-950/20" aria-labelledby="additional-projects-heading">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mb-10 grid gap-5 md:grid-cols-[1fr_1fr] md:items-end"><div><p className="eyebrow">Repository archive</p><h2 id="additional-projects-heading" className="section-title mt-4">More projects</h2></div><p className="text-sm leading-6 text-slate-600 dark:text-slate-400 md:justify-self-end">A broader archive of public work, available even if external services are temporarily offline.</p></div>
          <AdditionalProjects projects={additionalProjects} />
        </div>
      </section>
    </div>
  );
}
