import { prisma } from "@/prisma/client";
export interface IProject {
    id?: number;
    name:string;
    description: string;
    technologies: string[];
    url: string;
    date: Date;
    categoryId: number;
}

export const getAllProjectByCategory = async (categoryId:number) : Promise<IProject[]> => {
    return await prisma.project.findMany({
        where: {
                categoryId: categoryId
        }
    })
}

export const getProjectById = async (id:number) : Promise<IProject | null> => {
    return await prisma.project.findFirstOrThrow({
        where: {
            id:id
        }
    })
}

export const getAllProject = async () : Promise<IProject[]> => {
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