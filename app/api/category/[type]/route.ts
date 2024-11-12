import { Factory } from "@/lib/factory";
import { getAllCategoryByType, ICategory } from "@/lib/categoryService";
import { NextRequest, NextResponse } from "next/server";

// à définir mettre en place la factory
async function GET({ params }: { params: Promise<{ type: string }> }) {
  try {
    const type = (await params).type;
    let categories: ICategory[] = [];

    switch (type) {
      case "Article": {
        categories = await getAllCategoryByType("Article");
        break;
      }
      case "Project": {
        categories = await getAllCategoryByType("Project");
        break;
      }
      default: {
        break;
      }
    }
   return NextResponse.json(
      { message: "success", data: categories });
  } catch (error) {
    return NextResponse.json({error: "An error occurred"},{status:500});
  }
}
