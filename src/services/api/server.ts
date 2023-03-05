import { getAuthCookieData } from '@/utils/auth';
import { baseConfig } from './base';
import { APIProps, APIResponse, ResponseData } from './types';

export async function api<T>({
  route,
  method,
  body,
}: APIProps): Promise<APIResponse<T>> {
  const base = baseConfig;
  const data = getAuthCookieData();
  if (data) {
    const { token } = data;
    if (token) {
      base.headers.Authorization = `Bearer ${token}`;
    }
  }

  const request = await fetch(base.baseURL + route, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    ...base,
  });

  const response: ResponseData<T> = await request.json();

  return { ...response, status: request.status };
}
