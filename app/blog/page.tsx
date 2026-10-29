import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";

import {
  getPublicArticles,
  getPublishedCategoryNames,
  type ArticleSummary,
} from "@/lib/articleService";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Writing & Insights",
  description: "Engineering insights, architecture decisions, AI systems, product thinking and lessons from turning business needs into technical solutions.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Writing & Insights | Enstso J",
    description: "Insights across product and solution engineering, agentic AI, software and cloud architecture.",
    url: "/blog",
  },
};

type BlogPageProps = {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
};

export default async function Blog({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const query = (params.q ?? "").slice(0, 100);
  const category = (params.category ?? "").slice(0, 100);
  const requestedPage = Number(params.page ?? "1");
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  let articles: ArticleSummary[] = [];
  let categories: string[] = [];
  let total = 0;
  let unavailable = false;
  try {
    const [result, categoryNames] = await Promise.all([
      getPublicArticles({ search: query, category, page, pageSize: 8 }),
      getPublishedCategoryNames(),
    ]);
    articles = result.articles;
    total = result.total;
    categories = categoryNames;
  } catch {
    unavailable = true;
  }

  const showFeatured = page === 1 && !query && !category && articles.length > 0;
  const featured = showFeatured ? articles[0] : null;
  const list = showFeatured ? articles.slice(1) : articles;
  const totalPages = Math.max(1, Math.ceil(total / 8));

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <header className="grid gap-8 border-b border-slate-200 pb-12 dark:border-slate-800 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <p className="eyebrow">Technical writing</p>
          <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.055em] text-slate-950 dark:text-white sm:text-6xl">Writing &amp; Insights</h1>
        </div>
        <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400 md:justify-self-end">
          Engineering insights, architecture decisions, AI systems, product thinking and lessons learned from turning complex needs into practical solutions.
        </p>
      </header>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <form action="/blog" className="relative max-w-2xl" role="search">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            name="q"
            defaultValue={query}
            placeholder="Search by title, topic or idea"
            aria-label="Search articles"
            className="h-12 w-full rounded-md border border-slate-300 bg-white pl-11 pr-28 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
          {category && <input type="hidden" name="category" value={category} />}
          <button type="submit" className="absolute right-1.5 top-1.5 h-9 rounded bg-slate-950 px-4 text-xs font-semibold text-white focus-ring dark:bg-blue-500 dark:text-slate-950">Search</button>
        </form>
        {(query || category) && <Link className="text-link text-sm font-semibold" href="/blog">Clear filters</Link>}
      </div>

      {categories.length > 0 && (
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Article categories">
          <Link href={blogUrl({ q: query })} className={categoryPill(!category)}>All</Link>
          {categories.map((name) => (
            <Link key={name} href={blogUrl({ q: query, category: name })} className={categoryPill(category === name)}>{name}</Link>
          ))}
        </nav>
      )}

      {unavailable ? (
        <EmptyState title="Writing is temporarily unavailable" description="The portfolio remains online while the article database reconnects. Please try again shortly." />
      ) : articles.length === 0 ? (
        <EmptyState
          title={query || category ? "No articles match these filters" : "The first article is on its way"}
          description={query || category ? "Try a broader search or another category." : "Published technical writing will appear here."}
        />
      ) : (
        <>
          {featured && (
            <article className="mt-14 grid overflow-hidden border-y border-slate-200 bg-white/45 dark:border-slate-800 dark:bg-slate-950/20 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="eyebrow">Featured · {featured.category.name}</p>
                <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.035em] text-slate-950 dark:text-white sm:text-4xl">{featured.name}</h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">{featured.description}</p>
                <p className="mt-7 font-mono text-xs text-slate-500">{formatDate(featured.publishedAt ?? featured.date)} · {featured.readingTime} min read</p>
                <Link className="primary-button mt-8" href={`/blog/${featured.slug}`}>Read article <ArrowRight className="h-4 w-4" /></Link>
              </div>
              <ArticleCover article={featured} />
            </article>
          )}

          <div className="mt-14 divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {list.map((article, index) => (
              <article key={article.id} className="grid gap-5 py-8 md:grid-cols-[6rem_1fr_12rem] md:items-start md:gap-8">
                <div><p className="font-mono text-sm text-blue-600 dark:text-blue-400">{String(index + (featured ? 2 : 1)).padStart(2, "0")}</p><p className="mt-2 text-xs text-slate-500">{article.readingTime} min</p></div>
                <div><p className="eyebrow normal-case tracking-normal">{article.category.name}</p><h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white"><Link className="hover:text-blue-700 dark:hover:text-blue-300" href={`/blog/${article.slug}`}>{article.name}</Link></h2><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">{article.description}</p></div>
                <div className="md:text-right"><time className="text-xs text-slate-500" dateTime={(article.publishedAt ?? article.date).toISOString()}>{formatDate(article.publishedAt ?? article.date)}</time><Link className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-300" href={`/blog/${article.slug}`}>Read <ArrowRight className="h-4 w-4" /></Link></div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-10 flex items-center justify-between" aria-label="Article pagination">
              {page > 1 ? <Link className="secondary-button" href={blogUrl({ q: query, category, page: page - 1 })}><ArrowLeft className="h-4 w-4" /> Previous</Link> : <span />}
              <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
              {page < totalPages ? <Link className="secondary-button" href={blogUrl({ q: query, category, page: page + 1 })}>Next <ArrowRight className="h-4 w-4" /></Link> : <span />}
            </nav>
          )}
        </>
      )}
    </div>
  );
}

function ArticleCover({ article }: { article: ArticleSummary }) {
  if (article.coverImage) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={article.coverImage} alt="" className="h-full min-h-72 w-full object-cover" loading="lazy" />;
  }
  return <div className="flex min-h-72 items-end bg-[linear-gradient(145deg,#172554,#0a0f1b_58%,#2563eb)] p-9"><p className="max-w-xs font-mono text-sm leading-6 text-blue-100">{article.category.name}<br />Engineering notes by Enstso J</p></div>;
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="mt-14 border-y border-slate-200 py-16 dark:border-slate-800"><h2 className="text-2xl font-semibold text-slate-950 dark:text-white">{title}</h2><p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{description}</p></div>;
}

function categoryPill(active: boolean) {
  return `rounded-full border px-3.5 py-2 text-xs font-semibold transition focus-ring ${active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-blue-400 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"}`;
}

function blogUrl({ q = "", category = "", page }: { q?: string; category?: string; page?: number }) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (page && page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
}
