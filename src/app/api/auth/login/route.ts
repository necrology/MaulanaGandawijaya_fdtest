import { NextResponse } from "next/server";
import {
  findAdminByEmail,
  SESSION_COOKIE,
  signAdminSession,
  verifyPassword,
} from "@/lib/auth";
import { fail } from "@/lib/http";
import { requiredEmail, requiredString } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const email = requiredEmail(body.email);
    const password = requiredString(body.password, "Password");
    const admin = await findAdminByEmail(email);

    if (!admin || !(await verifyPassword(password, admin.password_hash))) {
      return fail("Email atau password salah.", 401);
    }

    const token = await signAdminSession({
      id: admin.id,
      name: admin.name,
      email: admin.email,
    });
    const response = NextResponse.json({
      data: { id: admin.id, name: admin.name, email: admin.email },
    });

    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * Number(process.env.ADMIN_SESSION_DAYS ?? 7),
    });

    return response;
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Login gagal.", 400);
  }
}
