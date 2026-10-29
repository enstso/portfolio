import { NextResponse } from "next/server";

import { getAllArticleByCategory } from "@/lib/articleService";

export async function GET(_request: Request, { params }: { params: Promise<{ category: string }> }) {
  const { category: rawCategory } = await params;
  const categoryId = Number(rawCategory);
  if (!Number.isInteger(categoryId) || categoryId < 1) {
    return NextResponse.json({ message: "Invalid category ID" }, { status: 400 });
  }
  try {
    const articles = await getAllArticleByCategory(categoryId);
    return NextResponse.json({ message: "success", data: articles });
  } catch {
    return NextResponse.json({ error: "Articles are temporarily unavailable" }, { status: 503 });
  }
}
