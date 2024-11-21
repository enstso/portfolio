import { NextRequest, NextResponse } from "next/server";
import { IUser, getUserByCredentials } from "@/lib/userService";

export async function POST(req: NextRequest) {
  try {
    const userData: IUser = await req.json();
    console.log(userData);
    const user: IUser | null = await getUserByCredentials(userData);
    console.log(user);
    if (user == null) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    return NextResponse.json({ message: "Authentication successful", user });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
