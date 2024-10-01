import { TUser } from "@/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/login"];
export function middleware(request: NextRequest) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("token")?.value;

  if (!accessToken && !authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    if (accessToken) {
      const user = jwtDecode(accessToken) as TUser;

      if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      return NextResponse.redirect(new URL(request.nextUrl.pathname, request.url));
    }
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"],
};
