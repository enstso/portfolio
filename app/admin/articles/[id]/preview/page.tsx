/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";

import { getSession } from "@/app/session";
import { MarkdownContent } from "@/components/articles/markdown-content";
import { getAdminArticleById } from "@/lib/articleService";

export const dynamic = "force-dynamic";

export default async function ArticlePreview({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) notFound();
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) notFound();
  const article = await getAdminArticleById(id, session.username).catch(() => null);
  if (!article) notFound();

  return (
    <div>
      <div className="border-b border-amber-300 bg-amber-50 px-5 py-3 text-center text-xs font-semibold text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">Private preview · {article.status === "PUBLISHED" ? "Published" : "Draft"}</div>
      <article className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <Link className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-700 focus-ring dark:text-slate-400" href={`/admin/articles/${article.id}/edit`}><ArrowLeft className="h-4 w-4" /> Back to editor</Link>
        <header className="mt-12 border-b border-slate-200 pb-10 dark:border-slate-800"><p className="eyebrow">{article.category.name}</p><h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.05em] text-slate-950 dark:text-white sm:text-5xl">{article.name}</h1><p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">{article.description}</p><p className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-slate-500"><Clock3 className="h-3.5 w-3.5" /> {article.readingTime} min read</p></header>
        {article.coverImage && <div className="mt-10"><img src={article.coverImage} alt="" className="max-h-[34rem] w-full object-cover" /></div>}
        <MarkdownContent content={article.content} className="mt-12" />
      </article>
    </div>
  );
}
