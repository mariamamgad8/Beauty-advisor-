import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define routes that require authentication
const protectedRoutes = ["/dashboard", "/upload-photo", "/select-event", "/recommendations", "/profile"]

// Define routes that should redirect to dashboard if already authenticated
const authRoutes = ["/login", "/signup", "/forgot-password"]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const path = req.nextUrl.pathname

  // Handle protected routes
  if (protectedRoutes.some((route) => path.startsWith(route)) && !session) {
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("redirectTo", path)
    return NextResponse.redirect(redirectUrl)
  }

  // Handle auth routes (redirect to dashboard if already logged in)
  if (authRoutes.some((route) => path.startsWith(route)) && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}

