import { ArticleEditor } from "@/components/admin/article-editor";
import { getArticleCategories } from "@/lib/articleService";

export const dynamic = "force-dynamic";

export default async function NewArticle() {
  const categories = await getArticleCategories().catch(() => []);
  if (!categories.length) return <AdminDatabaseMessage />;
  return <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12"><ArticleEditor categories={categories} /></div>;
}

function AdminDatabaseMessage() {
  return <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8"><h1 className="text-3xl font-semibold text-slate-950 dark:text-white">The editor needs its article categories</h1><p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">Connect PostgreSQL and apply the included Prisma migration, then reload this page.</p></div>;
}
