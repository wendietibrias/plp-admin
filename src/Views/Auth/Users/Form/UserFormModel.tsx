import { AxiosGetRoles } from "@/lib/Axios/Auth/RoleAxiosConfig";
import {
  AxiosCreateUser,
  AxiosGetUser,
  AxiosUpdateUser,
} from "@/lib/Axios/Auth/UserAxiosConfig";
import useGetAxios from "@/lib/Hooks/Query/UseGetAxios";
import usePostPatchAxios from "@/lib/Hooks/Query/UsePostPatchAxios";
import type { Role, RoleQuery } from "@/lib/Interfaces/Auth/Role";
import type { User } from "@/lib/Interfaces/Auth/User";
import type {
  Pagination,
  Response,
} from "@/lib/Interfaces/Globals/ResponseModel";
import { RoleKeys } from "@/lib/QueryKeys/Auth/RoleKeys";
import { UserKeys } from "@/lib/QueryKeys/Auth/UserKeys";
import { useState } from "react";
import { useParams } from "react-router-dom";

function useUserFormModel() {
  const { id } = useParams();

  const [roleQueryParams, setRoleQueryParams] = useState<RoleQuery>({
    page: 1,
    limit: 10,
  });

  const { data: userData, isFetching: isUserDataLoading } = useGetAxios<
    Response<User>
  >({
    config: AxiosGetUser(id!),
    queryKey: UserKeys.byId(id!).queryKey,
    enabled: !!id,
  });

  const { data: roleData, isFetching: isRoleDataLoading } = useGetAxios<
    Pagination<Role>
  >({
    config: AxiosGetRoles,
    queryKey: RoleKeys.lists(roleQueryParams).queryKey,
    queryParams: roleQueryParams,
  });

  const { mutate: mutatePostPatchUser } = usePostPatchAxios({
    config: (id) => {
      if (id) return AxiosUpdateUser(id);
      return AxiosCreateUser;
    },
    invalidateQueryKeys: [UserKeys.lists().queryKey],
    invalidateType: "all",
    redirect: "/users",
  });

  return {
    userData,
    isUserDataLoading,

    roleData,
    isRoleDataLoading,
    setRoleQueryParams,

    mutatePostPatchUser,
  };
}

export default useUserFormModel;
