import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readDatabase } from "@/lib/db";

export const runtime = "nodejs";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("nk-admin-token")?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL("/account?redirect=admin", request.url));
    }

    // Validate token against database
    try {
      const db = await readDatabase();
      const session = db.sessions.find((s) => s.token === token);
      
      if (!session) {
        // Token not found in database, redirect to login
        const response = NextResponse.redirect(new URL("/account?redirect=admin", request.url));
        response.cookies.delete("nk-admin-token");
        return response;
      }

      // Check if user is admin
      const user = db.users.find((u) => u.id === session.userId);
      if (!user || user.role !== "admin") {
        return NextResponse.redirect(new URL("/account?redirect=admin", request.url));
      }
    } catch (error) {
      // If database read fails, redirect to login for safety
      return NextResponse.redirect(new URL("/account?redirect=admin", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
