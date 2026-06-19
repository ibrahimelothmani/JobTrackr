import api from "./axios";
import type { Application, CreateApplicationPayload, UpdateApplicationPayload } from "../types/application";

export const getApplications = async () => {
  const { data } = await api.get<Application[]>("/applications/");
  return data;
};

export const createApplication = async (payload: CreateApplicationPayload) => {
  const { data } = await api.post<Application>("/applications/", payload);
  return data;
};

export const updateApplication = async (id: string, payload: UpdateApplicationPayload) => {
  const { data } = await api.put<Application>(`/applications/${id}`, payload);
  return data;
};

export const deleteApplication = async (id: string) => {
  await api.delete(`/applications/${id}`);
};
