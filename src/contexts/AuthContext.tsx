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
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData | undefined>();
  const router = useRouter();

  function getAuthCookieData() {
    const cookies = parseCookies();
    const authData = cookies[AUTH_DATA_KEY];
    if (!authData) return;

    try {
      const data: RequestData = JSON.parse(authData);
      if (!data) return;

      return data;
    } catch (e) {}
  }

  useEffect(() => {
    if (user) return;

    const data = getAuthCookieData();
    if (!data) {
      toast.warn('Erro ao carregar as informações do usuário');
      return;
    }

    setUser(data.user);
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

    const data = getAuthCookieData();
    if (!data) return defaultRole;

    const { role_id: roleId } = data;
    return roleId;
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, retrieveUserRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
