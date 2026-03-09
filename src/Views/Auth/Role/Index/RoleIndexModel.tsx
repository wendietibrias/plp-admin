import {
  AxiosDeleteRole,
  AxiosGetRoles,
} from "@/lib/Axios/Auth/RoleAxiosConfig";
import useDeleteAxios from "@/lib/Hooks/Query/UseDeleteAxios";
import useGetAxios from "@/lib/Hooks/Query/UseGetAxios";
import type { Role, RoleQuery } from "@/lib/Interfaces/Auth/Role";
import type { Pagination } from "@/lib/Interfaces/Globals/ResponseModel";
import { RoleKeys } from "@/lib/QueryKeys/Auth/RoleKeys";
import { useState } from "react";

function useRoleIndexModel() {
  const [roleQueryParams, setRoleQueryParams] = useState<RoleQuery>({
    page: 1,
    limit: 10,
  });

  const {
    data: roleData,
    isFetching: isRoleDataLoading,
    refetch: refetchRoleData,
  } = useGetAxios<Pagination<Role>>({
    config: AxiosGetRoles,
    queryKey: RoleKeys.lists(roleQueryParams).queryKey,
    queryParams: roleQueryParams,
  });

  const { mutate: mutateDeleteRole } = useDeleteAxios({
    config: (id) => AxiosDeleteRole(id),
    invalidateQueryKeys: [RoleKeys.lists(roleQueryParams).queryKey],
    invalidateType: "all",
  });

  return {
    roleData,
    isRoleDataLoading,
    setRoleQueryParams,
    mutateDeleteRole,
    refetchRoleData,
  };
}

export default useRoleIndexModel;
