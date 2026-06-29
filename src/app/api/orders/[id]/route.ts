import { NextResponse } from "next/server";
import { readDatabase, writeDatabase } from "@/lib/db";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const db = await readDatabase();
  const id = Number(params.id);
  let updatedOrder: any = null;

  db.orders = db.orders.map((order) => {
    if (order.id === id) {
      updatedOrder = { ...order, status: body.status || order.status };
      return updatedOrder;
    }
    return order;
  });

  await writeDatabase(db);
  return NextResponse.json({ order: updatedOrder });
}
