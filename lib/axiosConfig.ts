import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/constants";
import { AUTH_TOKEN_KEY } from "@/types";
import { getCookie } from "@/utils";
import { getScopedBusinessId } from "./businessScope";

export const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getCookie(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const businessId = getScopedBusinessId();
    if (businessId) {
      config.headers["x-business-id"] = businessId;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      const { logout } = await import("@/utils");
      await logout();

      const callbackUrl = window.location.pathname || "/";
      window.location.href = `/?callbackUrl=${encodeURIComponent(callbackUrl)}`;
    }

    return Promise.reject(error);
  }
);
