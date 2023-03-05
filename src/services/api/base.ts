import axios from 'axios';

export const base = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});
