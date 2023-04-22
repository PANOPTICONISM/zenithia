import { AxiosError } from 'axios';
import { requester } from './axios';

type ServerError = { message: string; }

export type TaskProps = {
  id: string;
  title: string;
  importance: string | null,
  project_id?: string,
  column_id: string,
  deadline: string,
}

export type ColumnProps = {
  id: string,
  title: string;
  orderBy: number,
};

export const getTasksColumns = async (): Promise<ColumnProps[]> => {
  const path = '/api/tasks';

  try {
    const response = await requester.get(path);
    return response.data as ColumnProps[];
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getTasks = async (id: string): Promise<TaskProps[]> => {
  const path = `/api/tasks/all/${id}`;

  try {
    const response = await requester.get(path);
    return response.data as TaskProps[];
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const postTask = async (body: TaskProps): Promise<string> => {
  const path = '/api/tasks/all';
  
  try {
    const response = await requester.post(path, body);
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};