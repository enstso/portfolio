import "server-only";

import type { ArticleStatus, Prisma } from "@prisma/client";

import { calculateReadingTime, type ArticleInput } from "@/lib/article";
import { prisma } from "@/prisma/client";

const articleSummarySelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  date: true,
  status: true,
  publishedAt: true,
  coverImage: true,
  readingTime: true,
  categoryId: true,
  createdAt: true,
  updatedAt: true,
  category: { select: { id: true, name: true } },
} satisfies Prisma.ArticleSelect;

export class ArticleServiceError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

export type ArticleSummary = Prisma.ArticleGetPayload<{ select: typeof articleSummarySelect }>;
export type ArticleWithContent = Prisma.ArticleGetPayload<{
  include: { category: true };
}>;

type PublicArticleQuery = {
  search?: string;
  category?: string;
  page?: number;
  pageSize?: number;
};

export async function getPublicArticles({
  search = "",
  category = "",
  page = 1,
  pageSize = 8,
}: PublicArticleQuery = {}) {
  const where: Prisma.ArticleWhereInput = {
    status: "PUBLISHED",
    ...(category ? { category: { name: category } } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { content: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const safePage = Math.max(1, page);
  const safePageSize = Math.min(20, Math.max(1, pageSize));
  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      select: articleSummarySelect,
      orderBy: [{ publishedAt: "desc" }, { date: "desc" }],
      skip: (safePage - 1) * safePageSize,
      take: safePageSize,
    }),
    prisma.article.count({ where }),
  ]);

  return { articles, total, page: safePage, pageSize: safePageSize };
}

export function getLatestPublishedArticles(limit = 3) {
  return prisma.article.findMany({
    where: { status: "PUBLISHED" },
    select: articleSummarySelect,
    orderBy: [{ publishedAt: "desc" }, { date: "desc" }],
    take: Math.min(6, Math.max(1, limit)),
  });
}

export function getPublishedSitemapArticles() {
  return prisma.article.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
    orderBy: { publishedAt: "desc" },
  });
}

export function getPublishedArticleBySlug(slug: string) {
  return prisma.article.findFirst({
    where: {
      status: "PUBLISHED",
      OR: [{ slug }, { previousSlugs: { has: slug } }],
    },
    include: { category: true },
  });
}

export function getPublishedArticleById(id: number) {
  return prisma.article.findFirst({
    where: { id, status: "PUBLISHED" },
    select: { slug: true },
  });
}

export async function getAdjacentPublishedArticles(
  article: Pick<ArticleWithContent, "id" | "publishedAt" | "date">,
) {
  const position = article.publishedAt ?? article.date;
  const [previous, next] = await Promise.all([
    prisma.article.findFirst({
      where: { status: "PUBLISHED", id: { not: article.id }, publishedAt: { lt: position } },
      orderBy: { publishedAt: "desc" },
      select: { name: true, slug: true },
    }),
    prisma.article.findFirst({
      where: { status: "PUBLISHED", id: { not: article.id }, publishedAt: { gt: position } },
      orderBy: { publishedAt: "asc" },
      select: { name: true, slug: true },
    }),
  ]);
  return { previous, next };
}

export async function getPublishedCategoryNames() {
  const categories = await prisma.category.findMany({
    where: { articles: { some: { status: "PUBLISHED" } } },
    orderBy: { name: "asc" },
    select: { name: true },
  });
  return categories.map((category) => category.name);
}

export function getArticleCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } });
}

export async function getAdminArticles({
  search = "",
  status = "",
  username = "",
}: { search?: string; status?: string; username?: string } = {}) {
  const normalizedStatus: ArticleStatus | undefined =
    status === "DRAFT" || status === "PUBLISHED" ? status : undefined;
  const filters: Prisma.ArticleWhereInput[] = [];
  if (normalizedStatus) filters.push({ status: normalizedStatus });
  if (username) filters.push({ OR: [{ authorId: null }, { author: { username } }] });
  if (search) {
    filters.push({
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    });
  }
  return prisma.article.findMany({
    where: filters.length ? { AND: filters } : {},
    select: articleSummarySelect,
    orderBy: { updatedAt: "desc" },
  });
}

export async function getAdminArticleById(id: number, username: string) {
  const article = await prisma.article.findUnique({ where: { id }, include: { category: true } });
  if (!article) return null;
  await assertOwnership(article.authorId, username);
  return article;
}

export async function createArticle(input: ArticleInput, username: string) {
  const [author, existingSlug, existingName, category] = await Promise.all([
    prisma.user.findFirst({ where: { username }, select: { id: true } }),
    prisma.article.findFirst({
      where: { OR: [{ slug: input.slug }, { previousSlugs: { has: input.slug } }] },
      select: { id: true },
    }),
    prisma.article.findUnique({ where: { name: input.name }, select: { id: true } }),
    prisma.category.findUnique({ where: { id: input.categoryId }, select: { id: true } }),
  ]);
  if (!author) throw new ArticleServiceError("The authenticated user no longer exists.", 401);
  if (existingSlug) throw new ArticleServiceError("That URL slug is already in use.", 409);
  if (existingName) throw new ArticleServiceError("An article with that title already exists.", 409);
  if (!category) throw new ArticleServiceError("Choose a valid category.", 400);

  const now = new Date();
  return prisma.article.create({
    data: {
      ...input,
      coverImage: input.coverImage,
      readingTime: calculateReadingTime(input.content),
      publishedAt: input.status === "PUBLISHED" ? now : null,
      date: now,
      authorId: author.id,
    },
    include: { category: true },
  });
}

export async function updateArticle(id: number, input: ArticleInput, username: string) {
  const current = await prisma.article.findUnique({
    where: { id },
    select: { authorId: true, slug: true, previousSlugs: true, status: true, publishedAt: true },
  });
  if (!current) throw new ArticleServiceError("Article not found.", 404);
  await assertOwnership(current.authorId, username);

  const [slugOwner, nameOwner, category] = await Promise.all([
    prisma.article.findFirst({
      where: {
        id: { not: id },
        OR: [{ slug: input.slug }, { previousSlugs: { has: input.slug } }],
      },
      select: { id: true },
    }),
    prisma.article.findUnique({ where: { name: input.name }, select: { id: true } }),
    prisma.category.findUnique({ where: { id: input.categoryId }, select: { id: true } }),
  ]);
  if (slugOwner && slugOwner.id !== id) {
    throw new ArticleServiceError("That URL slug is already in use.", 409);
  }
  if (nameOwner && nameOwner.id !== id) {
    throw new ArticleServiceError("An article with that title already exists.", 409);
  }
  if (!category) throw new ArticleServiceError("Choose a valid category.", 400);

  const isFirstPublish = current.status !== "PUBLISHED" && input.status === "PUBLISHED";
  const previousSlugs =
    current.slug === input.slug
      ? current.previousSlugs
      : Array.from(new Set([...current.previousSlugs, current.slug])).slice(-20);
  const publishedAt = input.status === "PUBLISHED" ? current.publishedAt ?? new Date() : null;

  return prisma.article.update({
    where: { id },
    data: {
      ...input,
      coverImage: input.coverImage,
      previousSlugs,
      readingTime: calculateReadingTime(input.content),
      publishedAt,
      ...(isFirstPublish ? { date: publishedAt ?? new Date() } : {}),
    },
    include: { category: true },
  });
}

export async function setArticleStatus(id: number, status: ArticleStatus, username: string) {
  const article = await prisma.article.findUnique({
    where: { id },
    select: { authorId: true, publishedAt: true },
  });
  if (!article) throw new ArticleServiceError("Article not found.", 404);
  await assertOwnership(article.authorId, username);
  return prisma.article.update({
    where: { id },
    data: {
      status,
      publishedAt: status === "PUBLISHED" ? article.publishedAt ?? new Date() : null,
    },
    select: articleSummarySelect,
  });
}

export async function deleteArticle(id: number, username: string) {
  const article = await prisma.article.findUnique({ where: { id }, select: { authorId: true } });
  if (!article) throw new ArticleServiceError("Article not found.", 404);
  await assertOwnership(article.authorId, username);
  await prisma.article.delete({ where: { id } });
}

async function assertOwnership(authorId: number | null, username: string) {
  const user = await prisma.user.findFirst({ where: { username }, select: { id: true } });
  if (!user) throw new ArticleServiceError("Authentication required.", 401);
  if (authorId !== null && authorId !== user.id) {
    throw new ArticleServiceError("You are not allowed to manage this article.", 403);
  }
}

// Compatibility helpers for legacy public endpoints.
export async function getArticles(skip = 0, take = 10) {
  const result = await getPublicArticles({ page: Math.floor(skip / take) + 1, pageSize: take });
  return { articles: result.articles, total: result.total };
}

export function getAllArticleByCategory(categoryId: number) {
  return prisma.article.findMany({ where: { categoryId, status: "PUBLISHED" }, include: { category: true } });
}

export function getArticleById(id: number) {
  return prisma.article.findFirst({ where: { id, status: "PUBLISHED" }, include: { category: true } });
}

export function getArticlesBySubject(subject: string) {
  return prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      OR: [
        { name: { contains: subject, mode: "insensitive" } },
        { description: { contains: subject, mode: "insensitive" } },
      ],
    },
    include: { category: true },
  });
}
