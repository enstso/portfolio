import { prisma } from "@/prisma/client";

export interface IUser {
    id?: number;
    username: string;
    password: string;
    verif: string;
}

export const getUserByCredentials = async (user:IUser) : Promise<IUser> => {
    return await prisma.user.findUnique({
        where:  {
            username:user.username,
            password:user.password,
            verif:user.verif
                    
        }
    })
}
