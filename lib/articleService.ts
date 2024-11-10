import { prisma } from "@/prisma/client";
import { Category } from "@/lib/categoryService";
interface Article {
    id: number;
    content: string;
    date: Date;
    categoryId: number;
}

export const getAllArticleByCategory = async (category:Category) : Promise<Article[] | null> => {
    return await prisma.article.findMany({
        where: {
            equals: {
                category: category.id
            }
        }
    })
}

export const getAllArticle = async () : Promise<Article[] | null> => {
    return await prisma.article.findMany();
}