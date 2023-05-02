import { AxiosError } from 'axios';
import { requester } from './axios';

type ServerError = { message: string; }

export type ClientProps = {
  id: string,
  name: string,
  occupation: string,
  status: string,
  location: string,
  email: string,
  phone_number: string,
  
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