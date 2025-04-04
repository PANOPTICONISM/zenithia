import { AxiosError } from "axios";
import { ServerError } from "./api.types";
import { requester } from "./axios";

type User = {
  username: string;
  password: string;
  recaptchaToken: string;
};

type UserResponse = {
  id: string;
  email: string;
  token: string;
};

export const postLoginUser = async (
  credentials: User & { isAllowedToLogIn: boolean }
): Promise<UserResponse> => {
  const path = "/api/login";

  try {
    const response = await requester.post(path, credentials);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const signupUser = async (
  credentials: User
): Promise<{ username: string; token: string }> => {
  const path = "/api/signup";

  try {
    const response = await requester.post(path, credentials);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ServerError>;
    throw new Error(error.response?.data?.message || error.message);
  }
};
