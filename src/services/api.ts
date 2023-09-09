import { AUTH_DATA_KEY } from '@/config/auth';
import { AuthenticateUser } from '@/types/requests';
import { cookies } from 'next/headers';

interface Response<T> {
  data: T;
  status: number;
}

function getToken() {
  const token = cookies().get(AUTH_DATA_KEY);
  if (!token) {
    return null;
  }

  try {
    const { value } = token;
    const parsedToken = JSON.parse(value) as AuthenticateUser;

    return parsedToken;
  } catch (error) {
    return null;
  }
}

async function getHeaders(params?: RequestInit): Promise<HeadersInit> {
  let headers = {};
  if (params) {
    headers = { ...params.headers };
  }

  let method = params?.method ?? 'GET';
  if (['POST', 'PUT'].includes(method)) {
    headers = { ...headers, 'Content-Type': 'application/json' };
  }

  const token = getToken();
  if (token !== null) {
    headers = { ...headers, Authorization: `Bearer ${token.token}` };
  }

  return headers;
}

export async function api<T>(
  route: string,
  params?: RequestInit,
): Promise<Response<T>> {
  const headers = await getHeaders(params);

  const baseUrl = process.env.API_URL || 'http://localhost:3333';
  const request = await fetch(baseUrl + route, { ...params, headers });
  if (request.status === 204) {
    return { data: {} as T, status: request.status };
  }

  const response = await request.json();

  return { data: response.data, status: request.status };
}
