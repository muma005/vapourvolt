import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth/password";
import { applySessionCookie, createSessionToken } from "@/lib/auth/session";
import { createUser, findUserRowByEmail } from "@/lib/db/users";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const company = typeof body.company === "string" ? body.company.trim() : "";
    const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!name || !company || !email || !password) {
      return NextResponse.json({ error: "Complete all required fields." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Use a password with at least 8 characters." }, { status: 400 });
    }

    if (findUserRowByEmail(email)) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const user = createUser({
      name,
      company,
      email,
      passwordHash: hashPassword(password),
    });

    const response = NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });

    applySessionCookie(response, createSessionToken({ userId: user.id, email: user.email }));
    return response;
  } catch (caughtError) {
    const message = caughtError instanceof Error ? caughtError.message : "Unable to create account.";

    if (message.toLowerCase().includes("unique") || message.toLowerCase().includes("users.email")) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    console.error("Signup failed:", caughtError);

    return NextResponse.json(
      {
        error: process.env.NODE_ENV === "development" ? message : "Unable to create account.",
      },
      { status: 500 },
    );
  }
}
