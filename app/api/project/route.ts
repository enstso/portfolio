import { NextRequest, NextResponse } from "next/server";
import { IProject,getAllProjectFromGithub } from "@/lib/projectService";

export async function GET(req:NextRequest){
    try{
        const projects: IProject[] = await getAllProjectFromGithub();
        if(projects.length==0){
            return NextResponse.json({message:"Not Found"},{status:404});
        }
        return NextResponse.json({message:"success",projects});
    }catch(error){
        return NextResponse.json({error:"An error occured"},{status:500});
    }
}

export async function POST(req:NextRequest){
    try{
        const project:IProject = await req.json();
        if(project==null){
            return NextResponse.json({message:"Bad Request"},{status:401});
        }
    }catch(error){
        return NextResponse.json({error:"An error occured"},{status:500});
    }
}