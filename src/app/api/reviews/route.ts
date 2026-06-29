import { NextResponse } from "next/server";
import { readDatabase, writeDatabase } from "@/lib/db";
import type { Review } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  
  const db = await readDatabase();
  
  if (productId) {
    const productReviews = db.reviews.filter((r: Review) => r.productId === Number(productId));
    return NextResponse.json({ reviews: productReviews });
  }
  
  return NextResponse.json({ reviews: db.reviews });
}

export async function POST(request: Request) {
  const body = await request.json();
  const db = await readDatabase();
  
  const review: Review = {
    id: Date.now(),
    productId: Number(body.productId),
    author: body.author || "Khách hàng",
    rating: Number(body.rating) || 5,
    comment: body.comment || "",
    createdAt: new Date().toISOString(),
  };
  
  db.reviews = [review, ...db.reviews];
  
  // Update product rating
  const product = db.products.find((p) => p.id === review.productId);
  if (product) {
    const productReviews = db.reviews.filter((r: Review) => r.productId === review.productId);
    const avgRating = productReviews.reduce((sum: number, r: Review) => sum + r.rating, 0) / productReviews.length;
    product.rating = Math.round(avgRating * 10) / 10;
    product.reviewCount = productReviews.length;
  }
  
  await writeDatabase(db);
  return NextResponse.json({ review });
}
