import { NextRequest, NextResponse } from "next/server";
import { handleGetUser } from "./lib/server/auth";

export async function middleware(request: NextRequest) {
  const user = await handleGetUser();

  if (!user && !request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (user && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/((?!.*\\..*|_next).*)",
};
