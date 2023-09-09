import { AUTH_DATA_KEY } from '@/constants';
import { getCookie } from 'cookies-next';
import { RequestData } from '../auth';
import { BaseAPI } from './base';
import { APIProps, APIResponse } from './types';

export async function api<T>(props: APIProps): Promise<APIResponse<T>> {
  const baseApi = new BaseAPI(props);
  baseApi.getBearerToken = () => {
    const authData = getCookie(AUTH_DATA_KEY);
    if (!authData) return '';

    try {
      const { token }: RequestData = JSON.parse(authData);
      if (!token) return '';

      return token;
    } catch (e) {
      return '';
    }
  };

  return baseApi.request<T>();
}
