'use client';

import { AUTH_DATA_KEY } from '@/constants';
import roles from '@/constants/roles';
import { RequestData, signInRequest, SignInRequestData } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies } from 'nookies';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

interface AuthProviderProps {
  children: ReactNode;
}

interface UserData {
  name: string;
  email: string;
}

interface AuthContextType {
  user?: UserData;
  signIn: (data: SignInRequestData) => Promise<number | undefined>;
  signOut: () => void;
  retrieveUserRole: () => number;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData | undefined>();
  const router = useRouter();

  useEffect(() => {
    if (user) return;

    try {
      const cookies = parseCookies();
      const authData = cookies[AUTH_DATA_KEY];
      if (!authData) return;

      const { user: userData } = JSON.parse(authData);
      if (!userData) return;

      setUser(userData);
    } catch (e) {
      toast.warn('Erro ao carregar as informações do usuário');
    }
  }, [user]);

  async function signIn({ email, password, remember }: SignInRequestData) {
    const { status, data } = await signInRequest({ email, password });

    const valideStatus = [200, 201, 304];
    if (!valideStatus.includes(status)) {
      return status;
    }

    const params = new URLSearchParams();
    params.append('data', JSON.stringify(data));
    if (remember) params.append('remember', remember.toString());

    setUser(data.user);
    router.push(`/?${params.toString()}`);
  }

  function signOut() {
    destroyCookie(undefined, AUTH_DATA_KEY);
    router.push('/auth/login');
  }

  function retrieveUserRole() {
    const defaultRole = roles.low[roles.low.length - 1];

    const cookies = parseCookies();
    if (!cookies) return defaultRole;

    const authData = cookies[AUTH_DATA_KEY];
    if (!authData) return defaultRole;

    try {
      const { role_id: roleId }: RequestData = JSON.parse(authData);

      return roleId;
    } catch (e) {
      return defaultRole;
    }
  }

  function isAuthenticated() {
    const cookies = parseCookies();
    if (!cookies) return false;

    const authData = cookies[AUTH_DATA_KEY];
    if (!authData) return false;

    return true;
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, user, retrieveUserRole, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
