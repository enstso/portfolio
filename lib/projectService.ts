"use server";
import { prisma } from "@/prisma/client";
import { getData, getDataGithub } from "./utils";
import * as fs from "fs";
import { projectsData } from "./data/projects";

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
        description: project.description,
        technologies: techs,
        url: project.html_url,
        date: formatDateToYearMonthAsDate(project.created_at),
      });
    }
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
