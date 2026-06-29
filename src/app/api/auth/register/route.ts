import { NextResponse } from "next/server";
import { createPasswordHash, createToken } from "@/lib/auth";
import { createSession, readDatabase, writeDatabase } from "@/lib/db";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json();
  const db = await readDatabase();
  const trimmedEmail = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  // Validate required fields
  if (!trimmedEmail || !password) {
    return NextResponse.json({ success: false, message: "Thiếu email hoặc mật khẩu" }, { status: 400 });
  }

  // Validate email format
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return NextResponse.json({ success: false, message: "Email không hợp lệ" }, { status: 400 });
  }

  // Validate password strength (min 6 characters)
  if (password.length < 6) {
    return NextResponse.json({ success: false, message: "Mật khẩu phải có ít nhất 6 ký tự" }, { status: 400 });
  }

  // Validate name
  const name = String(body.name || "").trim();
  if (!name) {
    return NextResponse.json({ success: false, message: "Thiếu tên" }, { status: 400 });
  }

  // Check if email already exists
  const existing = db.users.find((user) => user.email.toLowerCase() === trimmedEmail);
  if (existing) {
    return NextResponse.json({ success: false, message: "Email đã tồn tại" }, { status: 409 });
  }

  const isFirstUser = db.users.length === 0;
  const user = {
    id: Date.now(),
    name,
    email: trimmedEmail,
    password: createPasswordHash(password),
    phone: body.phone || "",
    address: body.address || "",
    role: isFirstUser ? "admin" as const : "customer" as const,
  };

  db.users = [user, ...db.users];
  const token = await createSession(user.id);
  await writeDatabase(db);

  return NextResponse.json({ success: true, user: { ...user, password: "" }, token });
}
