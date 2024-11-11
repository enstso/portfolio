import { NextRequest, NextResponse } from "next/server";

enum Type {
    Article,
    Project
}
export interface Category {
    id: number,
    name: String,
    type: Type.Article | Type.Project
}

async function GET({params}:{params:Promise<{type:string}>}){
    const type = (await params).type
    switch(type){
        
    }

}