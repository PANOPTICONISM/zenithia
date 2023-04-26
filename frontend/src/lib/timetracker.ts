import { AxiosError } from 'axios';
import { requester } from './axios';
import { GridRowId } from '@mui/x-data-grid';

type ServerError = { message: string; }

export const getTimeTracker = async (): Promise<string[]> => {
  const path = '/api/timetracker';

  try {
    const response = await requester.get(path);
    return response.data as string[];
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const postTimeTracker = async (body: string): Promise<string> => {
  const path = '/api/timetracker';
  
  try {
    const response = await requester.post(path, body);
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateTimeTracker = async (id: number, body: string): Promise<string> => {
  const path = `/api/timetracker/${id}`;
    
  try {
    const response = await requester.put(path, body);
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteTimeTracker = async (id: GridRowId): Promise<string> => {
  const path = `/api/timetracker/${id}`;
    
  try {
    const response = await requester.delete(path);
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};