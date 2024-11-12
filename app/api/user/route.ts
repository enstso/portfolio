import { NextRequest, NextResponse } from "next/server";
import { IUser, User, getUserByCredentials } from "@/lib/userService";
import { Factory } from "@/lib/factory";

 async function POST(req: NextRequest) {
    try {
        const {username,password,verif} = await req.json();
        const userFactory = new Factory<IUser>(User);
        const user = userFactory.create(username,password,verif); 
        const userDb: IUser = await getUserByCredentials(user);
        if (!userDb) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
        return NextResponse.json({ message: "Authentication successful", userDb });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}


