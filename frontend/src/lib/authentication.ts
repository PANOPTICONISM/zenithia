import { AxiosError } from "axios";
import { requester } from "./axios";
import { ServerError } from "./lib.types";

type User = {
  username: string;
  password: string;
};

type UserResponse = {
  id: string;
  email: string;
  token: string;
};

export const postLoginUser = async (
  credentials: User,
): Promise<UserResponse> => {
  const path = "/api/login";

  try {
    const response = await requester.post(path, credentials);
    return {
      id: response.data.id,
      email: response.data.email,
      token: response.data.token,
    };
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const signupUser = async (
  credentials: User,
): Promise<{ username: string; token: string }> => {
  const path = "/api/signup";

  try {
    const response = await requester.post(path, credentials);
    return {
      username: response.data.username,
      token: response.data.token,
    };
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};
