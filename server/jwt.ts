import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export const SESSION_COOKIE = "samadhan.session";
export const SESSION_MAX_AGE = 7 * 24 * 60 * 60;

export interface SessionUser {
  id: string;
  role: string;
  name: string;
  orgId?: string;
}

export interface SessionPayload extends JWTPayload {
  sub: string;
  role: string;
}

export const getSecretKey = (): Uint8Array => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET env var is missing or shorter than 32 characters");
  }
  return new TextEncoder().encode(secret);
};

export const signSession = async (payload: SessionPayload): Promise<string> => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecretKey());
};

export const verifySessionToken = async (
  token: string,
): Promise<SessionPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });
    if (typeof payload.sub !== "string" || typeof payload.role !== "string") {
      return null;
    }
    return { sub: payload.sub, role: payload.role };
  } catch {
    return null;
  }
};