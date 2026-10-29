import { NextResponse } from "next/server";

import { getPublishedCategoryNames } from "@/lib/articleService";

export async function GET() {
  try {
    return NextResponse.json({ categories: await getPublishedCategoryNames() });
  } catch {
    return NextResponse.json({ categories: [] });
  }
}
