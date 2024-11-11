import { NextRequest, NextResponse } from "next/server";
import { getUserByCredentials } from "@/lib/userService";

 interface User {
    username: string;
    password: string;
    verif: string;
}

 async function POST(req: NextRequest) {
    try {
        const { username, password, verif }: User = await req.json();
        const user = await getUserByCredentials(username, password, verif);
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
        return NextResponse.json({ message: "Authentication successful", user });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}


