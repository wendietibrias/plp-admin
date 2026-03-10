import ActionButtonComponent from "@/Components/IndexComponent/ActionButtonComponent";
import type { IndexPageProps } from "@/Components/IndexComponent/IndexPageComponent";
import { AbilityContext } from "@/lib/Contexts/AbilityContext";
import { ActionButtonColorEnum } from "@/lib/Enums/ActionButtonColorEnum";
import { FilterType } from "@/lib/Enums/FilterType";
import { InputType } from "@/lib/Enums/InputTypeEnum";
import {
  PermissionCodeEnum,
  PermissionGroupEnum,
} from "@/lib/Enums/PermissionEnum";
import UseIndexPageHooks from "@/lib/Hooks/PageHooks/IndexPageHooks";
import type { User } from "@/lib/Interfaces/Auth/User";
import UseAuthStore from "@/lib/Stores/UseAuthStore";
import { DeleteOutlined } from "@ant-design/icons";
import { useAbility } from "@casl/react";
import { Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import { debounce } from "lodash";
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

  const { handlePageChange, handleSearch } =
    UseIndexPageHooks(setUserQueryParams);

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
      render: (_, record) =>
        ActionButtonComponent<User>(
          {
            editProps: {},
            deleteProps: {
              buttonProps: {
                disabled:
                  currentUserData?.id === record.id ||
                  !ability.can(
                    PermissionCodeEnum.DELETE_USER,
                    PermissionGroupEnum.AUTH,
                  ),
                icon: (
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
                ),
              },
              popConfirmProps: {
                title: "Apakah Anda yakin ingin menghapus pengguna ini?",
                onConfirm: () => handleDeleteUser(record.id!),
                disabled:
                  currentUserData?.id === record.id ||
                  !ability.can(
                    PermissionCodeEnum.DELETE_USER,
                    PermissionGroupEnum.AUTH,
                  ),
              },
            },
          },
          record,
        ),
    },
  ];

  return {
    isRoleDataLoading,
    isUserDataLoading,
    refetchUserData,
    roleData,
    handleRoleSearch,
    handleSearch,
    UserTableColumns,
    userData,
    form,

    FilterProps,
    handlePageChange,
    ability,
  };
}

export default useUserIndexController;
