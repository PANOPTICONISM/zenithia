import { AxiosError } from 'axios';
import { requester } from './axios';

type ServerError = { message: string; }

type User = {
    username: string,
    password: string,
}

export const postLoginUser = async (credentials: User): Promise<{token: string}> => {
  const path = '/api/login';
  
  try {
    const response = await requester.post(path, JSON.stringify(credentials));
    return response.data as {token: string};
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};