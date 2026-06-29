import { NextResponse } from "next/server";
import { readDatabase, writeDatabase, getAuthenticatedUser } from "@/lib/db";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || null;
  const user = await getAuthenticatedUser(token);
  const db = await readDatabase();

  if (user?.role === "admin") {
    return NextResponse.json({ orders: db.orders });
  }

  const orders = user
    ? db.orders.filter((order) => order.userId === user.id)
    : [];
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || null;
  const user = await getAuthenticatedUser(token);

  const body = await request.json();
  const db = await readDatabase();
  const order = {
    id: Date.now(),
    userId: user?.id,
    customerName: body.customerName || "Khách hàng",
    phone: body.phone || "",
    address: body.address || "",
    note: body.note || "",
    paymentMethod: body.paymentMethod || "cod",
    items: body.items || [],
    total: Number(body.total) || 0,
    status: "pending" as const,
    createdAt: new Date().toLocaleString("vi-VN"),
  };
  db.orders = [order, ...db.orders];
  await writeDatabase(db);
  return NextResponse.json({ order });
}
