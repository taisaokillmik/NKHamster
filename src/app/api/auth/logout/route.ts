import { NextResponse } from "next/server";
import { removeSession } from "@/lib/db";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || null;
  if (token) {
    await removeSession(token);
  }
  const response = NextResponse.json({ success: true });
  response.cookies.delete("nk-admin-token");
  return response;
}
