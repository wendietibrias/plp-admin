import type { User } from "@/lib/Interfaces/Auth/User";
import type { DescriptionsItemProps } from "antd/es/descriptions/Item";
import type { ColumnsType } from "antd/es/table";
import RoleDetailModel from "./RoleDetailModel";

function RoleDetailController() {
  const { isRoleDataFetching, roleData } = RoleDetailModel();

  const RoleDetailFields: DescriptionsItemProps[] = [
    {
      label: "Nama Peran",
      children: roleData?.data?.name,
    },
    {
      label: "Deskripsi",
      children: roleData?.data?.description,
    },
  ];

  const RelatedUserTableColumns: ColumnsType<User> = [
    {
      title: "Nama Lengkap",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nama Pengguna",
      dataIndex: "username",
      key: "username",
    },
  ];

  return {
    isRoleDataFetching,
    RoleDetailFields,
    RelatedUserTableColumns,
    roleData,
  };
}

export default RoleDetailController;
