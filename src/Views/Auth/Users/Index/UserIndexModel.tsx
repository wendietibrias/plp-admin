import { AxiosGetRoles } from "@/lib/Axios/Auth/RoleAxiosConfig";
import {
  AxiosDeleteUser,
  AxiosGetUsers,
} from "@/lib/Axios/Auth/UserAxiosConfig";
import useDeleteAxios from "@/lib/Hooks/Query/UseDeleteAxios";
import useGetAxios from "@/lib/Hooks/Query/UseGetAxios";
import { type Role, type RoleQuery } from "@/lib/Interfaces/Auth/Role";
import type { User, UserQueryParams } from "@/lib/Interfaces/Auth/User";
import type { Pagination } from "@/lib/Interfaces/Globals/ResponseModel";
import { RoleKeys } from "@/lib/QueryKeys/Auth/RoleKeys";
import { UserKeys } from "@/lib/QueryKeys/Auth/UserKeys";
import { useState } from "react";

function useUserIndexModel() {
  /**
   * Query Params
   */
  const [userQueryParams, setUserQueryParams] = useState<UserQueryParams>({
    page: 1,
    limit: 10,
  });

  const [roleQueryParams, setRoleQueryParams] = useState<RoleQuery>({
    page: 1,
    limit: 10,
  });

  const {
    data: userData,
    isFetching: isUserDataLoading,
    refetch: refetchUserData,
  } = useGetAxios<Pagination<User>>({
    config: AxiosGetUsers,
    queryKey: UserKeys.lists(userQueryParams).queryKey,
    queryParams: userQueryParams,
  });

  const { data: roleData, isFetching: isRoleDataLoading } = useGetAxios<
    Pagination<Role>
  >({
    config: AxiosGetRoles,
    queryKey: RoleKeys.lists(roleQueryParams).queryKey,
    queryParams: roleQueryParams,
  });

  const { mutate: mutateDeleteUser } = useDeleteAxios({
    config: (id) => AxiosDeleteUser(id),
    invalidateQueryKeys: [UserKeys.lists(userQueryParams).queryKey],
    invalidateType: "all",
  });

  return {
    userData,
    isUserDataLoading,
    refetchUserData,
    setUserQueryParams,

    roleData,
    isRoleDataLoading,
    setRoleQueryParams,

    mutateDeleteUser,
  };
}

export default useUserIndexModel;
