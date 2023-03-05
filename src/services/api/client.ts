import { AUTH_DATA_KEY } from '@/constants';
import { parseCookies } from 'nookies';
import { RequestData } from '../auth';
import { base } from './base';

export const api = base;

base.interceptors.request.use(config => {
  const { [AUTH_DATA_KEY]: data } = parseCookies();
  if (!data) return config;

  try {
    const { token }: RequestData = JSON.parse(data);
    if (!token) return config;

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  } catch (e) {
    return config;
  }
});
