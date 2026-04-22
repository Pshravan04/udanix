import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-example.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // For demo/UI purposes, we check a mock role cookie if real user is absent.
  // In production, fetch the role from public.users or user.app_metadata
  const mockRole = request.cookies.get('mock_role')?.value;
  const isAuthenticated = user || mockRole;
  
  const role = mockRole || 'student'; // Fallback to student for demo 

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login')
  const isStudentRoute = request.nextUrl.pathname.startsWith('/student')
  const isCounselorRoute = request.nextUrl.pathname.startsWith('/counselor')
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

  if (!isAuthenticated && (isStudentRoute || isCounselorRoute || isAdminRoute)) {
    // Redirect to login if unauthenticated
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthenticated && isAuthRoute) {
    // Redirect logged in users away from login page to their respective portal
    if (role === 'admin') return NextResponse.redirect(new URL('/admin', request.url));
    if (role === 'counselor') return NextResponse.redirect(new URL('/counselor', request.url));
    return NextResponse.redirect(new URL('/student', request.url));
  }

  // RBAC checks
  if (role === 'student' && (isCounselorRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL('/student', request.url))
  }
  
  if (role === 'counselor' && (isStudentRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL('/counselor', request.url))
  }

  if (role === 'admin' && (isStudentRoute || isCounselorRoute)) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
