import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const url = new URL(req.url);
    const referer = req.headers.get("referer");

    // Allow payment-related redirects to pass through
    if (url.searchParams.has('order_id') && url.searchParams.has('status_code')) {
        return NextResponse.next();
    }

    // If user is trying to access tutor-register from tutor page
    if (url.pathname === "/tutor-register" && referer?.includes("/tutor")) {
        if (!token) {
            // Store the intended destination in a cookie
            const response = NextResponse.redirect(new URL("/login", req.url));
            response.cookies.set("redirectAfterLogin", "/tutor-register");
            return response;
        }
    }

    // Check for protected routes
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

// protect specific routes
export const config = {
    matcher: [
        "/student-dashboard/:path*",
        "/tutor-dashboard/:path*",
        "/wishlist",
        "/shopping-cart"
    ],
};
