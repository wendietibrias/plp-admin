import type { AxiosRequestConfig } from "axios";

export const AxiosGetUsers: AxiosRequestConfig = {
  url: "/users",
  method: "GET",
};

export const AxiosGetUser = (id: string): AxiosRequestConfig => ({
  url: `/users/${id}`,
  method: "GET",
});

export const AxiosCreateUser: AxiosRequestConfig = {
  url: "/users",
  method: "POST",
};

export const AxiosUpdateUser = (id: string): AxiosRequestConfig => ({
  url: `/users/${id}`,
  method: "PUT",
});

export const AxiosDeleteUser = (id: string): AxiosRequestConfig => ({
  url: `/users/${id}`,
  method: "DELETE",
});
