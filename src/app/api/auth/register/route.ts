import { NextResponse } from "next/server";
import { createPasswordHash, createToken } from "@/lib/auth";
import { createSession, readDatabase, writeDatabase } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const db = await readDatabase();
  const trimmedEmail = String(body.email || "").trim().toLowerCase();

  if (!trimmedEmail || !body.password) {
    return NextResponse.json({ success: false, message: "Thiếu email hoặc mật khẩu" }, { status: 400 });
  }

  const existing = db.users.find((user) => user.email.toLowerCase() === trimmedEmail);
  if (existing) {
    return NextResponse.json({ success: false, message: "Email đã tồn tại" }, { status: 409 });
  }

  const isFirstUser = db.users.length === 0;
  const user = {
    id: Date.now(),
    name: String(body.name || "Khách hàng").trim(),
    email: trimmedEmail,
    password: createPasswordHash(String(body.password)),
    phone: body.phone || "",
    address: body.address || "",
    role: isFirstUser ? "admin" as const : "customer" as const,
  };

  db.users = [user, ...db.users];
  const token = await createSession(user.id);
  await writeDatabase(db);

  return NextResponse.json({ success: true, user: { ...user, password: "" }, token });
}
