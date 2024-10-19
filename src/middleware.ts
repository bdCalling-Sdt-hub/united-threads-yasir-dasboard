import { jwtDecode } from "jwt-decode"; // Use default import
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TUser } from "./redux/features/auth/authSlice";
import { logoutUser } from "./services/logout";

const authRoutes = ["/login", "/verifyEmail", "/forgetPassword", "/setNewPass"];
const adminRoutes = ["admin"];
const csrRoutes = ["csr"];

export function middleware(request: NextRequest) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("token")?.value;

  console.log("from middleware");

  if (!accessToken && !authRoutes.includes(request.nextUrl.pathname)) {
    // No token and not on login page, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken) {
    try {
      const user = jwtDecode<TUser>(accessToken);

      // Token expiration check
      if (user.exp && user.exp * 1000 < Date.now()) {
        // Token expired, redirect to login
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Handle role-based redirection for /admin routes

      const isAdminRoute = adminRoutes.includes(request.nextUrl.pathname.split("/")[1]);
      const isCsrRoute = csrRoutes.includes(request.nextUrl.pathname.split("/")[1]);

      if (isAdminRoute) {
        console.log(user, "from middleware");
        console.log(user.role);
        if (user.role !== "ADMIN") {
          cookiesStore.delete("token");
          cookiesStore.delete("refreshToken");
          return NextResponse.redirect(new URL("/login", request.url));
        }
      }

      // Handle role-based redirection for /csr routes
      if (csrRoutes.includes(request.nextUrl.pathname.split("/")[1])) {
        if (isCsrRoute) {
          cookiesStore.delete("token");
          cookiesStore.delete("refreshToken");
          return NextResponse.redirect(new URL("/login", request.url));
        }
        // Allow if the role matches
        return NextResponse.next();
      }

      // Default: continue if no redirection is required
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
  matcher: [
    "/admin",
    "/csr",
    "/customer-dashboard",
    "/login",
    "/verifyEmail",
    "/forgetPassword",
    "/setNewPass",
  ], // Define which routes to match
};
