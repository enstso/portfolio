import { prisma } from "@/prisma/client";
import {  Type } from "@prisma/client";


export interface ICategory {
    id?: number,
    name: string,
    type: Type
}



export const getAllCategoryByType= async (type:Type) : Promise<ICategory[]> => {
    return await prisma.category.findMany({
        where: {
                type:type
        }
    })
}
