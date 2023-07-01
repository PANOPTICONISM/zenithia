import { AxiosError } from 'axios';
import { requester } from './axios';
import { GridRowId } from '@mui/x-data-grid';
import { ServerError } from './lib.types';

export type ClientProps = {
  id: string,
  name: string | null,
  occupation: string | null,
  status: string,
  location: string | null,
  email: string | null,
  phone_number: string | null,
  
}

export const getClients = async (): Promise<ClientProps[]> => {
  const path = '/api/clients';

  try {
    const response = await requester.get(path);
    return response.data as ClientProps[];
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const postClient = async (body: ClientProps): Promise<string> => {
  const path = '/api/clients';
  
  try {
    const response = await requester.post(path, body);
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateClient = async (id: string, body: ClientProps): Promise<string> => {
  const path = `/api/clients/${id}`;
    
  try {
    const response = await requester.put(path, body);
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteClient = async (id: GridRowId): Promise<string> => {
  const path = `/api/clients/${id}`;
    
  try {
    const response = await requester.delete(path);
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};