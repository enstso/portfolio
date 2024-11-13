import { NextRequest, NextResponse } from "next/server";
import {  IArticle, getAllArticle } from "@/lib/articleService";

async function GET(){
    try{
        const articles: IArticle[]  = await getAllArticle();
        if(!articles){
            return NextResponse.json({message:"Not Found"},{status:404})
        }
        return NextResponse.json({message:"success",articles})
    }catch(error){
        return NextResponse.json({error: "An error occurred"},{status:500});
    }
}


async function POST(req:NextRequest){
    try{
        const article: IArticle = await req.json();
        if(!article){
            return NextResponse.json({message:"Bad Request"},{status:401});
        }
        return NextResponse.json({message:"Not Found"},{status:404});
    }catch(error){
        return NextResponse.json({error:"An error occurred"},{status: 500});
    }
}