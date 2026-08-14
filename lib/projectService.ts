import "server-only";

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

export async function syncProjectsFromGitHub(): Promise<{ updated: number }> {
  const payload = await fetchGitHubJson<unknown>(
    "https://api.github.com/users/Enstso/repos?per_page=100&sort=created&direction=desc",
  );
  if (!Array.isArray(payload)) {
    throw new Error("GitHub returned an unexpected repositories response");
  }

  const projects = payload
    .filter(isGitHubRepository)
    .filter((repository) => !repository.archived && !repository.fork)
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
