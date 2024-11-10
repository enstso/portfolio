import { prisma } from "@/prisma/client";

export interface User {
    id: number;
    username: string;
    password: string;
    verif: string;
}


export const getUserByCredentials = async (username:string,password:string,verif:string) : Promise<User | null> => {
    return await prisma.user.findUnique({
        where:  {
            username: {
                equals: {
                    username,
                },
            },
            password: {
                equals: {
                    password,
                },
            },
            verif: {
                equals: {
                    verif,
                },
            },
        }
    })
}
