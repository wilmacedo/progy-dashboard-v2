import { AUTH_DATA_KEY } from '@/constants';
import { RequestData } from '@/services/auth';
import { NextRequest, NextResponse } from 'next/server';

const authValidate = (cookie: string | undefined) => {
  if (!cookie) return false;

  try {
    const data: RequestData = JSON.parse(cookie);
    if (!data.token) return false;

    return true;
  } catch (e) {
    return false;
  }
};

export default function middleware({ cookies, nextUrl, url }: NextRequest) {
  const response = NextResponse.redirect(new URL('/auth/login', url));

  const cookie = cookies.get(AUTH_DATA_KEY)?.value;
  if (authValidate(cookie)) return NextResponse.next();

  const urlParams = nextUrl.searchParams.get('data');
  if (!urlParams) return response;

  try {
    const data: RequestData = JSON.parse(urlParams);
    if (!data.token) return response;

    let options = {};
    const remember = nextUrl.searchParams.get('remember');
    if (remember === 'true') {
      options = {
        maxAge: 60 * 60 * 24 * 30, // 30 days
      };
    }

    const redirect = NextResponse.redirect(new URL('/', url));

    redirect.cookies.set({
      name: AUTH_DATA_KEY,
      value: JSON.stringify(data),
      ...options,
    });

    return redirect;
  } catch (e) {
    return NextResponse.redirect(new URL('/auth/login', url));
  }
}

export const config = {
  matcher: ['/', '/dashboard', '/settings/:path*'],
};
