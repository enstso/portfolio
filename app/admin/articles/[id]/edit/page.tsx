import { notFound } from "next/navigation";

import { getSession } from "@/app/session";
import { ArticleEditor } from "@/components/admin/article-editor";
import { getAdminArticleById, getArticleCategories } from "@/lib/articleService";

export const dynamic = "force-dynamic";

export default async function EditArticle({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) notFound();
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) notFound();
  const [article, categories] = await Promise.all([
    getAdminArticleById(id, session.username).catch(() => null),
    getArticleCategories().catch(() => []),
  ]);
  if (!article || !categories.length) notFound();

  return <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12"><ArticleEditor categories={categories} article={{ id: article.id, name: article.name, slug: article.slug, description: article.description, content: article.content, categoryId: article.categoryId, coverImage: article.coverImage, status: article.status }} /></div>;
}
