import "server-only";

import type { NextRequest } from "next/server";

import { getSession } from "@/app/session";
import { siteConfig } from "@/lib/site";

export async function requireAuthenticatedUsername() {
  const session = await getSession();
  return session?.username ?? null;
}

export function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const originUrl = new URL(origin);
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const host = forwardedHost ?? request.headers.get("host") ?? request.nextUrl.host;
    const allowedHosts = new Set([host, request.nextUrl.host, new URL(siteConfig.url).host]);
    return allowedHosts.has(originUrl.host);
  } catch {
    return false;
  }
}

export function isRequestBodyTooLarge(request: NextRequest, maxBytes = 150_000) {
  const contentLength = request.headers.get("content-length");
  if (!contentLength) return false;
  const bytes = Number(contentLength);
  return !Number.isFinite(bytes) || bytes > maxBytes;
}
