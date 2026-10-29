"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Bold,
  Code2,
  Eye,
  Heading2,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  LoaderCircle,
  Quote,
  Save,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { MarkdownContent } from "@/components/articles/markdown-content";
import { slugifyArticleTitle } from "@/lib/article";

type Category = { id: number; name: string };
type EditorArticle = {
  id: number;
  name: string;
  slug: string;
  description: string;
  content: string;
  categoryId: number;
  coverImage: string | null;
  status: "DRAFT" | "PUBLISHED";
};

const starterContent = `## Start with the problem

Explain the context, constraints and why the problem matters.

## Architecture and decisions

Describe the solution, important trade-offs and implementation details.

## What I learned

Close with practical lessons readers can apply.`;

export function ArticleEditor({ categories, article }: { categories: Category[]; article?: EditorArticle }) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [name, setName] = useState(article?.name ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(article));
  const [description, setDescription] = useState(article?.description ?? "");
  const [content, setContent] = useState(article?.content ?? starterContent);
  const [categoryId, setCategoryId] = useState(article?.categoryId ?? categories[0]?.id ?? 0);
  const [coverImage, setCoverImage] = useState(article?.coverImage ?? "");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(article?.status ?? "DRAFT");
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [language, setLanguage] = useState("typescript");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    function warn(event: BeforeUnloadEvent) {
      if (!dirty) return;
      event.preventDefault();
    }
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function updateTitle(value: string) {
    setName(value);
    if (!slugTouched) setSlug(slugifyArticleTitle(value));
    setDirty(true);
  }

  function wrap(before: string, after = before, placeholder = "text") {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end) || placeholder;
    const next = `${content.slice(0, start)}${before}${selected}${after}${content.slice(end)}`;
    setContent(next);
    setDirty(true);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  function insertLink() {
    const url = window.prompt("Link URL (https://…)");
    if (url) wrap("[", `](${url})`, "link text");
  }

  function insertImage() {
    const url = window.prompt("Image URL (https://…)");
    if (url) wrap("![", `](${url})`, "image description");
  }

  async function save(nextStatus: "DRAFT" | "PUBLISHED", openPreview = false) {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const endpoint = article ? `/api/admin/articles/${article.id}` : "/api/admin/articles";
      const response = await fetch(endpoint, {
        method: article ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug, description, content, categoryId, coverImage, status: nextStatus }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save the article");
      setStatus(nextStatus);
      setDirty(false);
      setMessage(nextStatus === "PUBLISHED" ? "Article published." : "Draft saved.");
      const id = result.article.id as number;
      if (openPreview) router.push(`/admin/articles/${id}/preview`);
      else if (!article) router.replace(`/admin/articles/${id}/edit`);
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save the article");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">{article ? "Edit article" : "New article"}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{article ? article.name : "Create a technical article"}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => save(status, true)} disabled={saving} className="secondary-button"><Eye className="h-4 w-4" /> Private preview</button>
          <button type="button" onClick={() => save(status === "PUBLISHED" ? "PUBLISHED" : "DRAFT")} disabled={saving} className="secondary-button"><Save className="h-4 w-4" /> {status === "PUBLISHED" ? "Save changes" : "Save draft"}</button>
          {status === "PUBLISHED" ? (
            <button type="button" onClick={() => save("DRAFT")} disabled={saving} className="secondary-button">Unpublish</button>
          ) : (
            <button type="button" onClick={() => save("PUBLISHED")} disabled={saving} className="primary-button"><Send className="h-4 w-4" /> Publish</button>
          )}
        </div>
      </div>

      {(message || error) && <p className={`mb-6 border px-4 py-3 text-sm ${error ? "border-red-300 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300" : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"}`} role="status">{error || message}</p>}

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_19rem]">
        <div>
          <label className="block"><span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Title</span><input value={name} onChange={(event) => updateTitle(event.target.value)} maxLength={160} className="mt-2 w-full border-0 border-b border-slate-300 bg-transparent px-0 py-3 text-3xl font-semibold tracking-tight outline-none focus:border-blue-500 dark:border-slate-700" placeholder="A clear, specific title" /></label>
          <label className="mt-6 block"><span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Description</span><textarea value={description} onChange={(event) => { setDescription(event.target.value); setDirty(true); }} maxLength={320} rows={3} className="mt-2 w-full rounded-md border border-slate-300 bg-white p-3 text-sm leading-6 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900" placeholder="What will the reader learn?" /></label>

          <div className="mt-8 border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-2 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-1" aria-label="Formatting toolbar">
                <ToolButton label="Heading" onClick={() => wrap("## ", "", "Heading")}><Heading2 /></ToolButton>
                <ToolButton label="Bold" onClick={() => wrap("**", "**", "bold text")}><Bold /></ToolButton>
                <ToolButton label="Italic" onClick={() => wrap("_", "_", "italic text")}><Italic /></ToolButton>
                <ToolButton label="Bulleted list" onClick={() => wrap("- ", "", "list item")}><List /></ToolButton>
                <ToolButton label="Numbered list" onClick={() => wrap("1. ", "", "list item")}><ListOrdered /></ToolButton>
                <ToolButton label="Quote" onClick={() => wrap("> ", "", "quote")}><Quote /></ToolButton>
                <ToolButton label="Link" onClick={insertLink}><Link2 /></ToolButton>
                <ToolButton label="Image" onClick={insertImage}><ImageIcon /></ToolButton>
                <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Code block language" className="ml-1 h-9 rounded border border-slate-300 bg-white px-2 text-xs dark:border-slate-700 dark:bg-slate-950">
                  {['typescript','javascript','python','csharp','sql','bash','json','yaml','text'].map((item) => <option key={item}>{item}</option>)}
                </select>
                <ToolButton label="Code block" onClick={() => wrap(`\n\`\`\`${language}\n`, "\n```\n", "code")}><Code2 /></ToolButton>
              </div>
              <div className="flex rounded border border-slate-300 p-0.5 text-xs dark:border-slate-700">
                <button type="button" onClick={() => setMode("write")} className={`rounded px-3 py-1.5 font-semibold ${mode === "write" ? "bg-slate-900 text-white dark:bg-blue-500 dark:text-slate-950" : "text-slate-500"}`}>Write</button>
                <button type="button" onClick={() => setMode("preview")} className={`rounded px-3 py-1.5 font-semibold ${mode === "preview" ? "bg-slate-900 text-white dark:bg-blue-500 dark:text-slate-950" : "text-slate-500"}`}>Preview</button>
              </div>
            </div>
            {mode === "write" ? (
              <textarea ref={textareaRef} value={content} onChange={(event) => { setContent(event.target.value); setDirty(true); }} className="min-h-[38rem] w-full resize-y bg-transparent p-5 font-mono text-sm leading-7 outline-none" aria-label="Article content" spellCheck />
            ) : (
              <div className="min-h-[38rem] p-6 sm:p-8"><MarkdownContent content={content} /></div>
            )}
          </div>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <div className="border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-semibold text-slate-950 dark:text-white">Article settings</h2>
            <label className="mt-5 block text-xs font-semibold text-slate-600 dark:text-slate-400">URL slug<input value={slug} onChange={(event) => { setSlug(slugifyArticleTitle(event.target.value)); setSlugTouched(true); setDirty(true); }} className="mt-2 w-full rounded border border-slate-300 bg-transparent p-2.5 font-mono text-xs text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:text-white" /></label>
            <label className="mt-5 block text-xs font-semibold text-slate-600 dark:text-slate-400">Category<select value={categoryId} onChange={(event) => { setCategoryId(Number(event.target.value)); setDirty(true); }} className="mt-2 w-full rounded border border-slate-300 bg-transparent p-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:text-white">{categories.map((category) => <option className="bg-white dark:bg-slate-900" key={category.id} value={category.id}>{category.name}</option>)}</select></label>
            <label className="mt-5 block text-xs font-semibold text-slate-600 dark:text-slate-400">Cover image URL<input type="url" value={coverImage} onChange={(event) => { setCoverImage(event.target.value); setDirty(true); }} placeholder="https://…" className="mt-2 w-full rounded border border-slate-300 bg-transparent p-2.5 text-xs text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:text-white" /></label>
            <div className="mt-5 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-800"><p>Status: <span className="font-semibold text-slate-800 dark:text-slate-200">{status === "PUBLISHED" ? "Published" : "Draft"}</span></p><p className="mt-2">Images must use persistent external HTTPS URLs.</p></div>
          </div>
          <Link href="/admin/articles" className="text-link text-sm">← Back to articles</Link>
        </aside>
      </div>

      {saving && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/30" aria-live="polite"><div className="flex items-center gap-3 rounded bg-white px-5 py-4 text-sm font-semibold text-slate-900 shadow-xl dark:bg-slate-900 dark:text-white"><LoaderCircle className="h-5 w-5 animate-spin" /> Saving article…</div></div>}
    </div>
  );
}

function ToolButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} title={label} aria-label={label} className="inline-flex h-9 w-9 items-center justify-center rounded text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-ring dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white [&_svg]:h-4 [&_svg]:w-4">{children}</button>;
}
