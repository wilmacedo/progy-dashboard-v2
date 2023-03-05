import { AUTH_DATA_KEY } from '@/constants';
import { parseCookies } from 'nookies';
import { RequestData } from '../auth';
import { BaseAPI } from './base';
import { APIProps, APIResponse } from './types';

export async function api<T>(props: APIProps): Promise<APIResponse<T>> {
  const baseApi = new BaseAPI(props);
  baseApi.getBearerToken = () => {
    const { [AUTH_DATA_KEY]: authData } = parseCookies();
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
