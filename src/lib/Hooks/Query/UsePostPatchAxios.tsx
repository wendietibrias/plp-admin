import type { OutletContextModel } from "@/lib/Contexts/OutletContextModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

type Props<T> = {
  config: (id?: string, id2?: string) => AxiosRequestConfig<any>;
  data?: T;
  removeQueryKeys?: readonly any[];
  removeType?: "all" | "active" | "inactive";
  invalidateQueryKeys?: readonly any[];
  invalidateType?: "all" | "active" | "inactive";
  redirect?: string | number;
  queryParams?: any;
  onSuccessTakeover?: boolean;
};

interface V3Dto<T> {
  id?: string;
  data?: T;
  id2?: string;
}

const usePostPatchAxios = <T = any,>(props: Props<T>) => {
  const {
    config,
    invalidateQueryKeys,
    invalidateType = "inactive",
    removeQueryKeys,
    removeType = "active",
    redirect,
    queryParams,
    onSuccessTakeover = false,
  } = props;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { openNotification } = useOutletContext<OutletContextModel>();

  const axiosPostPatch = async ({ data, id, id2 }: V3Dto<T>) => {
    const localConfig = id2 ? config(id, id2) : id ? config(id) : config();
    const response = await axios<T>({
      ...localConfig,
      data,
      params: queryParams,
    });
    return response.data;
  };

  const onSuccessFn = async (data: any) => {
    openNotification({
      type: "success",
      title: "Success",
      message: data?.message || "Data Berhasil di Simpan",
    });

    if (removeQueryKeys)
      removeQueryKeys.forEach((key) => {
        queryClient.removeQueries({
          queryKey: key,
          type: removeType,
        });
      });

    if (invalidateQueryKeys)
      invalidateQueryKeys.forEach((key) => {
        queryClient.invalidateQueries({
          queryKey: key,
          type: invalidateType,
        });
      });

    if (redirect !== undefined) {
      navigate(redirect as any);
    }
  };

  const onErrorFn = async (err: any) => {
    if (err instanceof AxiosError) {
      if (err.code === "ERR_NETWORK")
        return openNotification({
          type: "error",
          title: "Network Error",
          message: "Tidak dapat terhubung ke server. Periksa koneksi Anda.",
        });
    }

    openNotification({
      type: "error",
      title: "Error",
      message: err?.response?.data?.message ?? "Internal Server Error",
    });
  };

  const mutation = useMutation({
    mutationFn: ({ data, id, id2 }: V3Dto<T>) =>
      axiosPostPatch({ data, id, id2 }),
    onSuccess: async (data: any) => {
      if (!onSuccessTakeover) await onSuccessFn(data);
    },
    onError: async (err: any) => {
      console.log(err);
      await onErrorFn(err);
    },
  });

  return { ...mutation, onSuccessFn, onErrorFn };
};

export default usePostPatchAxios;
