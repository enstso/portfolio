import {NextRequest, NextResponse} from "next/server";
import {getAllProjectFromGithub} from "@/lib/projectService";

export async function GET(req: NextRequest) {
    try {
        const projects = await getAllProjectFromGithub();
        return NextResponse.json({
            message: "Database updated successfully",
            projectsCount: projects.length,
            updatedAt: new Date().toISOString()
        });
    } catch (e) {
        console.error("Error updating database from GitHub:", e);

        return NextResponse.json(
            {
                error: "Failed to update database",
                message: e instanceof Error ? e.message : "Unknown error"
            },
            {status: 500}
        );
    }
}