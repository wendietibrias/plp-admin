import { defineAbility } from "@casl/ability";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/id";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  AbilityContext,
  RefreshAbilityContext,
} from "./lib/Contexts/AbilityContext";
import setupAxiosInterceptors from "./lib/Interceptors/AuthInterceptor";
import type { User } from "./lib/Interfaces/Auth/User";
import type { Response } from "./lib/Interfaces/Globals/ResponseModel";
import RouteRender from "./lib/Routes/RouteRender";
import UseAuthStore from "./lib/Stores/UseAuthStore";
import type { IAbility } from "./lib/Types/Abilities";
import DefinedAbilities from "./lib/Utils/Abilities/DefineAbility";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //Need to be turned off for now
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      retry: 1,
      staleTime: 1 * 1000,
      gcTime: 1.5 * 1000,
      // refetchInterval: 300 * 1000
    },
  },
});

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Jakarta");
dayjs.locale("id");
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

function App() {
  const { isAuthenticated, userData, abilities, setUserData } = UseAuthStore();
  const [abilityState, setAbilityState] = useState(DefinedAbilities);

  const refreshAbility = (value: IAbility[]) => {
    const ability = defineAbility((can, _cannot) => {
      value.forEach((ability: IAbility) => {
        can(ability.action, ability.subject);
      });
    });
    setAbilityState(ability);
  };
  setupAxiosInterceptors(axios);
  useEffect(() => {
    if (!isAuthenticated || !userData) return;
    axios
      .get("auth/me")
      .then(({ data: response }: { data: Response<User> }) => {
        setUserData(response.data);
      })
      .catch(() => {
        setUserData(undefined);
      });
  }, [isAuthenticated, setUserData]);

  useEffect(() => {
    refreshAbility(abilities || []);
  }, [abilities]);

  return (
    <RefreshAbilityContext.Provider value={{ refreshAbility }}>
      <AbilityContext.Provider value={abilityState}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <RouteRender />
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AbilityContext.Provider>
    </RefreshAbilityContext.Provider>
  );
}

export default App;
