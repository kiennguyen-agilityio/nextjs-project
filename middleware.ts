import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// constants
import { ROUTER } from './src/constants/router';

export function middleware(request: NextRequest) {
  if (
    process.env.NODE_ENV === 'development' &&
    request.nextUrl.pathname === '/'
  ) {
    return NextResponse.redirect(new URL(ROUTER.USERS, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
