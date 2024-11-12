import { prisma } from "@/prisma/client";
import { Category, ICategory } from "@/lib/categoryService";

export interface IArticle {
    id?: number;
    content: string;
    date: Date;
    category: ICategory;
}

export class Article implements IArticle {
    constructor(public id:number,public content:string,public date:Date,public category:ICategory){}
}

export const getAllArticleByCategory = async (category:ICategory) : Promise<IArticle[] | null> => {
    return await prisma.article.findMany({
        where: {
                categoryId: category.id
        }
    })
}

export const getArticleById = async (id:number): Promise<IArticle> => {
    return await prisma.article.findUnique({
        where: {
            id:id
        }
    })
}

export const getAllArticle = async () : Promise<IArticle[]> => {
    return await prisma.article.findMany();
}

export const createArticle =  async (article:IArticle) : Promise<void> =>  {
    const articleInsert = await prisma.article.create(article); 
}