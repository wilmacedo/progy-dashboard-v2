import { NextRequest, NextResponse } from 'next/server';
import { AUTH_DATA_KEY, redirectUrl } from './config/auth';
import { AuthenticateUser } from './types/requests';

export default function middleware({ cookies, url }: NextRequest) {
  const cookie = cookies.get(AUTH_DATA_KEY);
  if (!cookie || !cookie.value) {
    return NextResponse.redirect(new URL(redirectUrl, url));
  }

  try {
    const token = JSON.parse(cookie.value) as AuthenticateUser;
    if (!token.token) throw new Error();

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL(redirectUrl, url));
  }
}

export const config = {
  matcher: ['/', '/dashboard', '/settings/:path*', '/module'],
};
