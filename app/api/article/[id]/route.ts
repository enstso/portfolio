import {NextRequest, NextResponse} from "next/server";
import {getArticleById, IArticle} from "@/lib/articleService";

export async function GET(req: NextRequest) {
    try {
        const url = req.url.split("/").pop();
        const id = Number(url);
        if (isNaN(id)) {
            return NextResponse.json({message: "Invalid ID"}, {status: 400});
        }
        const article: IArticle | null = await getArticleById(id);
        if (article == null) {
            return NextResponse.json({message: "Not found"}, {status: 401});
        }
        return NextResponse.json({message: "success", data: article});
    } catch {
        return NextResponse.json({error: "An error occurred"}, {status: 500});
    }
}