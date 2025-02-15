"use server";
import { prisma } from "@/prisma/client";
import { getData, getDataGithub } from "./utils";
import fs from 'fs';
import path from 'path';import { projectsData } from "./data/projects";

export interface IProject {
  id?: number;
  name: string;
  description: string;
  technologies: string[];
  url: string;
  date: Date | string;
}

export const getAllProjectFromGithub = async (): Promise<IProject[]> => {
  let projects: IProject[] = [];

  let repos = await getDataGithub("https://api.github.com/users/Enstso/repos");
  console.log(repos.status);
  if (repos.status == "403") {
    projects = projectsData ;
    console.log(repos);
  } else {
    for (const project of repos) {
      const techs = await getDataGithub(project.languages_url).then((t) =>
        Object.keys(t)
      );
      projects.push({
        name: project.name,
        description: project.description ? project.description.replace(/\r?\n/g, " ") : "",
        technologies: techs,
        url: project.html_url,
        date: formatDateToYearMonthAsDate(project.created_at) as unknown as string,
      });
    }
    // Vérifier si la liste a changé
    if (JSON.stringify(projects) !== JSON.stringify(projectsData)) {
      updateProjectsFile(projects);
    }
  }
  return projects;
};

function updateProjectsFile(newProjects: IProject[]) {
  const filePath = path.join(process.cwd(), 'lib/data/projects.ts');

  const fileContent = `import { IProject } from "../projectService";

export const projectsData: IProject[] = ${JSON.stringify(newProjects, null, 2)};`;

  fs.writeFileSync(filePath, fileContent, 'utf-8');
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
