import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

interface ExtendedJwtPayload {
  role?: string;
  userName?: string;
  email?: string;
}

export async function middleware(req: Request) {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("accessToken");

  if (!tokenCookie?.value) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const token = tokenCookie.value;

  try {
    const decoded = jwtDecode<ExtendedJwtPayload>(token);
    const pathname = new URL(req.url).pathname;

    if (decoded.role === "ADMIN") {
      return NextResponse.next(); // ✅ Allow all
    }

    if (decoded.role === "SHOP_OWNER") {
      // ❌ Block these routes
      if (
        pathname.startsWith("/admin/dashboard") ||
        pathname.startsWith("/admin/users") ||
        pathname.startsWith("/admin/reviews") ||
        pathname.startsWith("/admin/store")
      ) {
        return NextResponse.redirect(new URL("/admin/food", req.url));
      }

      return NextResponse.next(); // ✅ Allow other /admin routes
    }

    // ❌ All others denied
    return NextResponse.redirect(new URL("/", req.url));
  } catch (error) {
    console.error("JWT decode error:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"], // ✅ Only runs for /admin routes
};
