import { IArticle, getArticlesBySubject } from "@/lib/articleService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { subject: string } }) {
  try {
    const subject = params.subject;
    const articles: IArticle[] = await getArticlesBySubject(subject);
    if (!articles) {
      return NextResponse.json({ message: "Not Found" }, { status: 401 });
    }
    return NextResponse.json({ message: "success", data: articles });
  } catch (error) {
    return NextResponse.json({ error: "An error occured" }, { status: 500 });
  }
}