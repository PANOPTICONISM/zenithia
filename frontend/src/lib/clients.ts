import { AxiosError } from "axios";
import { requester } from "./axios";
import { GridRowId } from "@mui/x-data-grid";
import { ServerError } from "./lib.types";

export type ClientId = {
  id: string;
};

export type ClientProps = {
  name: string | null;
  occupation: string | null;
  status: string;
  location: string | null;
  email: string | null;
  phone_number: string | null;
  company: string | null;
};

export const getClients = async (
  token: string,
): Promise<(ClientProps & ClientId)[]> => {
  const path = "/api/clients";

  try {
    const response = await requester.get(path, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return response.data as (ClientProps & ClientId)[];
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const postClient = async (
  token: string,
  body: ClientProps & ClientId,
): Promise<string> => {
  const path = "/api/clients";

  try {
    const response = await requester.post(path, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateClient = async (
  token: string,
  id: string,
  body: ClientProps,
): Promise<string> => {
  const path = `/api/clients/${id}`;

  try {
    const response = await requester.put(path, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteClient = async (
  token: string,
  id: GridRowId,
): Promise<string> => {
  const path = `/api/clients/${id}`;

  try {
    const response = await requester.delete(path, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};
