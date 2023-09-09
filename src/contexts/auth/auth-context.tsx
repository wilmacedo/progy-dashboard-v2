'use client';

import { AUTH_DATA_KEY, redirectUrl } from '@/config/auth';
import { AuthenticateUser } from '@/types/requests';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextData extends AuthenticateUser {
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

const mockedUser: AuthenticateUser = {
  role_id: -1,
  token: '1',
  user: {
    email: 'desconhecido@progy.com.br',
    id: -1,
    name: 'Desconhecido',
  },
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [authenticateData, setAuthenticateData] =
    useState<AuthenticateUser>(mockedUser);
  const router = useRouter();

  useEffect(() => {
    if (authenticateData.role_id !== -1) return;

    const cookie = getCookie(AUTH_DATA_KEY);
    if (!cookie) return;

    try {
      const data: AuthenticateUser = JSON.parse(cookie);
      setAuthenticateData(data);
    } catch (error) {
      return;
    }
  }, [authenticateData]);

  function signOut() {
    deleteCookie(AUTH_DATA_KEY);
    router.push(redirectUrl);
  }

  const value = {
    ...authenticateData,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
