import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  // If the user is trying to access the admin route and they don't have a token, redirect to the home page
  if (request.nextUrl.pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user is trying to access the home route and they have a token, redirect to the admin page
  if (request.nextUrl.pathname === "/" && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Allow the request to proceed as normal
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/"],
};
