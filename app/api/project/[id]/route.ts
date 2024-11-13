import { NextRequest, NextResponse } from "next/server";
import { ICategory } from "@/lib/categoryService";

async function UPDATE(req:NextRequest,{params}:{params:{id:number}}){
    try{
        const id = params.id;
        const category:ICategory = await req.json();

    }catch(error){
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}

async function DELETE({params}:{params:{id:number}}){
    try{
        const id = params.id;
        
    }catch(error){
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });

    }
}