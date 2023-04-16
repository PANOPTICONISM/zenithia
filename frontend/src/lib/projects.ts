import { AxiosError } from 'axios';
import { ProductProps } from '../pages/Projects/types';
import { requester } from './axios';
import { GridRowId } from '@mui/x-data-grid';

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

export const postProject = async (body: ProductProps): Promise<string> => {
  const path = '/api/projects/';
  
  try {
    const response = await requester.post(path, body);
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateProject = async (id: number, body: ProductProps): Promise<string> => {
  const path = `/api/projects/${id}`;
    
  try {
    const response = await requester.put(path, body);
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteProject = async (id: GridRowId): Promise<string> => {
  const path = `/api/projects/${id}`;
    
  try {
    const response = await requester.delete(path);
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};