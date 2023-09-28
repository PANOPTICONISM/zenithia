import { supabase } from "./supabase";

type User = {
  username: string;
  password: string;
};

type UserResponse = {
  id: string;
  email: string | undefined;
  token: string;
};

export const postLoginUser = async (
  credentials: User,
): Promise<UserResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.username,
    password: credentials.password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return {
    id: data.user.id,
    email: data.user.email,
    token: data.session.access_token,
  };
};

export const signUpUser = async (credentials: User) => {
  const { data, error } = await supabase.auth.signUp({
    email: credentials.username,
    password: credentials.password,
    options: {
      emailRedirectTo: process.env.REACT_APP_FRONTEND_URL,
    },
  });
  console.log(data, error);
  if (error) {
    throw new Error(error.message);
  }
  return { data };
};
