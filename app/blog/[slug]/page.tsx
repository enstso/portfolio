import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { notFound, permanentRedirect } from "next/navigation";

import { MarkdownContent } from "@/components/articles/markdown-content";
import { extractHeadings } from "@/lib/article";
import {
  getAdjacentPublishedArticles,
  getPublishedArticleBySlug,
} from "@/lib/articleService";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug).catch(() => null);
  if (!article) return { title: "Article not found", robots: { index: false, follow: false } };
  const canonical = `/blog/${article.slug}`;
  const image = article.coverImage || "/opengraph-image";
  return {
    title: article.name,
    description: article.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: article.name,
      description: article.description,
      url: canonical,
      publishedTime: (article.publishedAt ?? article.date).toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: [siteConfig.name],
      images: [image],
    },
    twitter: { card: "summary_large_image", title: article.name, description: article.description, images: [image] },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug).catch(() => null);
  if (!article) notFound();
  if (article.slug !== slug) permanentRedirect(`/blog/${article.slug}`);

  const headings = extractHeadings(article.content);
  const adjacent = await getAdjacentPublishedArticles(article).catch(() => ({ previous: null, next: null }));
  const publishedAt = article.publishedAt ?? article.date;
  const articleUrl = `${siteConfig.url}/blog/${article.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.name,
    description: article.description,
    datePublished: publishedAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    mainEntityOfPage: articleUrl,
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Person", name: siteConfig.name },
    ...(article.coverImage ? { image: article.coverImage } : {}),
  };

  return (
    <article>
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-700 focus-ring dark:text-slate-400 dark:hover:text-blue-300" href="/blog"><ArrowLeft className="h-4 w-4" /> Back to writing</Link>
          <p className="eyebrow mt-12">{article.category.name}</p>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-slate-950 dark:text-white sm:text-6xl">{article.name}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">{article.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-slate-500">
            <time dateTime={publishedAt.toISOString()}>{formatDate(publishedAt)}</time>
            <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> {article.readingTime} min read</span>
            <span>By Enstso Janvier</span>
          </div>
        </div>
      </header>

      {article.coverImage && (
        <div className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 lg:px-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.coverImage} alt="" className="max-h-[38rem] w-full border border-slate-200 object-cover dark:border-slate-800" />
        </div>
      )}

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[13rem_minmax(0,46rem)] lg:justify-center lg:px-12 lg:py-20">
        <aside className="hidden lg:block">
          {headings.length > 0 && (
            <nav className="sticky top-28 border-l border-slate-200 pl-5 dark:border-slate-800" aria-label="Table of contents">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">On this page</p>
              <ol className="mt-4 space-y-3 text-xs leading-5 text-slate-500">
                {headings.map((heading, index) => <li key={`${heading.id}-${index}`} className={heading.level === 3 ? "pl-3" : ""}><a className="transition hover:text-blue-700 dark:hover:text-blue-300" href={`#${heading.id}`}>{heading.text}</a></li>)}
              </ol>
            </nav>
          )}
        </aside>
        <MarkdownContent content={article.content} />
      </div>

      <nav className="mx-auto grid max-w-5xl gap-px border-y border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 sm:grid-cols-2" aria-label="More articles">
        <AdjacentArticle label="Previous" article={adjacent.previous} direction="left" />
        <AdjacentArticle label="Next" article={adjacent.next} direction="right" />
      </nav>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
    </article>
  );
}

function AdjacentArticle({ label, article, direction }: { label: string; article: { name: string; slug: string } | null; direction: "left" | "right" }) {
  if (!article) return <span className="min-h-32 bg-[var(--background)]" />;
  return <Link href={`/blog/${article.slug}`} className={`group flex min-h-32 flex-col justify-center bg-[var(--background)] p-6 transition hover:bg-blue-50 dark:hover:bg-blue-950/20 ${direction === "right" ? "sm:text-right" : ""}`}><span className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400 ${direction === "right" ? "sm:justify-end" : ""}`}>{direction === "left" && <ArrowLeft className="h-3.5 w-3.5" />}{label}{direction === "right" && <ArrowRight className="h-3.5 w-3.5" />}</span><span className="mt-2 font-semibold text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">{article.name}</span></Link>;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
}
