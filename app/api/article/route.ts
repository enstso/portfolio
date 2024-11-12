import { NextRequest, NextResponse } from "next/server";
import { IArticle, getAllArticle } from "@/lib/articleService";

async function GET(){
    try{
        const articles: IArticle[]  = await getAllArticle();
        if(!articles){
            return NextResponse.json({message:"not found"},{status:404})
        }
        return NextResponse.json({message:"success",articles})
    }catch(error){
        return NextResponse.json({error: "An error occurred"},{status:500});
    }
}


async function POST(req:NextRequest){
    try{
        const {content,date,categoryId}: IArticle = await req.json();
        const article: IArticle =  await 
    }catch(error){

    }
}