import { prisma } from "@/prisma/client";
import { ICategory,Category } from "@/lib/categoryService";
export interface IProject {
    id?: number;
    introduction: string;
    url: string;
    date: Date;
    category: ICategory;
}

export class Project implements IProject {
    constructor(public introduction:string,public url:string,public date:Date,public category:ICategory){}
}

export const getAllProjectByCategory = async (category:ICategory) : Promise<IProject[] | null> => {
    return await prisma.project.findMany({
        where: {
                categoryId: category.id
        }
    })
}

export const getProjectById = async (id:number) : Promise<IProject> => {
    return await prisma.project.findUnique({
        where: {
            id:id
        }
    })
}

export const getAllProject = async () : Promise<IProject[] | null> => {
    return await prisma.project.findMany();
}

export const createProject =  async (project:IProject) : Promise<void> =>  {
    const projectInsert = await prisma.project.create({data:project}); 
}

export const updateProject = async(project:IProject) : Promise<void> => {
    const projectUpdate = await prisma.project.update({where:{id:project.id},data:project});
}

export const deleteProject = async(id:number): Promise<void> => {
    const projectDelete = await prisma.project.delete({where:{id:id}});
} 