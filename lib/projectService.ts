'use server'
import { prisma } from "@/prisma/client";
import { getData, getDataGithub } from "./utils";
export interface IProject {
    id?: number;
    name:string;
    description: string;
    technologies: string[];
    url: string;
    date: Date;
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
/*
export const createProject =  async (project:IProject) : Promise<void> =>  {
    const projectInsert = await prisma.project.create({data:project}); 
}

export const updateProject = async(project:IProject) : Promise<void> => {
    const projectUpdate = await prisma.project.update({where:{id:project.id},data:project});
}

export const deleteProject = async(id:number): Promise<void> => {
    const projectDelete = await prisma.project.delete({where:{id:id}});
} 
*/
export const getAllProjectFromGithub = async (): Promise<IProject[]> => {
    const projects: IProject[] = [];

    const repos = await getDataGithub("https://api.github.com/users/Enstso/repos");
    console.log(repos);
    for (const project of repos) {
        const techs = await getDataGithub(project.languages_url).then((t) => Object.keys(t));

        projects.push({
            name: project.name,
            description: project.description,
            technologies: techs,
            url: project.html_url,
            date: formatDateToYearMonthAsDate(project.created_at),
        });
    }

    return projects;
};


function formatDateToYearMonthAsDate(dateString: string): Date {
    // Conversion de la chaîne en objet Date
    const date = new Date(dateString);

    // Extraction de l'année et du mois
    const year = date.getFullYear();
    const month = date.getMonth(); // Pas besoin d'ajouter 1 ici car Date() utilise les indices de mois naturels (0 = janvier)

    // Création d'un nouvel objet Date avec l'année et le mois
    return new Date(year, month);
}