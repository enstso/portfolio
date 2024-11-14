import { IArticle, getAllArticleByCategory } from "@/lib/articleService";
import { NextRequest, NextResponse } from "next/server";

async function GET({params}:{params: {category:number}} ){
    try{
        const categoryId = params.category;
        const articles:IArticle[] = await getAllArticleByCategory(categoryId); 
        if(!articles){
            return NextResponse.json({message:"Not Found"},{status:401});
        }
        return NextResponse.json({message:"success", data:articles});
    }catch(error){
        return NextResponse.json({error:"An error occured"},{status:500});
    }
}