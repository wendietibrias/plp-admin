import type { OutletContextModel } from "@/lib/Contexts/OutletContextModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosRequestConfig } from "axios";
import { useOutletContext } from "react-router-dom";

type Props = {
  config: (id: string, id2?: string) => AxiosRequestConfig<any>;
  invalidateQueryKeys: readonly any[];
  removeQueryKeys?: readonly any[];
  queryParams?: any;
  invalidateType?: "all" | "active" | "inactive";
};

interface V3Dto {
  id: string;
  id2?: string;
}

const useDeleteAxios = <T = any,>(props: Props) => {
  const {
    config,
    invalidateQueryKeys,
    queryParams,
    removeQueryKeys,
    invalidateType = "active",
  } = props;

  const queryClient = useQueryClient();
  const { openNotification } = useOutletContext<OutletContextModel>();

  const axiosDelete = async ({ id, id2 }: V3Dto) => {
    const localConfig = id2 ? config(id, id2) : config(id);
    const response = await axios<T>({
      ...localConfig,
      params: queryParams,
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: ({ id, id2 }: V3Dto) => axiosDelete({ id, id2 }),
    onSuccess: async () => {
      if (invalidateQueryKeys?.length)
        invalidateQueryKeys.forEach((key) => {
          queryClient.invalidateQueries({
            queryKey: key,
            type: invalidateType,
          });
        });

      if (removeQueryKeys?.length)
        removeQueryKeys.forEach((key) => {
          queryClient.removeQueries({
            queryKey: key,
          });
        });

      openNotification({
        type: "success",
        title: "Success",
        message: "Data Berhasil di Hapus",
      });
    },
    onError: async (err: any) => {
      openNotification({
        type: "error",
        title: "Error",
        message: err?.response?.data?.message ?? "Internal Server Error",
      });
    },
  });

  return mutation;
};

export default useDeleteAxios;
