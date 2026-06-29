import { NextResponse } from 'next/server';
import { readDatabase } from '@/lib/db';

export async function GET() {
  try {
    const db = await readDatabase();
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: {
        products: db.products.length,
        users: db.users.length,
        orders: db.orders.length,
        reviews: db.reviews.length,
      },
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
