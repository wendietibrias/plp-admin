export const AxiosGetRoles = {
  url: "/roles",
  method: "GET",
};

export const AxiosGetRole = (id: string) => ({
  url: `/roles/${id}`,
  method: "GET",
});

export const AxiosCreateRole = {
  url: "/roles",
  method: "POST",
};

export const AxiosUpdateRole = (id: string) => ({
  url: `/roles/${id}`,
  method: "PUT",
});

export const AxiosDeleteRole = (id: string) => ({
  url: `/roles/${id}`,
  method: "DELETE",
});
