import { NextResponse } from "next/server";

import { getArticlesBySubject } from "@/lib/articleService";

export async function GET(_request: Request, { params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  if (!subject || subject.length > 100) {
    return NextResponse.json({ message: "Invalid subject" }, { status: 400 });
  }
  try {
    const articles = await getArticlesBySubject(subject);
    return NextResponse.json({ message: "success", data: articles });
  } catch {
    return NextResponse.json({ error: "Articles are temporarily unavailable" }, { status: 503 });
  }
}
