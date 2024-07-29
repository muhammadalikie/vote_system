import axios from "axios";
import { getItem, TOKEN_KEY } from "./storage.ts";

export const BASE_URL = "http://localhost:8000";

export const globalAxios = axios.create({
  baseURL: BASE_URL,
});

export const authAxios = axios.create({
  baseURL: BASE_URL,
});

authAxios.interceptors.request.use(
  (config) => {
    const token = getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
