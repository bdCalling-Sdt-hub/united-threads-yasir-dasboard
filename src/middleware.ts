import { jwtDecode } from "jwt-decode"; // Use default import
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { TUser } from "./redux/features/auth/authSlice";

const authRoutes = ["/login", "/verifyEmail", "/forgetPassword", "/setNewPass"];
const adminRoutes = ["admin"];
const csrRoutes = ["csr"];

export function middleware(request: NextRequest) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("token")?.value;

  //if (!accessToken && !authRoutes.includes(request.nextUrl.pathname)) {
  //  // No token and not on login page, redirect to login
  //  return NextResponse.redirect(new URL("/login", request.url));
  //}
  // If a token is found, process it
  if (accessToken) {
    try {
      // Decode the token to extract user information
      const user = jwtDecode<TUser>(accessToken);

      // Check if the token has expired
      if (user.exp && user.exp * 1000 < Date.now()) {
        // Token has expired, redirect to login and delete the token from cookies
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("token"); // Delete the token
        response.cookies.delete("refreshToken"); // Delete the refresh token
        return response; // Return the response with cookies deleted
      }

      // Role-based redirection: check if the route is admin or CSR
      const isAdminRoute = adminRoutes.includes(request.nextUrl.pathname.split("/")[1]);
      const isCsrRoute = csrRoutes.includes(request.nextUrl.pathname.split("/")[1]);

      // Admin route check
      if (isAdminRoute) {
        if (user.role !== "ADMIN") {
          // If the user is not an admin, delete cookies and redirect to login
          const response = NextResponse.redirect(new URL("/login", request.url));
          response.cookies.delete("token");
          response.cookies.delete("refreshToken");
          return response;
        }
      }

      // CSR route check
      if (isCsrRoute) {
        if (user.role !== "CSR") {
          // If the user is not CSR, delete cookies and redirect to login
          const response = NextResponse.redirect(new URL("/login", request.url));
          response.cookies.delete("token");
          response.cookies.delete("refreshToken");
          return response;
        }
        // If the user role matches CSR, continue the request
        return NextResponse.next();
      }

      // Default: continue the request if no specific redirection is needed
      return NextResponse.next();
    } catch (error) {
      // Handle errors in JWT decoding
      console.error("JWT decoding failed:", error);
      // Redirect to login and delete the cookies if token decoding fails
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  // Default: if no token is present and no other checks apply, allow the request to proceed
  return NextResponse.next();
}

// Config for which routes the middleware should apply
export const config = {
  matcher: ["/:path*"], // Define which routes to match
};
