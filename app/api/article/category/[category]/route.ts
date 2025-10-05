import {IArticle, getAllArticleByCategory} from "@/lib/articleService";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    try {
        const url = req.url.split("/").pop();
        const categoryId = Number(url);
        if (isNaN(categoryId)) {
            return NextResponse.json({message: "Invalid category ID"}, {status: 400});
        }
        const articles: IArticle[] = await getAllArticleByCategory(categoryId);
        if (articles.length == 0) {
            return NextResponse.json({message: "Not Found"}, {status: 401});
        }
        return NextResponse.json({message: "success", data: articles});
    } catch {
        return NextResponse.json({error: "An error occured"}, {status: 500});
    }
}