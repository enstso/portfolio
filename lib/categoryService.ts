import { prisma } from "@/prisma/client";

enum Type {
    Article,
    Project
}
interface Category {
    id: number,
    name: String,
    type: Type.Article | Type.Project
}

export const getAllCategoryByArticle = async () : Promise<Category | null> => {
    return await prisma.category.findMany({
        where: {
            equals: {
                type:'Article'
            }
        }
    })
}

export const getAllCategoryByProject = async () : Promise<Category | null> => {
    return await prisma.category.findMany({
        where: {
            equals: {
                type:'Project'
            }
        }
    })
}