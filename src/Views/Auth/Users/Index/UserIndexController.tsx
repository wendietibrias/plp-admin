import type { IndexPageProps } from "@/Components/IndexComponent/IndexPageComponent";
import { AbilityContext } from "@/lib/Contexts/AbilityContext";
import { ActionButtonColorEnum } from "@/lib/Enums/ActionButtonColorEnum";
import { FilterType } from "@/lib/Enums/FilterType";
import { InputType } from "@/lib/Enums/InputTypeEnum";
import {
  PermissionCodeEnum,
  PermissionGroupEnum,
} from "@/lib/Enums/PermissionEnum";
import type { User } from "@/lib/Interfaces/Auth/User";
import UseAuthStore from "@/lib/Stores/UseAuthStore";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAbility } from "@casl/react";
import { Button, Form, Popconfirm } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import useUserIndexModel from "./UserIndexModel";

function useUserIndexController() {
  const {
    isRoleDataLoading,
    isUserDataLoading,
    refetchUserData,
    roleData,
    setRoleQueryParams,
    setUserQueryParams,
    userData,

    mutateDeleteUser,
  } = useUserIndexModel();

  const { userData: currentUserData } = UseAuthStore();
  const ability = useAbility(AbilityContext);
  const [form] = Form.useForm();

  const handlePageChange = (paginationConfig: TablePaginationConfig) => {
    setUserQueryParams((prev) => ({
      ...prev,
      page: paginationConfig.current,
      limit: paginationConfig.pageSize,
    }));
  };

  const handleUserSearch = debounce((searchTerm: string) => {
    setUserQueryParams((prev) => ({ ...prev, search: searchTerm, page: 1 }));
  }, 500);

  const handleRoleSearch = debounce((searchTerm: string) => {
    setRoleQueryParams((prev) => ({ ...prev, search: searchTerm }));
  }, 500);

  const handleRoleChange = (value: string) => {
    setUserQueryParams((prev) => ({ ...prev, roleId: value, page: 1 }));
  };

  const handleDeleteUser = (userId: string) => {
    mutateDeleteUser({ id: userId });
  };

  const FilterProps: IndexPageProps["filters"] = {
    fields: [
      {
        formItemProps: {
          name: "roleId",
          label: "Peran",
        },
        columnProps: {
          md: 6,
        },
        filterType: FilterType.EQUAL,
        type: InputType.SELECT,
        selectProps: {
          className: "w-full",
          allowClear: true,
          options:
            roleData?.items?.map((role) => ({
              label: role.name,
              value: role.id,
            })) || [],
          loading: isRoleDataLoading,
          showSearch: true,
          onSearch: handleRoleSearch,
          onChange: handleRoleChange,
        },
      },
    ],
  };

  const UserTableColumns: ColumnsType<User> = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Peran",
      dataIndex: "role",
      key: "role",
      render: (_, record) => record?.role?.name || "-",
    },
    {
      title: "Aksi",
      key: "actions",
      align: "center",
      width: 100,
      render: (_, record) => (
        <>
          {/* <Button
            type="text"
            icon={
              <FileTextOutlined
                style={{
                  color: ActionButtonColorEnum.DETAIL,
                }}
              />
            }
          /> */}
          <Link to={`./${record.id}/edit`}>
            <Button
              type="text"
              disabled={
                !ability.can(
                  PermissionCodeEnum.UPDATE_USER,
                  PermissionGroupEnum.AUTH,
                )
              }
              icon={
                <EditOutlined
                  style={{
                    color: !ability.can(
                      PermissionCodeEnum.UPDATE_USER,
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
            title="Apakah Anda yakin ingin menghapus pengguna ini?"
            onConfirm={() => handleDeleteUser(record.id!)}
            okText="Ya"
            cancelText="Tidak"
            okType="danger"
          >
            <Button
              type="text"
              disabled={
                currentUserData?.id === record.id ||
                !ability.can(
                  PermissionCodeEnum.DELETE_USER,
                  PermissionGroupEnum.AUTH,
                )
              }
              icon={
                <DeleteOutlined
                  style={{
                    color:
                      currentUserData?.id === record.id ||
                      !ability.can(
                        PermissionCodeEnum.DELETE_USER,
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
    isRoleDataLoading,
    isUserDataLoading,
    refetchUserData,
    roleData,
    handleRoleSearch,
    handleUserSearch,
    UserTableColumns,
    userData,
    form,

    FilterProps,
    handlePageChange,
    ability,
  };
}

export default useUserIndexController;
