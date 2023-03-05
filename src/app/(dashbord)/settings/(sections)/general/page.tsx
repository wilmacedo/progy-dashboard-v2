'use client';

import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';

export default function Detail() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User | undefined>();

  useEffect(() => {
    if (!user) return;

    (async () => {
      const { data: response } = await api.get('/users/me');
      setUserData(response.data);
    })();
  }, [user]);

  return <div>{userData?.name}</div>;
}
