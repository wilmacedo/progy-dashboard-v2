export interface ResponseData<T> {
  data?: T;
  error?: string;
}

export interface APIProps {
  route: string;
  body?: object;
  method: 'GET' | 'POST';
  cache?: 'no-store' | 'force-cache';
  revalidate?: number;
}

export interface APIConfig {
  baseURL: string;
  headers: {
    [key: string]: string;
  };
}

export interface APIResponse<T> {
  data?: T;
  error?: string;
  status: number;
}
