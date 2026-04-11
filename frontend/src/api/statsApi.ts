import api from "./axios";

export const getStats = async () => {
  const { data } = await api.get("/stats/");
  return data; // { total, response_rate, interviews, offers }
};