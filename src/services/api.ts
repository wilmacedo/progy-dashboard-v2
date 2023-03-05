import { AUTH_DATA_KEY } from '@/constants';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { RequestData } from './auth';

export const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
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
