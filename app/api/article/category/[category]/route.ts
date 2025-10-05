import {IArticle, getAllArticleByCategory} from "@/lib/articleService";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, {params}: { params: { category: number } }) {
    try {
        const categoryId = params.category;
        const articles: IArticle[] = await getAllArticleByCategory(categoryId);
        if (articles.length == 0) {
            return NextResponse.json({message: "Not Found"}, {status: 401});
        }
        return NextResponse.json({message: "success", data: articles});
    } catch {
        return NextResponse.json({error: "An error occured"}, {status: 500});
    }
}