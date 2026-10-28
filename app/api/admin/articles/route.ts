import { NextRequest, NextResponse } from "next/server";

import { articleInputSchema } from "@/lib/article";
import { ArticleServiceError, createArticle } from "@/lib/articleService";
import { isRequestBodyTooLarge, isSameOrigin, requireAuthenticatedUsername } from "@/lib/server/request-security";

export async function POST(request: NextRequest) {
  const username = await requireAuthenticatedUsername();
  if (!username) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Request origin is not allowed" }, { status: 403 });
  if (isRequestBodyTooLarge(request)) return NextResponse.json({ error: "Article content is too large" }, { status: 413 });

  try {
    const parsed = articleInputSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid article" },
        { status: 400 },
      );
    }
    const article = await createArticle(parsed.data, username);
    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    if (error instanceof ArticleServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unable to save the article" }, { status: 500 });
  }
}
