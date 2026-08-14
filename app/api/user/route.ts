import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createSession, deleteSession } from "@/app/session";
import { getUserByCredentials } from "@/lib/userService";

const credentialsSchema = z.object({
  username: z.string().min(2).max(30),
  password: z.string().min(8).max(200),
  verif: z.string().min(4).max(200),
});

export async function POST(request: NextRequest) {
  try {
    const parsed = credentialsSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const user = await getUserByCredentials(parsed.data);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await createSession(user.username);
    return NextResponse.json({ message: "Authentication successful" });
  } catch {
    return NextResponse.json({ error: "Authentication is unavailable" }, { status: 503 });
  }
}

export async function DELETE() {
  await deleteSession();
  return NextResponse.json({ message: "Session ended" });
}
