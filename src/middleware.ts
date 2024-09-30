import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/login"];
export function middleware(request: NextRequest) {
  const cookiesStore = cookies();

  if (!cookiesStore.has("token") && !authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  console.log(cookiesStore.has("token"));

  //   return NextResponse.redirect(new URL(request.nextUrl.pathname, request.url))
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/((?!general).*)'
  matcher: [
    "/dashboard",
    "/login",
    "/accounts",
    "/add-doctor",
    "/profile",
    "/privacy-policy",
    "/notifications",
  ],
};
