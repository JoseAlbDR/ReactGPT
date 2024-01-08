import axios, { AxiosError } from 'axios';

export class CustomAxiosError extends AxiosError {
  constructor(public message: string, public status?: number) {
    super();
  }
}

const url = import.meta.env.VITE_BASE_URL;

const customFetch = axios.create({ baseURL: url });

customFetch.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log(error);

    if (error.response) {
      return Promise.reject(
        new CustomAxiosError(
          error.response.statusText || 'Unknown error',
          error.response.status
        )
      );
    }

    if (error.message) {
      return Promise.reject(new CustomAxiosError(error.message));
    }

    return Promise.reject(
      new CustomAxiosError('Unknown error: ' + error.message)
    );
  }
);

export const http = {
  get: (endPoint: string) => customFetch.get(endPoint),
  post: (endPoint: string, body: unknown) => customFetch.post(endPoint, body),
};
