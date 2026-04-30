import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Normalize casing — redirect /Login to /login to avoid 404s ──
  const corePaths = ['/login', '/register', '/student', '/counselor', '/admin'];
  const lowerPath = pathname.toLowerCase();

  if (corePaths.some(p => lowerPath.startsWith(p)) && pathname !== lowerPath) {
    return NextResponse.redirect(new URL(lowerPath, request.url));
  }

  // ── Public routes — always allow ──
  const publicPaths = ['/', '/login', '/register'];
  if (publicPaths.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next();
  }

  // ── Supabase Auth Check ──
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const isStudentRoute = pathname.startsWith('/student');
  const isCounselorRoute = pathname.startsWith('/counselor');
  const isAdminRoute = pathname.startsWith('/admin');

  // Redirect unauthenticated users to login
  if (!user && (isStudentRoute || isCounselorRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // RBAC: Check role from user metadata or profile
  if (user) {
    const role = user.user_metadata?.role || 'student';

    if (role === 'student' && (isCounselorRoute || isAdminRoute)) {
      return NextResponse.redirect(new URL('/student', request.url));
    }
    if (role === 'counselor' && (isStudentRoute || isAdminRoute)) {
      return NextResponse.redirect(new URL('/counselor', request.url));
    }
    if (role === 'admin' && (isStudentRoute || isCounselorRoute)) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Redirect logged-in users away from auth pages
    if (pathname === '/login' || pathname === '/register') {
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
