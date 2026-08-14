import { NextRequest, NextResponse } from "next/server";

import { isAuthenticated } from "@/app/session";
import { syncProjectsFromGitHub } from "@/lib/projectService";

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  try {
    const result = await syncProjectsFromGitHub();
    return NextResponse.json({
      message: "Project archive synchronized safely",
      projectsUpdated: result.updated,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Project synchronization failed" },
      { status: 502 },
    );
  }
}
