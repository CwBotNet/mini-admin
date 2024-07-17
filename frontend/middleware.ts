import { NextResponse, NextRequest } from "next/server";
import Cookies from "js-cookie";
// Consider using a dedicated library for cookie handling (e.g., js-cookie)
// This example assumes direct access to cookies

export function middleware(request: NextRequest) {
  const token = Cookies.get("token");

  if (request.nextUrl.pathname.startsWith("/admin") && !token) {
    return NextResponse.rewrite(new URL("/", request.url));
  } else {
    return NextResponse.rewrite(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/about/:path*", "/dashboard/:path*"],
};
