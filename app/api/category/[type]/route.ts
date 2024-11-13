import { getAllCategoryByType, ICategory } from "@/lib/categoryService";
import { NextRequest, NextResponse } from "next/server";

async function GET({ params }: { params: { type: string } }) {
  try {
    const type = params.type;
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
    if (!categories) {
      return NextResponse.json({ message: "Not found" }, { status: 401 });
    }
    return NextResponse.json({ message: "success", data: categories });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
