import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const url = new URL(req.url);
    const referer = req.headers.get("referer");

    // Allow payment-related redirects to pass through
    if (url.searchParams.has('order_id') && url.searchParams.has('status_code')) {
        return NextResponse.next();
    }

    // Allow access to purchase history page (backend redirects here after payment)
    if (url.pathname === "/student-dashboard") {
        return NextResponse.next();
    }

    // If user is trying to access tutor-register from tutor page
    if (url.pathname === "/tutor-register" && referer?.includes("/tutor")) {
        if (!token) {
            // Store the intended destination in a cookie
            const response = NextResponse.redirect(new URL("/login", req.url));
            response.cookies.set("redirectAfterLogin", "/tutor-register", {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/'
            });
            return response;
        }
    }

    // Check for protected routes
    if (!token) {
        // Store the intended destination in a cookie for redirect after login
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.set("redirectAfterLogin", url.pathname, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });
        return response;
    }

    // Check if token is expired
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
            // Token is expired, remove it and redirect to login
            const response = NextResponse.redirect(new URL("/login", req.url));
            response.cookies.delete("token");
            return response;
        }
    } catch (error) {
        // If token is invalid, remove it and redirect to login
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("token");
        return response;
    }

    return NextResponse.next();
}

// protect specific routes
export const config = {
    matcher: [
        "/student-dashboard/:path*",
        "/tutor-dashboard/:path*",
        "/wishlist",
        "/shopping-cart",
        "/tutor-register/:path*"
    ],
};
