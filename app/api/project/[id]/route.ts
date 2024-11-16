import { NextRequest, NextResponse } from "next/server";
import { deleteProject, IProject, updateProject, getProjectById } from "@/lib/projectService";

async function GET(req:NextRequest,{ params }: { params: { id: number } }) {
    try {
      const id = params.id;
      const project:IProject | null = await getProjectById(id);
      if (!project) {
        return NextResponse.json({ message: "Not found" }, { status: 401 });
      }
      return NextResponse.json({ message: "success", data: project });
    } catch (error) {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}
  
async function UPDATE(req:NextRequest,{params}:{params:{id:number}}){
    try{
        const project:IProject = await req.json();
        project.id = params.id;
        await updateProject(project);
    }catch(error){
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}

async function DELETE({params}:{params:{id:number}}){
    try{
        const id = params.id;
        await deleteProject(id);
    }catch(error){
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}