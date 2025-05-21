import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const url = new URL(req.url);

    // Allow payment-related redirects to pass through
    if (url.searchParams.has('order_id') && url.searchParams.has('status_code')) {
        return NextResponse.next();
    }

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
        "/tutor-register",
        "/wishlist",
        "/shopping-cart"
    ],
};
