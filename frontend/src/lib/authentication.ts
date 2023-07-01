import { AxiosError } from 'axios';
import { requester } from './axios';
import { ServerError } from './lib.types';
import { supabase } from './supabase';

type User = {
    username: string,
    password: string,
}

type UserResponse = {
  id: string,
  email: string | undefined,
  token: string,
}

export const postLoginUser = async (credentials: User): Promise<UserResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.username,
    password: credentials.password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return { id: data.user.id, email: data.user.email, token: data.session.access_token };
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