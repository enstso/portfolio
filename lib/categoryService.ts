import { prisma } from "@/prisma/client";
import { $Enums, Prisma } from "@prisma/client";

type typesEnum = $Enums.Type;

export interface ICategory {
    id?: number,
    name: String,
    type: typesEnum
}



export const getAllCategoryByType= async (type:typesEnum) : Promise<ICategory[]> => {
    return await prisma.category.findMany({
        where: {
                type:type
        }
    })
}
