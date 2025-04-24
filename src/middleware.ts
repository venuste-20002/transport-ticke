import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Cookie } from "undici-types";

export const config = {
  matcher: [
    // eg :
    // "/home/:path*",
  ],
};

export async function middleware(request: NextRequest) {
  const cookieToken: Cookie | undefined = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  const publicPaths: string[] = [
    // eg : 
    // "/login",
  ];

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }



  return NextResponse.next();
}
