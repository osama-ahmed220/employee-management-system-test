import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const routeToMatch = ['employees'];

export default async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const pathnameHasLocale = routeToMatch.some(
    (rtm) => pathname.startsWith(`/${rtm}/`) || pathname === `/${rtm}`,
  );

  if (pathnameHasLocale) {
    return;
  }

  // eslint-disable-next-line consistent-return
  return NextResponse.redirect(
    new URL(`/employees${pathname.startsWith('/') ? '' : '/'}${pathname}${search}`, request.url),
  );
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|https://employee-management-system-test-omega.vercel.app|hub|favicon.ico|manifest.json).*)',
  ],
};
