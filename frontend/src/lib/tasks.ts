import { AxiosError } from 'axios';
import { requester } from './axios';
import { ProjectProps } from '../pages/Projects/Projects.types';
import { ServerError } from './lib.types';

export type TaskProps = {
  id: string;
  title: string;
  importance: string | null,
  project_id?: string,
  column_id: string,
  deadline: string,
  projects?: ProjectProps | null;
}

type ColumnProps = {
  id: string,
  title: string;
  orderBy: number,
  items: TaskProps[]
};

export const getTasksColumns = async (token: string): Promise<ColumnProps[]> => {
  const path = '/api/tasks';

  try {
    const response = await requester.get(path, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    });
    return response.data as ColumnProps[];
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getTasks = async (token: string): Promise<TaskProps[]> => {
  const path = '/api/tasks/all';

  try {
    const response = await requester.get(path, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    });
    return response.data as TaskProps[];
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const postTask = async (token: string, body: TaskProps): Promise<string> => {
  const path = '/api/tasks/all';
  
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

export const updateTask = async (token: string, id: string, body: TaskProps | { column_id: string }): Promise<string> => {
  const path = `/api/tasks/all/${id}`;
    
  try {
    const response = await requester.put(path, body, {
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

export const deleteTask = async (token: string, id: string): Promise<string> => {
  const path = `/api/tasks/all/${id}`;
    
  try {
    const response = await requester.delete(path, {
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