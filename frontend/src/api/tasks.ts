import { AxiosError } from "axios";
import { ProjectProps } from "pages/Projects/Projects.types";
import { ColumnType } from "pages/Tasks/Tasks";
import { ServerError } from "./api.types";
import { requester } from "./axios";

export type TaskBaseProps = {
  title: string;
  importance: string | null;
  project_id: string | null;
  column_id: ColumnType;
  deadline: string;
};

export type ProjectTaskProps = Pick<ProjectProps, "id" | "title">;

export type TaskProps = TaskBaseProps & {
  id: string;
  project?: ProjectTaskProps | null;
};

export const getTasks = async (token: string): Promise<TaskProps[]> => {
  const path = "/api/tasks/all";

  try {
    const response = await requester.get(path, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
    return response.data as TaskProps[];
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const postTask = async (
  token: string,
  body: TaskProps
): Promise<string> => {
  const path = "/api/tasks/all";

  try {
    const response = await requester.post(path, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateTask = async (
  token: string,
  id: string,
  body: TaskBaseProps | { column_id: ColumnType }
): Promise<string> => {
  const path = `/api/tasks/all/${id}`;

  try {
    const response = await requester.put(path, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteTask = async (
  token: string,
  id: string
): Promise<string> => {
  const path = `/api/tasks/all/${id}`;

  try {
    const response = await requester.delete(path, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
    return response.data as string;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};
