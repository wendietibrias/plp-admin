import { AbilityContext } from "@/lib/Contexts/AbilityContext";
import { ActionButtonColorEnum } from "@/lib/Enums/ActionButtonColorEnum";
import {
  PermissionCodeEnum,
  PermissionGroupEnum,
} from "@/lib/Enums/PermissionEnum";
import type { Role } from "@/lib/Interfaces/Auth/Role";
import UseAuthStore from "@/lib/Stores/UseAuthStore";
import {
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useAbility } from "@casl/react";
import { Button, Popconfirm, type TablePaginationConfig } from "antd";
import type { ColumnsType } from "antd/es/table";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import useRoleIndexModel from "./RoleIndexModel";

function useRoleIndexController() {
  const {
    isRoleDataLoading,
    mutateDeleteRole,
    roleData,
    setRoleQueryParams,
    refetchRoleData,
  } = useRoleIndexModel();

  const { userData: currentUserData } = UseAuthStore();
  const ability = useAbility(AbilityContext);

  const handleRoleSearch = debounce((searchTerm: string) => {
    setRoleQueryParams((prev) => ({ ...prev, search: searchTerm }));
  }, 500);

  const handleDeleteRole = (roleId: string) => {
    mutateDeleteRole({ id: roleId });
  };

  const handlePageChange = (paginationConfig: TablePaginationConfig) => {
    setRoleQueryParams((prev) => ({
      ...prev,
      page: paginationConfig.current,
      limit: paginationConfig.pageSize,
    }));
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
        <>
          <Link to={`./${record.id}`}>
            <Button
              type="text"
              icon={
                <FileTextOutlined
                  style={{
                    color: ActionButtonColorEnum.DETAIL,
                  }}
                />
              }
            />
          </Link>
          <Link to={`./${record.id}/edit`}>
            <Button
              type="text"
              disabled={
                !ability.can(
                  PermissionCodeEnum.UPDATE_ROLE,
                  PermissionGroupEnum.AUTH,
                )
              }
              icon={
                <EditOutlined
                  style={{
                    color: !ability.can(
                      PermissionCodeEnum.UPDATE_ROLE,
                      PermissionGroupEnum.AUTH,
                    )
                      ? ActionButtonColorEnum.DISABLED
                      : ActionButtonColorEnum.EDIT,
                  }}
                />
              }
            />
          </Link>

          <Popconfirm
            title="Apakah Anda yakin ingin menghapus peran ini?"
            onConfirm={() => handleDeleteRole(record.id!)}
            okText="Ya"
            cancelText="Tidak"
            okType="danger"
          >
            <Button
              type="text"
              disabled={
                currentUserData?.id === record.id ||
                !ability.can(
                  PermissionCodeEnum.DELETE_ROLE,
                  PermissionGroupEnum.AUTH,
                )
              }
              icon={
                <DeleteOutlined
                  style={{
                    color:
                      currentUserData?.id === record.id ||
                      !ability.can(
                        PermissionCodeEnum.DELETE_ROLE,
                        PermissionGroupEnum.AUTH,
                      )
                        ? ActionButtonColorEnum.DISABLED
                        : ActionButtonColorEnum.DELETE,
                  }}
                />
              }
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  return {
    UserTableColumns,
    isRoleDataLoading,
    roleData,
    handleRoleSearch,
    handlePageChange,
    refetchRoleData,
    ability,
  };
}

export default useRoleIndexController;
