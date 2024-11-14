import { prisma } from "@/prisma/client";

export enum Type {
    Article,
    Project
}
export interface ICategory {
    id?: number,
    name: String,
    type: Type.Article | Type.Project
}

export const getAllCategoryByType= async (type:string) : Promise<ICategory[]> => {
    return await prisma.category.findMany({
        where: {
                type:type
        }
    })
}
