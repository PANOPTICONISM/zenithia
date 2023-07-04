import { AxiosError } from 'axios';
import { ProjectProps } from '../pages/Projects/Projects.types';
import { requester } from './axios';
import { GridRowId } from '@mui/x-data-grid';
import { ServerError } from './lib.types';

export const getProjects = async (token: string, param?: string): Promise<ProjectProps[]> => {
  const path = '/api/projects';

  try {
    const response = await requester.get(path, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      params: { filter: param }
    });
    return response.data as ProjectProps[];
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const postProject = async (token: string, body: ProjectProps): Promise<string> => {
  const path = '/api/projects';
  
  try {
    const response = await requester.post(path, body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    });
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateProject = async (token: string, id: string, body: ProjectProps): Promise<string> => {
  const path = `/api/projects/${id}`;
    
  try {
    const response = await requester.put(path, body);
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteProject = async (token: string, id: GridRowId): Promise<string> => {
  const path = `/api/projects/${id}`;
    
  try {
    const response = await requester.delete(path);
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};