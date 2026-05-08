// middleware.ts (na raiz do projeto, junto com package.json)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const isLoginPage = request.nextUrl.pathname === '/login'

  if (!token && !isLoginPage) {
    // Redireciona para login se não autenticado
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && isLoginPage) {
    // Já logado, manda para home
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Quais rotas o middleware vai interceptar
export const config = {
  matcher: ['/home/:path*, //:path*, /login/:path*']
}