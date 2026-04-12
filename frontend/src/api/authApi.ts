import api from "./axios";

export const register = async (email: string, password: string) => {
  const { data } = await api.post("/auth/register", { email, password });
  return data;
};

export const login = async (email: string, password: string) => {
  // Backend uses OAuth2PasswordRequestForm → must be form-encoded with field "username"
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);
  const { data } = await api.post("/auth/login", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return data; // { access_token, token_type }
};