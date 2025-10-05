import { NextResponse} from "next/server";
import {getAllArticlesFromGithub} from "@/lib/articleService";

export async function GET() {
    try {
        const articles = await getAllArticlesFromGithub();
        return NextResponse.json({
            message: "Database updated successfully",
            articlesCount: articles.length,
            updatedAt: new Date().toISOString()
        })
    } catch (e) {
        console.error("Error updating database from GitHub:", e);

        return NextResponse.json(
            {
                error: "Failed to update database",
                message: e instanceof Error ? e.message : "Unknown error"
            },
            {
                status: 500
            });
    }
}