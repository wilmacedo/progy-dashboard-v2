export interface SignInRequestData {
  email: string;
  password: string;
  remember?: boolean;
}

interface SignInResponseData {
  status: number;
  data: {
    token: string;
    role_id: number;
  };
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
