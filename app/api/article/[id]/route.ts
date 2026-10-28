import { NextResponse } from "next/server";

import { getArticleById } from "@/lib/articleService";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }
  try {
    const article = await getArticleById(id);
    if (!article) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "success", data: article });
  } catch {
    return NextResponse.json({ error: "Articles are temporarily unavailable" }, { status: 503 });
  }
}
