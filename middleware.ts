import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/api/admin')) {
    const token = request.cookies.get('auth_token')

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET manquant')
      }

      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      const { payload } = await jose.jwtVerify(token.value, secret)
      
      if (!payload) {
        return NextResponse.redirect(new URL('/login', request.url))
      }

      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
} 