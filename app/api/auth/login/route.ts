import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth/password";
import { applySessionCookie, createSessionToken } from "@/lib/auth/session";
import { findUserRowByEmail } from "@/lib/db/users";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json({ error: "Enter your email and password." }, { status: 400 });
    }

    const userRow = findUserRowByEmail(email);

    if (!userRow || !verifyPassword(password, userRow.password_hash)) {
      return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
    }

    const response = NextResponse.json({
      ok: true,
      user: {
        id: userRow.id,
        email: userRow.email,
      },
    });

    applySessionCookie(response, createSessionToken({ userId: userRow.id, email: userRow.email }));
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to sign in." }, { status: 500 });
  }
}
