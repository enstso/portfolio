import "server-only";

import {
  additionalProjects,
  inferProjectCategory,
  slugify,
  type AdditionalProject,
} from "@/lib/data/additionalProjects";
import { fetchGitHubJson } from "@/lib/server/github";
import { prisma } from "@/prisma/client";

type SyncedProject = {
  name: string;
  description: string;
  technologies: string[];
  url: string;
  date: Date;
};

type GitHubRepository = {
  name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  language: string | null;
  archived: boolean;
  fork: boolean;
};

const hiddenPublicRepositories = new Set([
  "articles",
  "enstso",
  "hid",
  "portfolio",
  "spyware",
]);

export async function getAdditionalProjects(): Promise<AdditionalProject[]> {
  try {
    const storedProjects = await prisma.project.findMany({
      orderBy: { date: "desc" },
      select: {
        name: true,
        description: true,
        technologies: true,
        url: true,
        date: true,
      },
    });

    if (storedProjects.length === 0) return additionalProjects;

    const fallbackByRepository = new Map(
      additionalProjects.map((project) => [repositoryName(project.url).toLowerCase(), project]),
    );
    const databaseProjects = storedProjects
      .filter((project) => isPublicPortfolioRepository(project.name, project.url))
      .map<AdditionalProject>((project) => {
        const repository = repositoryName(project.url) || project.name;
        const fallback = fallbackByRepository.get(repository.toLowerCase());
        const description = project.description.trim() || fallback?.description || "Public software project.";
        const technologies = unique([
          ...(fallback?.technologies ?? []),
          ...project.technologies.map((technology) => technology.trim()).filter(Boolean),
        ]);

        return {
          slug: fallback?.slug ?? slugify(repository),
          name: fallback?.name ?? project.name,
          category:
            fallback?.category ?? inferProjectCategory(project.name, description, technologies),
          description,
          technologies,
          url: project.url,
          date: project.date.toISOString().slice(0, 10),
        };
      });

    const mergedByRepository = new Map(
      databaseProjects.map((project) => [repositoryName(project.url).toLowerCase(), project]),
    );
    for (const fallback of additionalProjects) {
      const repository = repositoryName(fallback.url).toLowerCase();
      if (!mergedByRepository.has(repository)) mergedByRepository.set(repository, fallback);
    }

    return [...mergedByRepository.values()].sort(
      (left, right) => Date.parse(right.date) - Date.parse(left.date),
    );
  } catch {
    return additionalProjects;
  }
}

export async function syncProjectsFromGitHub(): Promise<{ updated: number }> {
  const payload = await fetchGitHubJson<unknown>(
    "https://api.github.com/users/Enstso/repos?per_page=100&sort=created&direction=desc",
  );
  if (!Array.isArray(payload)) {
    throw new Error("GitHub returned an unexpected repositories response");
  }

  const projects = payload
    .filter(isGitHubRepository)
    .filter((repository) => !repository.archived)
    .map<SyncedProject>((repository) => ({
      name: repository.name,
      description: repository.description?.replace(/\r?\n/g, " ").trim() ?? "",
      technologies: repository.language ? [repository.language] : [],
      url: repository.html_url,
      date: new Date(repository.created_at),
    }));

  if (projects.length === 0) {
    throw new Error("GitHub returned no valid repositories; the database was not changed");
  }

  await prisma.$transaction(
    projects.map((project) =>
      prisma.project.upsert({
        where: { name: project.name },
        update: {
          description: project.description,
          technologies: project.technologies,
          url: project.url,
          date: new Date(project.date),
        },
        create: {
          name: project.name,
          description: project.description,
          technologies: project.technologies,
          url: project.url,
          date: new Date(project.date),
        },
      }),
    ),
  );

  return { updated: projects.length };
}

function isPublicPortfolioRepository(name: string, url: string) {
  const repository = (repositoryName(url) || name).toLowerCase();
  return !hiddenPublicRepositories.has(repository) && url.startsWith("https://github.com/");
}

function repositoryName(url: string) {
  return url.replace(/\/$/, "").split("/").pop() ?? "";
}

function unique(values: string[]) {
  return [...new Set(values)];
}

function isGitHubRepository(value: unknown): value is GitHubRepository {
  if (!value || typeof value !== "object") return false;
  const repository = value as Record<string, unknown>;
  return (
    typeof repository.name === "string" &&
    (typeof repository.description === "string" || repository.description === null) &&
    typeof repository.html_url === "string" &&
    repository.html_url.startsWith("https://github.com/") &&
    typeof repository.created_at === "string" &&
    !Number.isNaN(Date.parse(repository.created_at)) &&
    (typeof repository.language === "string" || repository.language === null) &&
    typeof repository.archived === "boolean" &&
    typeof repository.fork === "boolean"
  );
}
