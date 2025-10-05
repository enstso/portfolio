import { prisma } from "@/prisma/client";

export interface IUser {
    id?: number;
    username: string;
    password: string;
    verif: string;
}

export const getUserByCredentials = async (user:IUser) : Promise<IUser | null> => {
    console.log(user);
    return prisma.user.findFirstOrThrow({
        where: {
            username: user.username,
            password: user.password,
            verif: user.verif
        }
    });
}
