import "server-only";

import { timingSafeEqual } from "node:crypto";
import bcrypt from "bcrypt";

import { prisma } from "@/prisma/client";

export type UserCredentials = {
  username: string;
  password: string;
  verif: string;
};

export type AuthenticatedUser = {
  id: number;
  username: string;
};

export async function getUserByCredentials(
  credentials: UserCredentials,
): Promise<AuthenticatedUser | null> {
  const user = await prisma.user.findFirst({
    where: { username: credentials.username },
    select: { id: true, username: true, password: true, verif: true },
  });
  if (!user) return null;

  const [validPassword, validVerification] = await Promise.all([
    compareCredential(credentials.password, user.password),
    compareCredential(credentials.verif, user.verif),
  ]);

  return validPassword && validVerification
    ? { id: user.id, username: user.username }
    : null;
}

async function compareCredential(candidate: string, storedValue: string) {
  if (/^\$2[aby]\$/.test(storedValue)) {
    return bcrypt.compare(candidate, storedValue);
  }

  const candidateBuffer = Buffer.from(candidate);
  const storedBuffer = Buffer.from(storedValue);
  if (candidateBuffer.length !== storedBuffer.length) return false;
  return timingSafeEqual(candidateBuffer, storedBuffer);
}
