import { AUTH_DATA_KEY } from '@/constants';
import { parseCookies } from 'nookies';
import { RequestData } from '../auth';
import { baseConfig } from './base';
import { APIProps, APIResponse, ResponseData } from './types';

export async function api<T>({
  route,
  method,
  body,
}: APIProps): Promise<APIResponse<T>> {
  const base = baseConfig;
  const { [AUTH_DATA_KEY]: data } = parseCookies();

  try {
    const { token }: RequestData = JSON.parse(data);
    if (token) {
      base.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {}

  const request = await fetch(base.baseURL + route, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    ...base,
  });

  const response: ResponseData<T> = await request.json();

  return { ...response, status: request.status };
}
