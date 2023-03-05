import { APIConfig } from './types';

export const baseConfig: APIConfig = {
  baseURL: process.env.API_URL || 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  },
};
