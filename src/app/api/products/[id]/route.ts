import { NextResponse } from "next/server";
import { readDatabase, writeDatabase } from "@/lib/db";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const db = await readDatabase();
  const id = Number(params.id);
  db.products = db.products.map((product) =>
    product.id === id
      ? {
          ...product,
          ...body,
          price: Number(body.price) || product.price,
          stock: Number(body.stock) || product.stock,
          slug: (body.name || product.name).toLowerCase().replace(/\s/g, "-"),
        }
      : product
  );
  await writeDatabase(db);
  return NextResponse.json({ success: true });
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const db = await readDatabase();
  const id = Number(params.id);
  db.products = db.products.filter((product) => product.id !== id);
  await writeDatabase(db);
  return NextResponse.json({ success: true });
}
