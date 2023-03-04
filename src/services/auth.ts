import { User } from '@/types/user';

export interface SignInRequestData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RequestData {
  token: string;
  role_id: number;
  user: User;
}

interface SignInResponseData {
  status: number;
  data: RequestData;
}

export async function signInRequest(
  data: SignInRequestData,
): Promise<SignInResponseData> {
  const request = await fetch(`${process.env.API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const response = await request.json();
  return { status: request.status, data: response };
}
