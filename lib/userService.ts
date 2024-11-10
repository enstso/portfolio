import {prisma} from "@/prisma/client";

export interface User {
    id: number;
    username: string;
    password: string;
    verif: string;
}

