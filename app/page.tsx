import Link from "next/link";
import {
  Bot,
  Boxes,
  CloudCog,
  Code2,
  Database,
  ShieldCheck,
} from "lucide-react";

import { DownloadResume } from "@/components/home/downloadResume";
import { SocialMedia } from "@/components/home/socialMedia";
import { featuredProjects } from "@/lib/data/featuredProjects";

const expertise = [
  {
    icon: Code2,
    title: "Software Engineering",
    description: "C#, .NET, Python, TypeScript, Angular, React, APIs",
  },
  {
    icon: Bot,
    title: "AI & Agentic Systems",
    description: "LLMs, RAG, LangGraph, LangChain, OCR, NLP",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "PostgreSQL, data quality, Kafka, Redis, processing pipelines",
  },
  {
    icon: CloudCog,
    title: "Cloud & Platform",
    description: "Kubernetes, IBM Cloud, Docker, CI/CD, Terraform, observability",
  },
  {
    icon: Boxes,
    title: "Product & Solution Engineering",
    description: "Requirements, system design, UML, Agile, technical trade-offs",
  },
  {
    icon: ShieldCheck,
    title: "Secure Engineering",
    description: "OWASP, IAM/RBAC, privacy by design, secure APIs & AI workflows",
  },
] as const;

const metrics = [
  { value: "200+", label: "Enterprise Users" },
  { value: "~80", label: "Apps in Cloud Transformation" },
  { value: ">95%", label: "Processing-Time Reduction" },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <section className="relative mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-12 lg:py-20">
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-600/5 to-transparent" />

        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-800 shadow-sm dark:bg-blue-900/30 dark:text-blue-200 sm:mb-8 sm:px-4 sm:py-2 sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
          <span className="hidden sm:inline">Open to opportunities &amp; technical projects</span>
          <span className="sm:hidden">Open to opportunities</span>
        </div>

        <h1 className="mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-3xl font-bold leading-tight text-transparent dark:from-white dark:via-blue-400 dark:to-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
          IT Engineer &amp; Analyst
          <span className="mt-2 block text-xl text-slate-600 dark:text-slate-400 sm:text-2xl md:text-3xl lg:text-4xl">
            Enstso JANVIER
          </span>
        </h1>

        <p className="mx-auto mb-4 max-w-4xl px-2 text-lg font-semibold leading-relaxed text-slate-700 dark:text-slate-200 sm:text-xl md:text-2xl">
          Building software, AI, data and cloud systems from business requirements to production.
        </p>
        <p className="mx-auto mb-8 max-w-3xl px-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base md:text-lg">
          I combine enterprise software engineering, cloud-native platforms, data processing and applied AI to design reliable, scalable and useful technical solutions.
        </p>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {["Enterprise Engineering", "AI · Software · Data · Cloud"].map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 sm:text-sm"
            >
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" aria-hidden="true" />
              {label}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-12" aria-labelledby="expertise-heading">
        <div className="mb-8 text-center sm:mb-12">
          <h2 id="expertise-heading" className="mb-3 text-2xl font-bold text-slate-900 dark:text-white sm:mb-4 sm:text-3xl">
            Core Expertise
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 sm:text-lg">
            From problem framing and system design to delivery, operation and improvement.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {expertise.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:border-blue-300 hover:shadow-lg motion-reduce:transform-none dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-600 sm:rounded-2xl sm:p-6"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 rounded-lg bg-blue-50 p-2 transition-colors group-hover:bg-blue-100 dark:bg-blue-900/30 dark:group-hover:bg-blue-900/50 sm:rounded-xl sm:p-3">
                    <Icon className="h-6 w-6 text-blue-600 sm:h-8 sm:w-8" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-12" aria-labelledby="featured-work-heading">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="featured-work-heading" className="mb-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Featured Work
            </h2>
            <p className="max-w-2xl text-slate-600 dark:text-slate-400">
              Selected systems spanning agent engineering, enterprise workflows, product delivery and privacy-oriented document AI.
            </p>
          </div>
          <Link
            href="/project"
            className="w-fit font-semibold text-blue-600 underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400"
          >
            View all projects →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 sm:gap-6">
          {featuredProjects.map((project) => (
            <article
              key={project.slug}
              className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:border-blue-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-600 sm:rounded-2xl sm:p-6"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                {project.category}
              </p>
              <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
                {project.name}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {project.description}
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 6).map((technology) => (
                  <span key={technology} className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-800 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {technology}
                  </span>
                ))}
              </div>
              {project.metric && (
                <p className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {project.metric}
                </p>
              )}
              <Link
                href={`/project#${project.slug}`}
                className="w-fit text-sm font-semibold text-blue-600 underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400"
              >
                View details →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-slate-100 to-blue-50 px-4 py-12 dark:from-slate-800 dark:to-slate-900 sm:px-6 sm:py-16 lg:px-12" aria-labelledby="impact-heading">
        <div className="mx-auto max-w-4xl">
          <h2 id="impact-heading" className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Engineering Impact
          </h2>
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 sm:gap-8">
            {metrics.map((metric) => (
              <article key={metric.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:rounded-2xl sm:p-6">
                <p className="mb-1 text-2xl font-bold text-blue-600 sm:mb-2 sm:text-3xl">{metric.value}</p>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 sm:text-base">{metric.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-12" aria-labelledby="contact-heading">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white shadow-2xl sm:rounded-3xl sm:p-8">
          <h2 id="contact-heading" className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl md:text-3xl">
            Interested in working together?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-base text-blue-100 sm:mb-8 sm:text-lg">
            Explore my projects, review my experience or get in touch to discuss software, AI, data and cloud opportunities.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/project"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-white px-5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700"
            >
              View Projects
            </Link>
            <DownloadResume variant="light" />
            <SocialMedia tone="light" />
          </div>
        </div>
      </section>
    </div>
  );
}
