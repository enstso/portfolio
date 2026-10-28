"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, LoaderCircle, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function ArticleRowActions({ id, slug, status, name }: { id: number; slug: string; status: "DRAFT" | "PUBLISHED"; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function changeStatus() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to update status");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to update status");
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (!window.confirm(`Delete “${name}”? This cannot be undone.`)) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Unable to delete article");
      }
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to delete article");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Link href={`/admin/articles/${id}/edit`} className="inline-flex h-9 items-center gap-1.5 rounded border border-slate-300 px-3 text-xs font-semibold text-slate-700 focus-ring dark:border-slate-700 dark:text-slate-200"><Pencil className="h-3.5 w-3.5" /> Edit</Link>
        <Link href={status === "PUBLISHED" ? `/blog/${slug}` : `/admin/articles/${id}/preview`} className="inline-flex h-9 items-center gap-1.5 rounded border border-slate-300 px-3 text-xs font-semibold text-slate-700 focus-ring dark:border-slate-700 dark:text-slate-200"><Eye className="h-3.5 w-3.5" /> View</Link>
        <button type="button" disabled={loading} onClick={changeStatus} className="h-9 rounded border border-slate-300 px-3 text-xs font-semibold text-slate-700 focus-ring disabled:opacity-50 dark:border-slate-700 dark:text-slate-200">{loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : status === "PUBLISHED" ? "Unpublish" : "Publish"}</button>
        <button type="button" disabled={loading} onClick={remove} className="inline-flex h-9 items-center justify-center rounded px-2.5 text-red-600 hover:bg-red-50 focus-ring disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-950/30" aria-label={`Delete ${name}`}><Trash2 className="h-4 w-4" /></button>
      </div>
      {error && <p className="mt-2 text-xs text-red-600 dark:text-red-400" role="alert">{error}</p>}
    </div>
  );
}
