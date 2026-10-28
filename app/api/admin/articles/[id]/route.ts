import { NextRequest, NextResponse } from "next/server";

import { articleInputSchema, articleStatusSchema } from "@/lib/article";
import {
  ArticleServiceError,
  deleteArticle,
  setArticleStatus,
  updateArticle,
} from "@/lib/articleService";
import { isRequestBodyTooLarge, isSameOrigin, requireAuthenticatedUsername } from "@/lib/server/request-security";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, context: RouteContext) {
  return withMutation(request, context, async (id, username) => {
    const parsed = articleInputSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid article" },
        { status: 400 },
      );
    }
    const article = await updateArticle(id, parsed.data, username);
    return NextResponse.json({ article });
  });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return withMutation(request, context, async (id, username) => {
    const parsed = articleStatusSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid publication status" }, { status: 400 });
    const article = await setArticleStatus(id, parsed.data.status, username);
    return NextResponse.json({ article });
  });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return withMutation(request, context, async (id, username) => {
    await deleteArticle(id, username);
    return new NextResponse(null, { status: 204 });
  });
}

async function withMutation(
  request: NextRequest,
  context: RouteContext,
  mutation: (id: number, username: string) => Promise<NextResponse>,
) {
  const username = await requireAuthenticatedUsername();
  if (!username) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Request origin is not allowed" }, { status: 403 });
  if (isRequestBodyTooLarge(request)) return NextResponse.json({ error: "Article content is too large" }, { status: 413 });

  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ error: "Invalid article ID" }, { status: 400 });
  }

  try {
    return await mutation(id, username);
  } catch (error) {
    if (error instanceof ArticleServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unable to update the article" }, { status: 500 });
  }
}
