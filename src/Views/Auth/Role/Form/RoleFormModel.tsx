import { AxiosGetPermissions } from "@/lib/Axios/Auth/PermissionAxiosConfig";
import {
  AxiosCreateRole,
  AxiosGetRole,
  AxiosUpdateRole,
} from "@/lib/Axios/Auth/RoleAxiosConfig";
import useGetAxios from "@/lib/Hooks/Query/UseGetAxios";
import usePostPatchAxios from "@/lib/Hooks/Query/UsePostPatchAxios";
import type { Permission } from "@/lib/Interfaces/Auth/Permission";
import { type Role, type UpdateRole } from "@/lib/Interfaces/Auth/Role";
import type { Response } from "@/lib/Interfaces/Globals/ResponseModel";
import { PermissionKeys } from "@/lib/QueryKeys/Auth/PermissionKeys";
import { RoleKeys } from "@/lib/QueryKeys/Auth/RoleKeys";
import { useParams } from "react-router-dom";

function useRoleFormModel() {
  const { id } = useParams();

  const { data: roleData, isFetching: isRoleDataFetching } = useGetAxios<
    Response<Role>
  >({
    config: AxiosGetRole(id!),
    queryKey: RoleKeys.byId(id!).queryKey,
    enabled: !!id,
  });

  const { data: permissionsData, isFetching: isPermissionsDataFetching } =
    useGetAxios<Response<Permission[]>>({
      config: AxiosGetPermissions,
      queryKey: PermissionKeys.lists().queryKey,
    });

  const { mutate: mutatePostPatchRole } = usePostPatchAxios<UpdateRole>({
    config(id) {
      if (id) return AxiosUpdateRole(id);
      return AxiosCreateRole;
    },
    invalidateQueryKeys: [RoleKeys._def],
    invalidateType: "all",
    redirect: "/roles",
  });

  return {
    roleData,
    isRoleDataFetching,
    permissionsData,
    isPermissionsDataFetching,
    mutatePostPatchRole,
  };
}

export default useRoleFormModel;
