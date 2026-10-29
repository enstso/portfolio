import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, Boxes, CloudCog, ExternalLink, Mail } from "lucide-react";

import { featuredProjects } from "@/lib/data/featuredProjects";
import { ExperiencesList } from "@/lib/data/experiences";
import { getLatestPublishedArticles, type ArticleSummary } from "@/lib/articleService";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

const expertise = [
  {
    icon: Boxes,
    title: "Product & Solution Engineering",
    description: "Connecting business requirements with technical execution through product thinking, functional analysis, solution design and collaborative delivery.",
    tools: "Requirements · Functional analysis · Solution design · Delivery",
  },
  {
    icon: Bot,
    title: "Agentic AI & Intelligent Systems",
    description: "Designing AI-powered applications and intelligent workflows that turn emerging technologies into practical business solutions.",
    tools: "LLM applications · RAG · Agents · Orchestration · AI integration",
  },
  {
    icon: CloudCog,
    title: "Software, Cloud & Architecture",
    description: "Building scalable, reliable software and cloud-native systems, from architecture and implementation to deployment and operational improvement.",
    tools: ".NET · Python · APIs · Kubernetes · CI/CD · System design",
  },
] as const;

const metrics = [
  { value: "200+", label: "enterprise users supported" },
  { value: "100+", label: "applications in cloud transformation" },
  { value: ">95%", label: "processing-time reduction" },
] as const;

export default async function Home() {
  let latestArticles: ArticleSummary[] = [];
  try {
    latestArticles = await getLatestPublishedArticles(3);
  } catch {
    // The portfolio remains available when PostgreSQL is temporarily offline.
  }

  const currentExperiences = ExperiencesList.slice(0, 2);

  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-12 sm:px-8 sm:pt-20 lg:grid-cols-[1.08fr_0.75fr] lg:items-center lg:px-12 lg:pb-28 lg:pt-24">
        <div>
          <p className="eyebrow">AI Builder · Product &amp; Solution Engineering</p>
          <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
            Turning complex business challenges into intelligent solutions.
          </h1>
          <p className="mt-7 text-lg font-semibold text-slate-900 dark:text-slate-100">Enstso J · AI Builder @ Salesforce</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg sm:leading-8">
            I combine product thinking, business analysis and hands-on engineering to design, build and deliver intelligent solutions that create real business value.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="primary-button" href="/project">Explore My Work <ArrowRight className="h-4 w-4" /></Link>
            <Link className="secondary-button" href="/blog">Read My Articles</Link>
          </div>
          <div className="mt-8 flex gap-5 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a className="text-link" href={siteConfig.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="text-link" href={siteConfig.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="absolute -inset-5 -z-10 border border-blue-200/70 dark:border-blue-950" aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-200 shadow-2xl shadow-blue-950/15 dark:bg-slate-800 dark:shadow-black/30">
            <Image
              src="/images/enstso-portrait.webp"
              alt="Professional portrait of Enstso J"
              fill
              priority
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 70vw, 92vw"
              className="object-cover object-center"
            />
          </div>
          <p className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-500">
            <span>Paris, France</span><span>Product × Technology × Business</span>
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-white/55 dark:border-slate-800 dark:bg-slate-950/30" aria-labelledby="work-heading">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-end">
            <div><p className="eyebrow">Selected work</p><h2 id="work-heading" className="section-title mt-4">Systems built around the problem—not the trend.</h2></div>
            <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 md:justify-self-end">Business needs translated into useful products, intelligent workflows and reliable technical systems.</p>
          </div>
          <div className="mt-14 divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <article key={project.slug} className="grid gap-5 py-8 md:grid-cols-[5rem_1fr_1fr_auto] md:items-start md:gap-8">
                <p className="font-mono text-sm text-blue-600 dark:text-blue-400">0{index + 1}</p>
                <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{project.category}</p><h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">{project.name}</h3>{project.period && <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400">{project.period}</p>}{project.collaborators && <p className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-300">Built with {project.collaborators.join(", ")}</p>}</div>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{project.description}</p>
                <Link className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline dark:text-blue-300" href={`/project#${project.slug}`}>Case overview <ArrowRight className="h-4 w-4" /></Link>
              </article>
            ))}
          </div>
          <Link className="secondary-button mt-8" href="/project">View all projects <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28" aria-labelledby="expertise-heading">
        <p className="eyebrow">Core expertise</p>
        <h2 id="expertise-heading" className="section-title mt-4 max-w-3xl">Product, technology and business—connected through delivery.</h2>
        <div className="mt-14 grid border-y border-slate-200 dark:border-slate-800 md:grid-cols-3 md:divide-x md:divide-slate-200 md:dark:divide-slate-800">
          {expertise.map((item) => {
            const Icon = item.icon;
            return <article key={item.title} className="border-b border-slate-200 py-8 last:border-b-0 dark:border-slate-800 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0">
              <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h3 className="mt-6 text-xl font-semibold text-slate-950 dark:text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.description}</p>
              <p className="mt-6 font-mono text-xs leading-5 text-slate-500 dark:text-slate-500">{item.tools}</p>
            </article>;
          })}
        </div>
      </section>

      <section className="bg-[#0a0f1b] text-white" aria-labelledby="impact-heading">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="eyebrow text-blue-400">Experience &amp; impact</p>
              <h2 id="impact-heading" className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Enterprise context. Product awareness. Hands-on engineering.</h2>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-700 pt-7">
                {metrics.map((metric) => <div key={metric.value}><p className="text-2xl font-semibold text-blue-300 sm:text-3xl">{metric.value}</p><p className="mt-2 text-xs leading-5 text-slate-400">{metric.label}</p></div>)}
              </div>
            </div>
            <div className="border-l border-slate-700 pl-6 sm:pl-10">
              {currentExperiences.map((experience, index) => (
                <article key={experience.name} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[1.86rem] top-1.5 h-2 w-2 bg-blue-400 sm:-left-[2.86rem]" aria-hidden="true" />
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-blue-300">{experience.displayDate ?? "Current"}</p>
                  <h3 className="mt-2 text-xl font-semibold">{experience.jobOccupation}</h3>
                  <p className="mt-1 text-sm text-slate-400">{experience.name} · {experience.place}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">{experience.description[0]}</p>
                  {index === 1 && <p className="mt-3 text-sm leading-6 text-slate-400">{experience.description[3]}</p>}
                </article>
              ))}
              <Link href="/about" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-white">Full experience <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28" aria-labelledby="writing-heading">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="eyebrow">Latest writing</p><h2 id="writing-heading" className="section-title mt-4">Notes from product and engineering work.</h2></div>
          <Link className="text-link text-sm font-semibold" href="/blog">All articles</Link>
        </div>
        {latestArticles.length ? (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {latestArticles.map((article) => (
              <article key={article.id} className="grid gap-4 py-7 sm:grid-cols-[10rem_1fr_auto] sm:items-center">
                <div><p className="eyebrow normal-case tracking-normal">{article.category.name}</p><time className="mt-2 block text-xs text-slate-500" dateTime={(article.publishedAt ?? article.date).toISOString()}>{formatDate(article.publishedAt ?? article.date)} · {article.readingTime} min</time></div>
                <div><h3 className="text-lg font-semibold text-slate-950 dark:text-white">{article.name}</h3><p className="mt-1 line-clamp-1 text-sm text-slate-600 dark:text-slate-400">{article.description}</p></div>
                <Link className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-300" href={`/blog/${article.slug}`}>Read <ArrowRight className="h-4 w-4" /></Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-10"><p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">Long-form articles will appear here as they are published, covering engineering insights, architecture decisions, AI systems and product thinking.</p></div>
        )}
      </section>

      <section className="border-t border-slate-200 bg-blue-50/70 dark:border-slate-800 dark:bg-blue-950/20" aria-labelledby="contact-heading">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-[1fr_auto] md:items-center lg:px-12 lg:py-20">
          <div><p className="eyebrow">Start a conversation</p><h2 id="contact-heading" className="section-title mt-4">Let’s turn a complex problem into a clear solution path.</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">Product and solution engineering, intelligent systems, architecture and business-oriented technical collaboration.</p></div>
          <a className="primary-button md:justify-self-end" href={`mailto:${siteConfig.email}`}><Mail className="h-4 w-4" /> Email Enstso <ExternalLink className="h-3.5 w-3.5" /></a>
        </div>
      </section>
    </div>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
}
