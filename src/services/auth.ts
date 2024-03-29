import { AuthUser } from '@/types/request';
import { api } from './api/client';

export interface SignInRequestData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RequestData {
  token: string;
  role_id: number;
  user: AuthUser;
}

interface SignInResponseData {
  status: number;
  data?: RequestData;
}

export async function signInRequest(
  data: SignInRequestData,
): Promise<SignInResponseData> {
  const { status, data: response } = await api<RequestData>({
    route: '/users/login',
    method: 'POST',
    body: data,
  });

  return { status, data: response };
}
