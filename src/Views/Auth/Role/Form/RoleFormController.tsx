import { InputType } from "@/lib/Enums/InputTypeEnum";
import type { Permission } from "@/lib/Interfaces/Auth/Permission";
import type { FormFieldComponent } from "@/lib/Interfaces/Globals/FormComponent";
import { Checkbox, Form, Table, type CollapseProps } from "antd";
import { useEffect, useState } from "react";
import useRoleFormModel from "./RoleFormModel";

function useRoleFormController() {
  const {
    roleData,
    isRoleDataFetching,
    permissionsData,
    isPermissionsDataFetching,
    mutatePostPatchRole,
  } = useRoleFormModel();

  const [form] = Form.useForm();
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>(
    [],
  );

  const handleSubmit = () =>
    form.validateFields().then((values) => {
      mutatePostPatchRole({
        id: roleData?.data?.id,
        data: {
          ...values,
          permissionIds: selectedPermissionIds,
        },
      });
    });

  const RoleFormFields: FormFieldComponent[] = [
    {
      type: InputType.INPUT,
      formItemProps: {
        label: "Nama Peran",
        name: "name",
        rules: [
          {
            required: true,
            message: "Nama peran wajib diisi",
          },
        ],
      },
      inputProps: {
        placeholder: "Masukkan nama peran",
      },
    },

    {
      type: InputType.TEXT_AREA,
      formItemProps: {
        label: "Deskripsi",
        name: "description",
      },
      columnProps: {
        md: 24,
      },
      inputProps: {
        placeholder: "Masukkan deskripsi peran",
      },
    },
  ];

  const PermissionCheckboxCollapseItems = (): CollapseProps["items"] => {
    const GroupedPermission: Map<string, Permission[]> = new Map();

    permissionsData?.data.forEach((permission) => {
      const existingGroup = GroupedPermission.get(
        permission.group || "Ungrouped",
      );

      if (existingGroup) {
        existingGroup.push(permission);
      } else {
        GroupedPermission.set(permission.group || "Ungrouped", [permission]);
      }
    });

    return Array.from(GroupedPermission.entries()).map(
      ([group, permissions]) => ({
        key: group,
        label: group,
        children: (
          <Table
            size="small"
            pagination={false}
            dataSource={permissions}
            columns={[
              {
                title: "Permission",
                dataIndex: "code",
              },
              {
                title: "Deskripsi",
                dataIndex: "description",
              },
              {
                title: "Pilih",
                key: "select",
                align: "center",
                width: "100px",
                render: (_, record) => <Checkbox value={record.id} />,
              },
            ]}
            bordered
          />
        ),
      }),
    );
  };

  const handlePermissionChange = (permissionIds: string[]) => {
    setSelectedPermissionIds(permissionIds);
  };

  useEffect(() => {
    if (!roleData?.data) return;
    setSelectedPermissionIds(
      (roleData?.data?.permissions || [])?.map((perm) => perm.id!),
    );
    form.setFieldsValue(roleData.data);
  }, [roleData]);

  return {
    form,
    RoleFormFields,
    isRoleDataFetching,
    roleData,
    permissionsData,
    isPermissionsDataFetching,
    mutatePostPatchRole,
    handleSubmit,
    PermissionCheckboxCollapseItems,
    handlePermissionChange,
    selectedPermissionIds,
  };
}

export default useRoleFormController;
