import { createQueryKeys } from "@lukemorales/query-key-factory";

export const UserKeys = createQueryKeys("users", {
  lists: <T>(params?: T) => [params],
  byId: (id: string) => [id],
});
