import { NextRequest, NextResponse } from "next/server";
import { IProject, getProjects } from "@/lib/projectService";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const limit = parseInt(url.searchParams.get("limit") || "5", 10);
        const sortBy = url.searchParams.get("sortBy") || "date";
        const sortOrder = url.searchParams.get("sortOrder") || "desc";

        // Validation des paramètres
        if (page < 1 || limit < 1 || limit > 50) {
            return NextResponse.json(
                { error: "Invalid pagination parameters" },
                { status: 400 }
            );
        }

        const validSortBy = ["date", "name"];
        const validSortOrder = ["asc", "desc"];

        if (!validSortBy.includes(sortBy) || !validSortOrder.includes(sortOrder)) {
            return NextResponse.json(
                { error: "Invalid sort parameters" },
                { status: 400 }
            );
        }

        const skip = (page - 1) * limit;

        // Récupérer les projets avec tri et pagination
        const { projects, total } = await getProjects(skip, limit, sortBy, sortOrder);

        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            message: "success",
            projects,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: total,
                itemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
