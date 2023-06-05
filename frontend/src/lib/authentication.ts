import { AxiosError } from 'axios';
import { requester } from './axios';

type ServerError = { message: string; }

type User = {
    username: string,
    password: string,
}

type UserResponse = {
  id: string,
  email: string,
  role: string,
}

export const postLoginUser = async (credentials: User): Promise<UserResponse> => {
  const path = '/api/login';
  
  try {
    const response = await requester.post(path, credentials);
    return response.data as UserResponse;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const signUpUser = async (credentials: User): Promise<{id: string}> => {
  const path = '/api/signup';
  
  try {
    const response = await requester.post(path, credentials);
    console.log(response, 'here');
    return response.data.user as {id: string};
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};