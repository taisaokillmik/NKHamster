import { NextResponse } from "next/server";
import { getAuthenticatedUser, readDatabase } from "@/lib/db";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || null;
  const user = await getAuthenticatedUser(token);

  if (!user || user.role !== "admin") {
    return NextResponse.json({ users: [] }, { status: 403 });
  }

  const db = await readDatabase();
  const users = db.users.map(({ password: _p, ...u }) => u);
  return NextResponse.json({ users });
}
