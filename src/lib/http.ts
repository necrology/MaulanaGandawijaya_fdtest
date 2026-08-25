import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ data }, { status });
}

export function fail(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function requireAdmin() {
  const admin = await getAdminSession();
  if (!admin) {
    return fail("Unauthorized", 401);
  }

  return null;
}

export function handleError(error: unknown) {
  const message = error instanceof Error ? error.message : "Terjadi kesalahan.";
  return fail(message, 400);
}
