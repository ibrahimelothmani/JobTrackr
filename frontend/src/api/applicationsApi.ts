import api from "./axios";

export const getApplications = async () => {
  const { data } = await api.get("/applications/");
  return data;
};

export const createApplication = async (payload) => {
  const { data } = await api.post("/applications/", payload);
  return data;
};

export const updateApplication = async (id, payload) => {
  const { data } = await api.put(`/applications/${id}`, payload);
  return data;
};

export const deleteApplication = async (id) => {
  await api.delete(`/applications/${id}`);
};