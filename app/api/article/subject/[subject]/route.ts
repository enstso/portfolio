import {IArticle, getArticlesBySubject} from "@/lib/articleService";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    try {
        const subject = req.url.split("/").pop();
        if (!subject) {
            return NextResponse.json({message: "Invalid subject"}, {status: 400});
        }
        const articles: IArticle[] = await getArticlesBySubject(subject);
        if (articles.length == 0) {
            return NextResponse.json({message: "Not Found"}, {status: 401});
        }
        return NextResponse.json({message: "success", data: articles});
    } catch {
        return NextResponse.json({error: "An error occured"}, {status: 500});
    }
}