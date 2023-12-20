'use client';

import { AUTH_DATA_KEY, redirectUrl } from '@/config/auth';
import { Role } from '@/constants/roles';
import { AuthenticateUser } from '@/types/requests';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
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
  updateAuthenticateData: (data: AuthenticateUser) => void;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

const mockedUser: AuthenticateUser = {
  role: 'unknown',
  token: '1',
  user: {
    email: 'desconhecido@progy.com.br',
    id: -1,
    name: 'Desconhecido',
    role: Role.USER,
  },
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [authenticateData, setAuthenticateData] =
    useState<AuthenticateUser>(mockedUser);
  const router = useRouter();

  useEffect(() => {
    if (authenticateData.role !== 'unknown') return;

    const cookie = getCookie(AUTH_DATA_KEY);
    if (!cookie) return;

    try {
      const data: AuthenticateUser = JSON.parse(cookie);
      setAuthenticateData(data);
    } catch (error) {
      return;
    }
  }, [authenticateData]);

  function updateAuthenticateData(data: AuthenticateUser) {
    setAuthenticateData(data);
    setCookie(AUTH_DATA_KEY, JSON.stringify(data));
  }

  function signOut() {
    deleteCookie(AUTH_DATA_KEY);
    router.push(redirectUrl);
  }

  const value = {
    ...authenticateData,
    updateAuthenticateData,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
