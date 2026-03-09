import type { IAbility } from "@/lib/Types/Abilities";
import { defineAbility } from "@casl/ability";

export default defineAbility((can, cannot) => {
  const existingAbility: any[] = [];
  if (existingAbility && existingAbility?.length) {
    existingAbility.forEach((ability: IAbility) => {
      can(ability.action, ability.subject);
    });
  } else {
    cannot("manage", "all");
  }
});
