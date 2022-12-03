import { getToken }  from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from 'next/server';


export async function middleware(req) {
    // Token will exist if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET});

    const { pathname, origin } = req.nextUrl

    // Allow request if the following is true..
    // 1) Its a request for the next-auth session & provider fetching
    // 2) The token exists
    if (pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    }
    
    if (!token && pathname == '/encapsulate') {
        return NextResponse.redirect(`${origin}`);
    }
}