import { AUTH_DATA_KEY } from '@/constants';
import roles from '@/constants/roles';
import { RequestData } from '@/services/auth';
import { cookies } from 'next/headers';

export function getAuthCookieData(): RequestData | undefined {
  const authData = cookies().get(AUTH_DATA_KEY)?.value;
  if (!authData) return;

  try {
    const data: RequestData = JSON.parse(authData);
    return data;
  } catch (e) {}
}

export function retrieveUserRole() {
  const defaultRole = roles.low[roles.low.length - 1];

  const authData = getAuthCookieData();
  if (!authData) return defaultRole;

  const { role_id: roleId } = authData;

  return roleId;
}
