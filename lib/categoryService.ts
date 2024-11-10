import { prisma } from "@/prisma/client";


enum Type {
    Article,
    Project
}
interface Category {
    id: number,
    name: String,
    type: Type.Article | Type.Project
}

