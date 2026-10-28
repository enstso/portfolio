import Link from "next/link";
import { Plus, Search } from "lucide-react";

import { getSession } from "@/app/session";
import { ArticleRowActions } from "@/components/admin/article-row-actions";
import { getAdminArticles, type ArticleSummary } from "@/lib/articleService";

export const dynamic = "force-dynamic";

export default async function ArticlesAdmin({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  const params = await searchParams;
  const query = (params.q ?? "").slice(0, 100);
  const status = params.status === "DRAFT" || params.status === "PUBLISHED" ? params.status : "";
  const session = await getSession();
  let articles: ArticleSummary[] = [];
  let unavailable = false;
  try {
    articles = await getAdminArticles({ search: query, status, username: session?.username });
  } catch {
    unavailable = true;
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="eyebrow">Publishing</p><h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">Articles</h1><p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Write, preview and publish without a code deployment.</p></div>
        <Link className="primary-button" href="/admin/articles/new"><Plus className="h-4 w-4" /> New article</Link>
      </div>

      <form className="mt-9 grid gap-3 border-y border-slate-200 py-5 dark:border-slate-800 sm:grid-cols-[1fr_12rem_auto]" action="/admin/articles">
        <label className="relative"><span className="sr-only">Search articles</span><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input className="h-11 w-full rounded border border-slate-300 bg-white pl-10 pr-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900" name="q" defaultValue={query} placeholder="Search articles" /></label>
        <select name="status" defaultValue={status} className="h-11 rounded border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900"><option value="">All statuses</option><option value="DRAFT">Drafts</option><option value="PUBLISHED">Published</option></select>
        <button type="submit" className="secondary-button h-11">Filter</button>
      </form>

      {unavailable ? (
        <div className="mt-8 border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">The article database is unavailable. Verify the connection and applied migrations.</div>
      ) : articles.length === 0 ? (
        <div className="mt-8 border border-dashed border-slate-300 p-10 text-center dark:border-slate-700"><h2 className="text-xl font-semibold text-slate-950 dark:text-white">No articles found</h2><p className="mt-2 text-sm text-slate-500">Create a new draft or clear the current filters.</p></div>
      ) : (
        <div className="mt-8 overflow-x-auto border-y border-slate-200 dark:border-slate-800">
          <table className="w-full min-w-[800px] text-left">
            <thead><tr className="text-xs uppercase tracking-[0.1em] text-slate-500"><th className="px-3 py-4 font-semibold">Article</th><th className="px-3 py-4 font-semibold">Status</th><th className="px-3 py-4 font-semibold">Updated</th><th className="px-3 py-4 font-semibold">Actions</th></tr></thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {articles.map((article) => (
                <tr key={article.id} className="align-top">
                  <td className="px-3 py-5"><p className="font-semibold text-slate-950 dark:text-white">{article.name}</p><p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">{article.description}</p><p className="mt-2 font-mono text-[11px] text-blue-600 dark:text-blue-400">/blog/{article.slug}</p></td>
                  <td className="px-3 py-5"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${article.status === "PUBLISHED" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300" : "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"}`}>{article.status === "PUBLISHED" ? "Published" : "Draft"}</span><p className="mt-2 text-xs text-slate-500">{article.category.name}</p></td>
                  <td className="px-3 py-5 text-xs text-slate-500">{formatDate(article.updatedAt)}</td>
                  <td className="px-3 py-5"><ArticleRowActions id={article.id} slug={article.slug} status={article.status} name={article.name} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
}
