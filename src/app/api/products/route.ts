import { NextResponse } from "next/server";
import { readDatabase, writeDatabase } from "@/lib/db";
import type { Product } from "@/types";

export async function GET() {
  const db = await readDatabase();
  return NextResponse.json({ products: db.products });
}

export async function POST(request: Request) {
  const body = await request.json();
  const db = await readDatabase();
  const product: Product = {
    id: Date.now(),
    name: body.name || "",
    slug: (body.name || "").toLowerCase().replace(/\s/g, "-"),
    category: body.category || "hamster",
    price: Number(body.price) || 0,
    image: body.image || "https://placehold.co/400x400/FDE68A/92400E?text=New",
    description: body.description || "",
    stock: Number(body.stock) || 0,
    rating: 0,
    reviewCount: 0,
  };

  db.products = [product, ...db.products];
  await writeDatabase(db);
  return NextResponse.json({ product });
}
