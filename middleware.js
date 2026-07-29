import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

function getAllowlist() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
}

export async function middleware(request) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl
  const allowlist = getAllowlist()

  const isProtectedAdmin = pathname.startsWith('/admin') && pathname !== '/admin/login'

  if (isProtectedAdmin) {
    if (!user) {
      const url = new URL('/admin/login', request.url)
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }
    // Allowlist check: if allowlist is set, user must be on it.
    if (allowlist.length > 0 && !allowlist.includes((user.email || '').toLowerCase())) {
      await supabase.auth.signOut()
      const url = new URL('/admin/login', request.url)
      url.searchParams.set('error', 'unauthorized')
      return NextResponse.redirect(url)
    }
  }

  if (pathname === '/admin/login' && user) {
    if (allowlist.length === 0 || allowlist.includes((user.email || '').toLowerCase())) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
