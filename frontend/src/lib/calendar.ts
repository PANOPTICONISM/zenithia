import { AxiosError } from 'axios';
import { requester } from './axios';
import { GridRowId } from '@mui/x-data-grid';

type ServerError = { message: string; }

export type CalendarProps = {
  id: string,
  title: string,
  start: string,
  end: string,
}

export const getCalendar = async (): Promise<CalendarProps[]> => {
  const path = '/api/calendar';

  try {
    const response = await requester.get(path);
    return response.data as CalendarProps[];
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const postCalendar = async (body: CalendarProps): Promise<string> => {
  const path = '/api/calendar';
  
  try {
    const response = await requester.post(path, body);
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateCalendar = async (id: string, body: CalendarProps): Promise<string> => {
  const path = `/api/calendar/${id}`;
    
  try {
    const response = await requester.put(path, body);
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteCalendar = async (id: GridRowId): Promise<string> => {
  const path = `/api/calendar/${id}`;
    
  try {
    const response = await requester.delete(path);
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};