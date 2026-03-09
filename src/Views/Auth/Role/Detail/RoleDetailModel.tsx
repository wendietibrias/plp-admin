import { AxiosGetRole } from "@/lib/Axios/Auth/RoleAxiosConfig";
import useGetAxios from "@/lib/Hooks/Query/UseGetAxios";
import type { Role } from "@/lib/Interfaces/Auth/Role";
import type { Response } from "@/lib/Interfaces/Globals/ResponseModel";
import { RoleKeys } from "@/lib/QueryKeys/Auth/RoleKeys";
import { useParams } from "react-router-dom";

function RoleDetailModel() {
  const { id } = useParams();

  const { data: roleData, isFetching: isRoleDataFetching } = useGetAxios<
    Response<Role>
  >({
    config: AxiosGetRole(id!),
    queryKey: RoleKeys.byId(id!).queryKey,
    enabled: !!id,
  });

  return {
    roleData,
    isRoleDataFetching,
  };
}

export default RoleDetailModel;
