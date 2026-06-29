import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { products as initialProducts } from "@/data/products";
import type { Order, Product, Promotion, Review, User } from "@/types";

export interface DatabaseShape {
  products: Product[];
  users: User[];
  orders: Order[];
  reviews: Review[];
  promotions: Promotion[];
  sessions: Array<{ id: number; userId: number; token: string; createdAt: string }>;
}

const dbDir = path.resolve(process.cwd(), "data");
const dbPath = process.env.DB_PATH 
  ? path.resolve(process.env.DB_PATH)
  : path.resolve(dbDir, "app-db.json");

// Đảm bảo dbPath là an toàn, tránh path traversal
function assertSafePath(target: string) {
  // Nếu DB_PATH được set qua env, trust nó (đã được admin config)
  // Nếu dùng path mặc định, kiểm tra path traversal
  if (!process.env.DB_PATH) {
    const base = path.resolve(process.cwd(), "data");
    if (!target.startsWith(base)) {
      throw new Error("Path traversal detected");
    }
  }
}

const defaultDatabase = (): DatabaseShape => ({
  products: initialProducts,
  users: [],
  orders: [],
  reviews: [],
  promotions: [
    {
      id: 1,
      title: "Giảm 10% đơn đầu tiên",
      description: "Dành cho khách mới",
      discountPercent: 10,
      active: true,
    },
  ],
  sessions: [],
});

export async function readDatabase(): Promise<DatabaseShape> {
  try {
    assertSafePath(dbPath);
    await fs.mkdir(dbDir, { recursive: true });
    const file = await fs.readFile(dbPath, "utf8");
    return JSON.parse(file) as DatabaseShape;
  } catch {
    const initial = defaultDatabase();
    await writeDatabase(initial);
    return initial;
  }
}

export async function writeDatabase(database: DatabaseShape) {
  assertSafePath(dbPath);
  await fs.mkdir(dbDir, { recursive: true });
  await fs.writeFile(dbPath, JSON.stringify(database, null, 2), "utf8");
}

export async function getAuthenticatedUser(token: string | null) {
  if (!token) return null;
  const db = await readDatabase();
  const session = db.sessions.find((item) => {
    try {
      const a = Buffer.from(item.token, "utf8");
      const b = Buffer.from(token, "utf8");
      // timingSafeEqual yêu cầu 2 buffer cùng độ dài
      if (a.length !== b.length) return false;
      return crypto.timingSafeEqual(a, b);
    } catch {
      return false;
    }
  });
  if (!session) return null;
  return db.users.find((user) => user.id === session.userId) ?? null;
}

export async function createSession(userId: number) {
  const db = await readDatabase();
  const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  db.sessions = [
    ...db.sessions.filter((item) => item.userId !== userId),
    { id: Date.now(), userId, token, createdAt: new Date().toISOString() },
  ];
  await writeDatabase(db);
  return token;
}

export async function removeSession(token: string) {
  const db = await readDatabase();
  db.sessions = db.sessions.filter((item) => item.token !== token);
  await writeDatabase(db);
}
