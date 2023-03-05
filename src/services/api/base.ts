import { APIConfig, APIProps, APIResponse, ResponseData } from './types';

export class BaseAPI {
  props: APIProps;
  baseConfig: APIConfig;

  constructor(props: APIProps) {
    this.props = props;
    this.baseConfig = {
      baseURL: process.env.API_URL || 'http://localhost:3333',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  getBearerToken(): string {
    return '';
  }

  async request<T>(): Promise<APIResponse<T>> {
    const { route, method, body, cache, revalidate } = this.props;
    const base = this.baseConfig;
    const token = this.getBearerToken();
    if (token) base.headers.Authorization = `Bearer ${token}`;

    const request = await fetch(base.baseURL + route, {
      method,
      ...(body && { body: JSON.stringify(body) }),
      ...(cache && { cache }),
      ...(revalidate && { next: { revalidate } }),
      ...base,
    });

    const response: ResponseData<T> = await request.json();

    return { ...response, status: request.status };
  }
}
