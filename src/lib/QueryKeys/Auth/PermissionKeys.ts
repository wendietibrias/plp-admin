import { createQueryKeys } from "@lukemorales/query-key-factory";

export const PermissionKeys = createQueryKeys("permissions", {
  lists: <T>(params?: T) => [params],
});
