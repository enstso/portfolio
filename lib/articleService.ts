import "server-only";

import type { Prisma } from "@prisma/client";

import { prisma } from "@/prisma/client";

export interface ArticlesResponse {
  articles: IArticle[];
  total: number;
}

export interface IArticle {
  id: number;
  name: string;
  description: string;
  content: string;
  date: Date;
  categoryId: number;
  category?: {
    id: number;
    name: string;
  };
}

export async function getArticles(
  skip = 0,
  take = 10,
  sortBy = "date",
  sortOrder = "desc",
  categoryId?: number,
): Promise<ArticlesResponse> {
  const orderByField = ["date", "name", "categoryId"].includes(sortBy) ? sortBy : "date";
  const orderByDirection = sortOrder === "asc" ? "asc" : "desc";
  const orderBy: Prisma.ArticleOrderByWithRelationInput = {
    [orderByField]: orderByDirection,
  };
  const where: Prisma.ArticleWhereInput = categoryId ? { categoryId } : {};

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy,
      skip,
      take,
      select: {
        id: true,
        name: true,
        description: true,
        content: true,
        date: true,
        categoryId: true,
        category: { select: { id: true, name: true } },
      },
    }),
    prisma.article.count({ where }),
  ]);

  return { articles, total };
}

export function getAllArticleByCategory(categoryId: number): Promise<IArticle[]> {
  return prisma.article.findMany({ where: { categoryId } });
}

export function getArticleById(id: number): Promise<IArticle | null> {
  return prisma.article.findUnique({ where: { id } });
}

export function getArticlesBySubject(subject: string): Promise<IArticle[]> {
  return prisma.article.findMany({
    where: { description: { contains: subject, mode: "insensitive" } },
  });
}

