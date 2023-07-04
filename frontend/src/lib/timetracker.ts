import { AxiosError } from 'axios';
import { requester } from './axios';
import { GridRowId } from '@mui/x-data-grid';
import { ProjectProps } from '../pages/Projects/Projects.types';
import { ServerError } from './lib.types';

export type TimeTrackerProps = {
  id: string,
  date: string,
  start_time: string | null,
  finish_time: string | null,
  total: number | null,
  project_id: string | null,
  projects?: ProjectProps
}

export const getTimeTracker = async (token: string, param?: string): Promise<TimeTrackerProps[]> => {
  const path = '/api/timetracker';

  try {
    const response = await requester.get(path, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }, params: { filter: param }
    });
    return response.data as TimeTrackerProps[];
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const postTimeTracker = async (token: string, body: TimeTrackerProps): Promise<string> => {
  const path = '/api/timetracker';
  
  try {
    const response = await requester.post(path, body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

type TimeTrackerUpdateProps = {
  finish_time?: string,
  project_id?: string,
} | TimeTrackerProps

export const updateTimeTracker = async (token: string, id: string, body: TimeTrackerUpdateProps): Promise<string> => {
  const path = `/api/timetracker/${id}`;
    
  try {
    const response = await requester.put(path, body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteTimeTracker = async (token: string, id: GridRowId): Promise<string> => {
  const path = `/api/timetracker/${id}`;
    
  try {
    const response = await requester.delete(path, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};