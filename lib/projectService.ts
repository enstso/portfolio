import { prisma } from "@/prisma/client";
import { Category } from "@/lib/categoryService";
export interface Project {
    id: number;
    introduction: string;
    url: string;
    date: Date;
    categoryId: number;
}

export const getAllProjectByCategory = async (category:Category) : Promise<Project[] | null> => {
    return await prisma.project.findMany({
        where: {
            equals: {
                category: category.id
            }
        }
    })
}

export const getAllProject = async () : Promise<Project[] | null> => {
    return await prisma.project.findMany();
}