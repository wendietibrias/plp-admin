import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { User } from "../Interfaces/Auth/User";
import type { IAbility } from "../Types/Abilities";

export interface AuthState {
  isAuthenticated: boolean;
  userData?: User;
  abilities?: IAbility[];
}

export interface AuthStore extends AuthState {
  setUserData: (userData?: User) => void;
}

const InitialState: Pick<AuthState, keyof AuthState> = {
  isAuthenticated: false,
  userData: undefined,
  abilities: undefined,
};

const UseAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...InitialState,
      setUserData: (userData?: User) => {
        set(() => ({
          userData,
          abilities: (userData?.role?.permissions || [])?.map((permission) => ({
            action: permission.code,
            subject: permission.group,
          })),
          isAuthenticated: !!userData,
        }));
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default UseAuthStore;
