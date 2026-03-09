import type { AxiosRequestConfig } from "axios";

export const LoginAxiosConfig: AxiosRequestConfig = {
  method: "POST",
  url: "/auth/login",
};

export const LogoutAxiosConfig: AxiosRequestConfig = {
  method: "POST",
  url: "/auth/logout",
};
