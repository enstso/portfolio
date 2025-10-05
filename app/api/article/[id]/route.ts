import {NextRequest, NextResponse} from "next/server";
import {getArticleById, IArticle} from "@/lib/articleService";

export async function GET(req: NextRequest, {params}: { params: { id: number } }) {
    try {
        const id = params.id;
        const article: IArticle | null = await getArticleById(id);
        if (article == null) {
            return NextResponse.json({message: "Not found"}, {status: 401});
        }
        return NextResponse.json({message: "success", data: article});
    } catch {
        return NextResponse.json({error: "An error occurred"}, {status: 500});
    }
}