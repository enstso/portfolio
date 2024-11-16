import { IProject, getAllProjectByCategory } from "@/lib/projectService";
import { NextRequest, NextResponse } from "next/server";

async function GET(req:NextRequest,{params}:{params:{category:number}}){
    try{
        const categoryId = params.category;
        const projects:IProject[] = await getAllProjectByCategory(categoryId);
        if(!projects){
            return NextResponse.json({message:"Not found"},{status:401});
        }
        return NextResponse.json({message:"success",data:projects});
    }catch(error){
        return NextResponse.json({error:"An error occured"},{status:500});
    }
}