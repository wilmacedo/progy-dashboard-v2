import cookieLib from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import { STORAGE_PATH } from './constants';

export default function middleware(request: NextRequest) {
  const path = `${STORAGE_PATH}/token`;

  const cookie = request.cookies.get(path)?.value;
  if (!cookie) {
    const token = request.nextUrl.searchParams.get('token');
    if (token) {
      const remember = request.nextUrl.searchParams.get('remember');
      const response = NextResponse.redirect(new URL('/', request.url));

      let options = {};
      if (remember === 'true') {
        options = {
          maxAge: 60 * 30,
        };
      }

      response.headers.set(
        'Set-Cookie',
        cookieLib.serialize(path, token, options),
      );

      return response;
    }

    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/', '/dashboard'],
};
