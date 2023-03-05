import { getAuthCookieData } from '@/utils/auth';
import { BaseAPI } from './base';
import { APIProps, APIResponse } from './types';

export async function api<T>(props: APIProps): Promise<APIResponse<T>> {
  const baseApi = new BaseAPI(props);
  baseApi.getBearerToken = () => {
    const data = getAuthCookieData();
    if (!data) return '';

    const { token } = data;
    if (!token) return '';

    return token;
  };

  return baseApi.request<T>();
}
