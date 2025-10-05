"use server";
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// ❌ SÉCURITÉ: Ne jamais utiliser NEXT_PUBLIC_ pour des secrets
// const secretKey = process.env.NEXT_PUBLIC_SECRET_SESSION
// ✅ Utiliser une variable d'environnement privée
const secretKey = process.env.JWT_SECRET_KEY;
console.log(secretKey);
if (!secretKey) {
    throw new Error('JWT_SECRET_KEY must be defined in environment variables');
}

const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: { username: string; expires: Date }) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
    if (!session) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.error('Failed to verify session:', error);
        return null;
    }
}

export async function createSession(username: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ username, expires: expiresAt });

    // ✅ Next.js 15: cookies() est maintenant asynchrone
    const cookieStore = await cookies();
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}

export async function updateSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    const payload = await decrypt(session);

    if (!session || !payload) {
        return null;
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // ✅ Regénérer le token avec la nouvelle expiration
    const newSession = await encrypt({
        username: payload.username as string,
        expires
    });

    cookieStore.set('session', newSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expires,
        sameSite: 'lax',
        path: '/',
    });

    return { username: payload.username, expires };
}

// ✅ Fonction helper pour obtenir la session courante
export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    return await decrypt(session);
}

// ✅ Fonction helper pour vérifier si l'utilisateur est authentifié
export async function isAuthenticated(): Promise<boolean> {
    const session = await getSession();
    return session !== null;
}
