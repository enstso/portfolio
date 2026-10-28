import { notFound, permanentRedirect } from "next/navigation";

import { getPublishedArticleById } from "@/lib/articleService";

export const dynamic = "force-dynamic";

export default async function LegacyArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) notFound();
  const article = await getPublishedArticleById(id).catch(() => null);
  if (!article) notFound();
  permanentRedirect(`/blog/${article.slug}`);
}
