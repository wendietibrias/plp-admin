import { createQueryKeys } from "@lukemorales/query-key-factory";

export const RoleKeys = createQueryKeys("roles", {
  lists: <T>(params?: T) => [params],
  byId: (id: string) => [id],
});
