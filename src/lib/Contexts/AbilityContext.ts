import { createContextualCan } from "@casl/react";
import { createContext } from "react";

export const AbilityContext = createContext<any>({} as any);
export const Can = createContextualCan(AbilityContext.Consumer);
export const RefreshAbilityContext = createContext<any>({} as any);
