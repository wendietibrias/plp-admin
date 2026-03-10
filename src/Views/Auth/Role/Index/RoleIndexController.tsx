import ActionButtonComponent from "@/Components/IndexComponent/ActionButtonComponent";
import { AbilityContext } from "@/lib/Contexts/AbilityContext";
import { ActionButtonColorEnum } from "@/lib/Enums/ActionButtonColorEnum";
import {
  PermissionCodeEnum,
  PermissionGroupEnum,
} from "@/lib/Enums/PermissionEnum";
import UseIndexPageHooks from "@/lib/Hooks/PageHooks/IndexPageHooks";
import type { Role } from "@/lib/Interfaces/Auth/Role";
import { DeleteOutlined } from "@ant-design/icons";
import { useAbility } from "@casl/react";
import type { ColumnsType } from "antd/es/table";
import useRoleIndexModel from "./RoleIndexModel";

function useRoleIndexController() {
  const {
    isRoleDataLoading,
    mutateDeleteRole,
    roleData,
    setRoleQueryParams,
    refetchRoleData,
  } = useRoleIndexModel();

  const ability = useAbility(AbilityContext);

  const { handlePageChange, handleSearch } =
    UseIndexPageHooks(setRoleQueryParams);

  const handleDeleteRole = (roleId: string) => {
    mutateDeleteRole({ id: roleId });
  };

  const UserTableColumns: ColumnsType<Role> = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Aksi",
      key: "actions",
      align: "center",
      width: 100,
      render: (_, record) => (
        <ActionButtonComponent<Role>
          detailProps={{ link: `./${record.id}` }}
          editProps={{ link: `./${record.id}/edit` }}
          deleteProps={{
            popConfirmProps: {
              title: "Apakah Anda yakin ingin menghapus peran ini?",
              onConfirm: () => handleDeleteRole(record.id!),
              disabled: !ability.can(
                PermissionCodeEnum.DELETE_ROLE,
                PermissionGroupEnum.AUTH,
              ),
            },
            buttonProps: {
              disabled: !ability.can(
                PermissionCodeEnum.DELETE_ROLE,
                PermissionGroupEnum.AUTH,
              ),
              icon: (
                <DeleteOutlined
                  style={{
                    color: !ability.can(
                      PermissionCodeEnum.DELETE_ROLE,
                      PermissionGroupEnum.AUTH,
                    )
                      ? ActionButtonColorEnum.DISABLED
                      : ActionButtonColorEnum.DELETE,
                  }}
                />
              ),
            },
          }}
          record={record}
        />
      ),

      // ActionButtonComponent<Role>(
      //   {
      //     detailProps: {
      //       link: `./${record.id}`,
      //     },
      //     editProps: {
      //       link: `./${record.id}/edit`,
      //     },
      //     deleteProps: {
      //       popConfirmProps: {
      //         title: "Apakah Anda yakin ingin menghapus peran ini?",
      //         onConfirm: () => handleDeleteRole(record.id!),
      //       },
      //     },
      //   },
      //   record,
      // ),
    },
  ];

  return {
    UserTableColumns,
    isRoleDataLoading,
    roleData,
    handleSearch,
    handlePageChange,
    refetchRoleData,
    ability,
  };
}

export default useRoleIndexController;
