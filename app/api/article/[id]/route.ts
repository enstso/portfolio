import { NextRequest, NextResponse } from "next/server";
import { deleteArticle, getArticleById, IArticle, updateArticle } from "@/lib/articleService";

async function GET({ params }: { params: { id: number } }) {
  try {
    const id = params.id;
    const article:IArticle = await getArticleById(id);
    if (!article) {
      return NextResponse.json({ message: "Not found" }, { status: 401 });
    }
    return NextResponse.json({ message: "success", data: article });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

async function UPDATE(req:NextRequest,{params}:{params:{id:number}}){
    try{
        const article:IArticle = await req.json();
        article.id = params.id;
        await updateArticle(article);
    }catch(error){
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}

async function DELETE({params}:{params:{id:number}}){
    try{
        const id = params.id;
        await deleteArticle(id);
    }catch(error){
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}
