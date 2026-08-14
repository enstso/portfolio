import type { Metadata } from "next";

import { AdditionalProjects } from "@/components/projects/additional-projects";
import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { additionalProjects } from "@/lib/data/additionalProjects";
import { featuredProjects } from "@/lib/data/featuredProjects";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects — Software, AI, Data & Cloud",
  description:
    "Featured and selected engineering projects by Enstso JANVIER across software, agentic AI, data, cloud platforms and secure engineering.",
  alternates: { canonical: "/project" },
  openGraph: {
    title: `Projects | ${siteConfig.shortTitle}`,
    description:
      "Selected software, AI, data, cloud and secure-engineering projects, presented with their architecture and measurable outcomes.",
    url: "/project",
  },
};

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h1 className="mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:via-blue-400 dark:to-white sm:text-4xl md:text-5xl">
            Projects
          </h1>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            Curated engineering work across enterprise software, agentic AI, data processing, cloud platforms and privacy-oriented systems.
          </p>
        </header>

        <section className="mx-auto mb-16 max-w-6xl sm:mb-20" aria-labelledby="featured-projects-heading">
          <div className="mb-7 sm:mb-9">
            <h2 id="featured-projects-heading" className="mb-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Featured Projects
            </h2>
            <p className="max-w-3xl text-slate-600 dark:text-slate-400">
              Four high-signal case studies, maintained locally so they remain available without a database, GitHub token or external API call.
            </p>
          </div>
          <div className="space-y-5 sm:space-y-7">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard key={project.slug} project={project} index={index + 1} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl" aria-labelledby="additional-projects-heading">
          <div className="mb-7 sm:mb-9">
            <h2 id="additional-projects-heading" className="mb-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              More Projects
            </h2>
            <p className="max-w-3xl text-slate-600 dark:text-slate-400">
              A curated selection of software, infrastructure, data and controlled security work from the wider project archive.
            </p>
          </div>
          <AdditionalProjects projects={additionalProjects} />
        </section>
      </div>
    </div>
  );
}
