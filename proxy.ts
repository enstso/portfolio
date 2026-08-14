import { NextRequest, NextResponse } from "next/server";

import { decrypt } from "@/app/session";

export default async function proxy(request: NextRequest) {
  const session = await decrypt(request.cookies.get("session")?.value);
  if (!session?.username) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
