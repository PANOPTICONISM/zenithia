import { AxiosError } from 'axios';
import { ProductProps } from '../pages/Projects/types';
import { requester } from './axios';

type ServerError = { message: string; }

export const getProjects = async (): Promise<ProductProps[]> => {
  const path = '/api/projects';

  try {
    const response = await requester.get(path);
    return response.data as ProductProps[];
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};