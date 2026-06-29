import { NextResponse } from "next/server";
import { getAuthenticatedUser, readDatabase, writeDatabase } from "@/lib/db";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || null;
  const user = await getAuthenticatedUser(token);
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json({ user: { ...user, password: "" } });
}

export async function PATCH(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || null;
  const user = await getAuthenticatedUser(token);
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const body = await request.json();
  const db = await readDatabase();
  db.users = db.users.map((item) =>
    item.id === user.id
      ? { ...item, ...body, name: body.name || item.name, phone: body.phone || item.phone || "", address: body.address || item.address || "" }
      : item
  );
  await writeDatabase(db);
  const updated = db.users.find((item) => item.id === user.id);
  return NextResponse.json({ user: updated ? { ...updated, password: "" } : null });
}
