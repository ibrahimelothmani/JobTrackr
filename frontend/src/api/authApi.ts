import api from "./axios";

export const register = async (email, password) => {
  const { data } = await api.post("/auth/register", { email, password });
  return data;
};

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data; // { access_token, token_type }
};