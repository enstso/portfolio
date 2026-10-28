import { NextRequest, NextResponse } from "next/server";

import { getPublicArticles } from "@/lib/articleService";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? "10");
  const search = request.nextUrl.searchParams.get("search")?.slice(0, 100) ?? "";
  const category = request.nextUrl.searchParams.get("category")?.slice(0, 100) ?? "";

  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 20) {
    return NextResponse.json({ error: "Invalid pagination parameters" }, { status: 400 });
  }

  try {
    const result = await getPublicArticles({ page, pageSize: limit, search, category });
    return NextResponse.json({
      message: "success",
      articles: result.articles,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(result.total / limit),
        totalItems: result.total,
        itemsPerPage: limit,
      },
    });
  } catch {
    return NextResponse.json({ error: "Articles are temporarily unavailable" }, { status: 503 });
  }
}
