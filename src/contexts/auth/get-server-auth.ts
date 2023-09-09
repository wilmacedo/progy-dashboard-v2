import { AUTH_DATA_KEY } from '@/config/auth';
import { AuthenticateUser } from '@/types/requests';
import { cookies } from 'next/headers';

export function getServerAuth(): AuthenticateUser | null {
  const cookie = cookies().get(AUTH_DATA_KEY);
  if (!cookie || !cookie.value) return null;

  try {
    const data: AuthenticateUser = JSON.parse(cookie.value);
    if (!data.token) return null;

    return data;
  } catch (error) {
    return null;
  }
}
