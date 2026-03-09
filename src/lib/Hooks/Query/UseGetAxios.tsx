import {
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import axios, { type AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import type { OutletContextModel } from "../../Contexts/OutletContextModel";

export type GetAxiosProps<U = any> = {
  config: AxiosRequestConfig<any>;
  queryKey: readonly any[];
  removeQueryKey?: readonly any[][];
  invalidateQueryKey?: readonly any[][];
  queryParams?: U | undefined;
  refresh?: number;
  enabled?: boolean | ((queryParams?: U) => boolean);
};

const useGetAxios = <T = any, U = any>(props: GetAxiosProps<U>) => {
  const {
    config,
    queryKey,
    removeQueryKey,
    invalidateQueryKey,
    queryParams,
    enabled = true,
    refresh,
  } = props;

  const enabledResolved: boolean =
    typeof enabled === "function" ? !!enabled(queryParams) : !!enabled;

  const { openNotification } = useOutletContext<OutletContextModel>();
  const queryClient = useQueryClient();

  const axiosGet = async (): Promise<T> => {
    try {
      const response = await axios<T>({
        ...config,
        params: queryParams,
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  const result: UseQueryResult<T> = useQuery({
    enabled: enabledResolved,
    queryKey: queryKey,
    queryFn: axiosGet,
    refetchInterval: refresh,
  });

  useEffect(() => {
    if (result.status !== "success") return;

    invalidateQueryKey?.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: key });
    });

    removeQueryKey?.forEach((key) => {
      queryClient.removeQueries({ queryKey: key });
    });
  }, [result.status, result.dataUpdatedAt]);

  useEffect(() => {
    if (result.status !== "error") return;

    const error = result.error as any;
    const code = error?.code;

    if (code === "ERR_NETWORK") {
      return;
    }

    openNotification({
      type: "error",
      title: "Error",
      message:
        error?.response?.data?.message ?? "Terjadi kesalahan, coba lagi.",
    });
  }, [result.status, result.error]);

  useEffect(() => {
    if (!result.isPaused) return;

    openNotification({
      type: "error",
      title: "Error",
      message: "Terjadi Kesalahan Pada Internet Anda, Silahkan Coba Lagi.",
    });
  }, [result.isPaused]);

  return result;
};

export default useGetAxios;
