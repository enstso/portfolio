import { NextRequest, NextResponse } from "next/server";

import { projectCategories } from "@/lib/data/additionalProjects";
import { getAdditionalProjects } from "@/lib/projectService";

export async function GET(request: NextRequest) {
  const page = Number.parseInt(request.nextUrl.searchParams.get("page") ?? "1", 10);
  const limit = Number.parseInt(request.nextUrl.searchParams.get("limit") ?? "6", 10);
  const sortBy = request.nextUrl.searchParams.get("sortBy") ?? "date";
  const sortOrder = request.nextUrl.searchParams.get("sortOrder") ?? "desc";
  const category = request.nextUrl.searchParams.get("category") ?? "All";

  if (
    !Number.isInteger(page) ||
    !Number.isInteger(limit) ||
    page < 1 ||
    limit < 1 ||
    limit > 50 ||
    !["date", "name"].includes(sortBy) ||
    !["asc", "desc"].includes(sortOrder) ||
    !projectCategories.includes(category as (typeof projectCategories)[number])
  ) {
    return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
  }

  const allProjects = await getAdditionalProjects();
  const direction = sortOrder === "asc" ? 1 : -1;
  const projects = allProjects
    .filter((project) => category === "All" || project.category === category)
    .sort((left, right) => {
      const comparison =
        sortBy === "name"
          ? left.name.localeCompare(right.name)
          : Date.parse(left.date) - Date.parse(right.date);
      return comparison * direction;
    });
  const start = (page - 1) * limit;
  const totalPages = Math.max(1, Math.ceil(projects.length / limit));

  return NextResponse.json({
    message: "success",
    projects: projects.slice(start, start + limit),
    source: "database-with-static-fallback",
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: projects.length,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
}
