import { createQueryKeys } from "@lukemorales/query-key-factory";

export const AuthKeys = createQueryKeys("auth", {
  me: () => ["me"],
});
