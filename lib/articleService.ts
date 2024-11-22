import { prisma } from "@/prisma/client";
export interface IArticle {
    id?: number;
    name: string;
    description: string;
    content: string;
    photo: string;
    date: Date;
    categoryId: number;
}

export const getAllArticleByCategory = async (categoryId:number) : Promise<IArticle[]> => {
    return await prisma.article.findMany({
        where: {
                categoryId: categoryId
        }
    })
}

export const getArticleById = async (id:number): Promise<IArticle | null> => {
    return await prisma.article.findFirstOrThrow({
        where: {
            id:id
        }
    })
}

export const getArticlesBySubject =  async (subject:string): Promise<IArticle[]> => {
    return await prisma.article.findMany({
        where:{
           description:{contains:subject} 
        }
    })
}

export const getAllArticle = async () : Promise<IArticle[]> => {
    return await prisma.article.findMany();
}

export const createArticle =  async (article:IArticle) : Promise<void> =>  {
    const articleInsert = await prisma.article.create({data:article}); 
}

export const updateArticle = async(article:IArticle) : Promise<void> => {
    const articleUpdate = await prisma.article.update({where:{id:article.id},data:article});
}

export const deleteArticle = async(id:number): Promise<void> => {
    const articleDelete = await prisma.article.delete({where:{id:id}});
}