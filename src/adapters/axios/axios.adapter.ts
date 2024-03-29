import axios, { AxiosError } from 'axios';

export class CustomAxiosError extends AxiosError {
  constructor(public message: string, public status?: number) {
    super();
  }
}

const url = import.meta.env.VITE_BASE_URL;

const customFetch = axios.create({ baseURL: url });

customFetch.interceptors.response.use((response) => response.data);

export const http = {
  get: (endPoint: string) => customFetch.get(endPoint),

  post: <T>(endPoint: string, body: unknown = {}): Promise<T> =>
    customFetch.post(endPoint, body),

  postStream: (endPoint: string, body: unknown, abortSignal: AbortSignal) =>
    fetch(`${url}/${endPoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: abortSignal,
    }),

  postBlob: (endPoint: string, body: unknown) =>
    fetch(`${url}/${endPoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }),
};
