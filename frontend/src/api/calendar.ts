import { GridRowId } from "@mui/x-data-grid";
import { AxiosError } from "axios";
import { ServerError } from "./api.types";
import { requester } from "./axios";

type PostCalendarEntry = {
  title: string;
  start: string;
  end: string;
};

export type CalendarProps = PostCalendarEntry & {
  id: string;
};

export const getCalendar = async (token: string): Promise<CalendarProps[]> => {
  const path = "/api/calendar";

  try {
    const response = await requester.get(path, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return response.data as CalendarProps[];
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const postCalendar = async (
  token: string,
  body: PostCalendarEntry
): Promise<string> => {
  const path = "/api/calendar";

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

export const updateCalendar = async (
  token: string,
  id: string,
  body: PostCalendarEntry
): Promise<string> => {
  const path = `/api/calendar/${id}`;

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

export const deleteCalendar = async (
  token: string,
  id: GridRowId
): Promise<string> => {
  const path = `/api/calendar/${id}`;

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
