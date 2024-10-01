import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TUser } from "./redux/features/auth/authSlice";

const authRoutes = ["/login"];
const adminRoutes = ["/admin"];
export function middleware(request: NextRequest) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("token")?.value;

  if (!accessToken && !authRoutes.includes(request.nextUrl.pathname)) {
    // No token and not on login page, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken) {
    try {
      const user = jwtDecode(accessToken) as TUser;

      // find the token expiration date
      console.log(new Date(user.exp * 1000));

      // check also the token expiration
      if (user.exp * 1000 < Date.now()) {
        // Token expired, redirect to login
        return NextResponse.redirect(new URL("/login", request.url));
      }

      if (!user) {
        // Invalid or no user data in token, redirect to login
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Handle role-based redirection
      if (adminRoutes.includes(request.nextUrl.pathname)) {
        // Check if the user has ADMIN role for the /admin route
        if (user.role !== "ADMIN" && user.role !== "CSR") {
          return NextResponse.redirect(new URL("/login", request.url));
        }
      }

      // You can extend this to handle more routes for different user roles
      //if (authRoutes.includes(request.nextUrl.pathname)) {
      //  // If already logged in and accessing /login, redirect based on role
      //  if (user.role === "ADMIN") {
      //    return NextResponse.redirect(new URL("/admin", request.url));
      //  } else if (user.role === "CSR") {
      //    return NextResponse.redirect(new URL("/csr", request.url));
      //  } else if (user.role === "CUSTOMER") {
      //    return NextResponse.redirect(new URL("/customer-dashboard", request.url));
      //  }
      //}

      // Continue if no redirection is needed
      return NextResponse.next();
    } catch (error) {
      console.error("JWT decoding failed:", error);
      // If token decoding fails, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Default: continue the request
  return NextResponse.next();
}

// Config for which routes the middleware should apply
export const config = {
  matcher: ["/admin", "/csr", "/customer-dashboard", "/login"], // Define which routes to match
};
