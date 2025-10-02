"use server";
import {getDataGithub} from "./utils";
import fs from 'fs';
import path from 'path';
import {projectsData} from "./data/projects";
import {prisma} from "@/prisma/client";

export interface IProject {
    id?: number;
    name: string;
    description: string;
    technologies: string[];
    url: string;
    date: Date | string;
}

export interface ProjectsResponse {
    projects: IProject[];
    total: number;
}

export const getProjects = async (
    skip: number = 0,
    take: number = 10,
    sortBy: string = "date",
    sortOrder: string = "desc"
): Promise<ProjectsResponse> => {
    try {
        // Validation des paramètres de tri
        const validSortFields = ["date", "name"];
        const validSortOrders = ["asc", "desc"];

        const orderByField = validSortFields.includes(sortBy) ? sortBy : "date";
        const orderByDirection = validSortOrders.includes(sortOrder) ? sortOrder : "desc";

        // Construction de l'objet orderBy pour Prisma
        const orderBy = {
            [orderByField]: orderByDirection
        };

        // Exécution parallèle des requêtes pour optimiser les performances
        const [projects, total] = await Promise.all([
            prisma.project.findMany({
                orderBy,
                skip,
                take,
                select: {
                    id: true,
                    name: true,
                    description: true,
                    technologies: true,
                    url: true,
                    date: true,
                }
            }),
            prisma.project.count() // Compte total pour la pagination
        ]);

        return {
            projects,
            total
        };
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw new Error("Failed to fetch projects");
    }
};


export const getAllProjectFromGithub = async (): Promise<any> => {
    let projects: IProject[] = [];

    try {
        const repos = await getDataGithub("https://api.github.com/users/Enstso/repos");

        if (repos.status === "403") {
            console.warn("GitHub API rate limit exceeded, using cached data");
        }

        const projectPromises = repos.map(async (project: any) => {
            try {
                const techs = await getDataGithub(project.languages_url)
                    .then((t) => Object.keys(t))
                    .catch(() => []); // Fallback en cas d'erreur

                return {
                    name: project.name,
                    description: project.description
                        ? project.description.replace(/\r?\n/g, " ").trim()
                        : "",
                    technologies: techs,
                    url: project.html_url,
                    date: formatDateToYearMonthAsDate(project.created_at) as unknown as string,
                };
            } catch (error) {
                console.error(`Error processing project ${project.name}:`, error);
                return null;
            }
        });

        const resolvedProjects = await Promise.all(projectPromises);
        projects = resolvedProjects.filter((p): p is IProject => p !== null);

        // Mise à jour uniquement si nécessaire
        if (hasProjectsChanged(projects, projectsData)) {
            await updateProjectsDb(projects);
            return projects;
        }

    } catch (error) {
        console.error("Error fetching GitHub projects:", error);
        projects = projectsData; // Fallback vers les données en cache
    }

    return projects;
};

// Fonction utilitaire pour comparer les projets
const hasProjectsChanged = (newProjects: IProject[], oldProjects: IProject[]): boolean => {
    if (newProjects.length !== oldProjects.length) return true;

    const newHash = newProjects.map(p => `${p.name}-${p.description}-${p.technologies.join(',')}`).sort().join('|');
    const oldHash = oldProjects.map(p => `${p.name}-${p.description}-${p.technologies.join(',')}`).sort().join('|');

    return newHash !== oldHash;
};


function updateProjectsFile(newProjects: IProject[]) {
    const filePath = path.join(process.cwd(), 'lib/data/projects.ts');

    const fileContent = `import { IProject } from "../projectService";

export const projectsData: IProject[] = ${JSON.stringify(newProjects, null, 2)};`;

    fs.writeFileSync(filePath, fileContent, 'utf-8');
}

async function updateProjectsDb(newProjects: IProject[]) {
    await prisma.project.deleteMany();
    for (const project of newProjects) {
        await prisma.project.create({
            data: {
                name: project.name,
                description: project.description,
                technologies: project.technologies,
                url: project.url,
                date: new Date(project.date),
            }
        });
    }
}

function formatDateToYearMonthAsDate(dateString: string): Date {
    // Conversion de la chaîne en objet Date
    const date = new Date(dateString);

    // Extraction de l'année et du mois
    const year = date.getFullYear();
    const month = date.getMonth(); // Pas besoin d'ajouter 1 ici car Date() utilise les indices de mois naturels (0 = janvier)

    // Création d'un nouvel objet Date avec l'année et le mois
    return new Date(year, month);
}
