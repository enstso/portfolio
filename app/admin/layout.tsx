import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/app/session";

export const metadata: Metadata = {
  title: { default: "Article Studio", template: "%s | Article Studio" },
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login?next=/admin/articles");

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950/30">
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <div><p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">ENSTSO. Studio</p><p className="mt-1 text-xs text-slate-500">Signed in as {session.username}</p></div>
          <nav className="flex items-center gap-1 text-sm font-semibold" aria-label="Article administration">
            <Link className="rounded px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-ring dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white" href="/admin/articles">Articles</Link>
            <Link className="rounded bg-blue-600 px-3 py-2 text-white focus-ring" href="/admin/articles/new">New article</Link>
            <Link className="rounded px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-ring dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white" href="/blog">View site</Link>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
