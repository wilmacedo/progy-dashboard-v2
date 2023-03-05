import { getAuthCookieData } from '@/utils/auth';
import { base } from './base';

export const api = base;

base.interceptors.request.use(config => {
  const data = getAuthCookieData();
  if (!data) return config;

  const { token } = data;
  if (!token) return config;

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
