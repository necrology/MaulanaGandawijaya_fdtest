import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import bcrypt from "bcryptjs";
import { SESSION_COOKIE } from "@/lib/auth-constants";
import { queryOne } from "@/lib/db";
import type { AdminUser } from "@/types/portfolio";

export { SESSION_COOKIE };

type AdminRow = AdminUser & {
  password_hash: string;
};

function secretKey() {
  return new TextEncoder().encode(
    process.env.AUTH_SECRET ?? "portfolio-local-development-secret",
  );
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function findAdminByEmail(email: string) {
  return queryOne<AdminRow>(
    "SELECT id, name, email, password_hash FROM admins WHERE email = ? LIMIT 1",
    [email],
  );
}

export async function signAdminSession(admin: AdminUser) {
  const days = Number(process.env.ADMIN_SESSION_DAYS ?? 7);

  return new SignJWT({
    id: admin.id,
    name: admin.name,
    email: admin.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${days}d`)
    .sign(secretKey());
}

export async function verifyAdminToken(token: string) {
  const { payload } = await jwtVerify(token, secretKey());

  if (
    typeof payload.id !== "number" ||
    typeof payload.name !== "string" ||
    typeof payload.email !== "string"
  ) {
    return null;
  }

  return {
    id: payload.id,
    name: payload.name,
    email: payload.email,
  } satisfies AdminUser;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}
