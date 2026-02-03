import axios from "axios";
import { clearBasicAuth, getBasicAuthToken } from "../auth/authStorage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getBasicAuthToken();
  if (token) {
    config.headers.Authorization = `Basic ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      clearBasicAuth();
    }
    return Promise.reject(err);
  },
);
