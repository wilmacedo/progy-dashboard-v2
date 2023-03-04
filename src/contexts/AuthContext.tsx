'use client';

import { STORAGE_PATH } from '@/constants';
import { signInRequest, SignInRequestData } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import { createContext, ReactNode, useContext } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (data: SignInRequestData) => Promise<number | undefined>;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const isAuthenticated = false;

  async function signIn({ email, password, remember }: SignInRequestData) {
    const { status, data } = await signInRequest({ email, password });

    const valideStatus = [200, 201, 304];
    if (!valideStatus.includes(status)) {
      return status;
    }

    const params = new URLSearchParams();
    params.append('token', data.token);
    if (remember) params.append('remember', remember.toString());

    router.push(`/?${params.toString()}`);
  }

  function signOut() {
    destroyCookie(undefined, `${STORAGE_PATH}/token`);
    router.push('/auth/login');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
