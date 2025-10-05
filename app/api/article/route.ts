import {NextRequest, NextResponse} from "next/server";
import {IArticle, getArticles} from "@/lib/articleService";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const limit = parseInt(url.searchParams.get("limit") || "10", 10);
        const sortBy = url.searchParams.get("sortBy") || "date";
        const sortOrder = url.searchParams.get("sortOrder") || "desc";
        const categoryId = url.searchParams.get("categoryId");

        // Validation des paramètres de pagination
        if (page < 1 || limit < 1 || limit > 100) {
            return NextResponse.json(
                {error: "Invalid pagination parameters. Page must be >= 1, limit must be between 1 and 100"},
                {status: 400}
            );
        }

        // Validation des paramètres de tri
        const validSortBy = ["date", "name", "categoryId"];
        const validSortOrder = ["asc", "desc"];

        if (!validSortBy.includes(sortBy) || !validSortOrder.includes(sortOrder)) {
            return NextResponse.json(
                {error: "Invalid sort parameters. sortBy must be 'date', 'name', or 'categoryId'. sortOrder must be 'asc' or 'desc'"},
                {status: 400}
            );
        }

        // Validation du categoryId si fourni
        let parsedCategoryId: number | undefined;
        if (categoryId) {
            parsedCategoryId = parseInt(categoryId, 10);
            if (isNaN(parsedCategoryId) || parsedCategoryId < 1) {
                return NextResponse.json(
                    {error: "Invalid categoryId parameter. Must be a positive integer"},
                    {status: 400}
                );
            }
        }

        const skip = (page - 1) * limit;

        // Récupérer les articles avec tri, pagination et filtres
        const {articles, total} = await getArticles(
            skip,
            limit,
            sortBy,
            sortOrder,
            parsedCategoryId
        );

        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            message: "success",
            articles,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: total,
                itemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            },
            filters: {
                sortBy,
                sortOrder,
                categoryId: parsedCategoryId || null
            }
        });
    } catch (error) {
        console.error("Error fetching articles:", error);
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const article: IArticle = await req.json();
        if (!article) {
            return NextResponse.json({message: "Bad Request"}, {status: 401});
        }
    } catch {
        return NextResponse.json({error: "An error occurred"}, {status: 500});
    }
}