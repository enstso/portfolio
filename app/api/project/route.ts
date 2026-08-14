import { NextRequest, NextResponse } from "next/server";

import { additionalProjects } from "@/lib/data/additionalProjects";

export function GET(request: NextRequest) {
  const page = Number.parseInt(request.nextUrl.searchParams.get("page") ?? "1", 10);
  const limit = Number.parseInt(request.nextUrl.searchParams.get("limit") ?? "6", 10);
  const sortBy = request.nextUrl.searchParams.get("sortBy") ?? "date";
  const sortOrder = request.nextUrl.searchParams.get("sortOrder") ?? "desc";

  if (
    !Number.isInteger(page) ||
    !Number.isInteger(limit) ||
    page < 1 ||
    limit < 1 ||
    limit > 50 ||
    !["date", "name"].includes(sortBy) ||
    !["asc", "desc"].includes(sortOrder)
  ) {
    return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
  }

  const direction = sortOrder === "asc" ? 1 : -1;
  const projects = [...additionalProjects].sort((left, right) => {
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
    source: "curated-static",
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
