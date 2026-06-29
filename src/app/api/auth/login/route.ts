import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth";
import { createSession, readDatabase } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const db = await readDatabase();
  const trimmedEmail = String(body.email || "").trim().toLowerCase();
  const user = db.users.find((item) => item.email.toLowerCase() === trimmedEmail);

  if (!user || !verifyPassword(String(body.password), user.password)) {
    return NextResponse.json({ success: false, message: "Email hoặc mật khẩu không đúng" }, { status: 401 });
  }

  const token = await createSession(user.id);
  const response = NextResponse.json({ success: true, user: { ...user, password: "" }, token });

  if (user.role === "admin") {
    response.cookies.set("nk-admin-token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return response;
}
