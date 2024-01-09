import axios, { AxiosError } from 'axios';

export class CustomAxiosError extends AxiosError {
  constructor(public message: string, public status?: number) {
    super();
  }
}

const url = import.meta.env.VITE_BASE_URL;

const customFetch = axios.create({ baseURL: url });

export const http = {
  get: (endPoint: string) => customFetch.get(endPoint),
  post: <T>(endPoint: string, body: unknown): Promise<T> =>
    customFetch.post(endPoint, body),
  postStream: (endPoint: string, body: unknown) =>
    fetch(`${import.meta.env.VITE_BASE_URL}/${endPoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: body }),
    }),
};
