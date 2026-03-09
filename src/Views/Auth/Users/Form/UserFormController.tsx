import { InputType } from "@/lib/Enums/InputTypeEnum";
import type { FormFieldComponent } from "@/lib/Interfaces/Globals/FormComponent";
import { Form } from "antd";
import { debounce } from "lodash";
import { useEffect } from "react";
import useUserFormModel from "./UserFormModel";

function useUserFormController() {
  const {
    userData,
    isUserDataLoading,

    roleData,
    isRoleDataLoading,
    setRoleQueryParams,

    mutatePostPatchUser,
  } = useUserFormModel();

  const [form] = Form.useForm();

  const handleRoleSearch = debounce((searchTerm: string) => {
    setRoleQueryParams((prev) => ({ ...prev, search: searchTerm, page: 1 }));
  }, 500);

  const handleSubmit = () =>
    form
      .validateFields()
      .then((values) => {
        mutatePostPatchUser({
          id: userData?.data.id,
          data: values,
        });
      })
      .catch((err) => console.log(err));

  const UserFormFields: FormFieldComponent[] = [
    {
      formItemProps: {
        label: "Nama Pengguna",
        name: "username",
        rules: [{ required: true, message: "Masukkan nama pengguna" }],
      },
      type: InputType.INPUT,
      inputProps: {
        placeholder: "Masukkan nama pengguna",
      },
    },
    {
      formItemProps: {
        label: "Nama Lengkap",
        name: "name",
        rules: [{ required: true, message: "Masukkan nama lengkap" }],
      },
      type: InputType.INPUT,
      inputProps: {
        placeholder: "Masukkan nama lengkap",
      },
    },
    {
      formItemProps: {
        label: "Peran",
        name: "roleId",
        rules: [{ required: true, message: "Pilih peran pengguna" }],
      },
      type: InputType.SELECT,
      selectProps: {
        placeholder: "Pilih peran pengguna",
        showSearch: true,
        onSearch: handleRoleSearch,
        options: roleData?.items.map((role) => ({
          label: role.name,
          value: role.id,
        })),
        filterOption: false,
      },
    },
    ...(!userData?.data
      ? [
          {
            type: InputType.SEPARATOR,
            columnProps: { md: 24 },
            dividerProps: {
              children: "Kata Sandi",
            },
          },
          {
            formItemProps: {
              label: "Kata Sandi",
              name: "password",
              rules: [
                { required: true, message: "Masukkan kata sandi" },
                {
                  min: 6,
                  message: "Kata sandi harus terdiri dari minimal 6 karakter",
                },
              ],
            },
            type: InputType.PASSWORD,
            inputProps: {
              type: "password",
              placeholder: "Masukkan kata sandi",
            },
          },
          {
            formItemProps: {
              label: "Konfirmasi Kata Sandi",
              name: "confirmPassword",
              dependencies: ["password"],
              rules: [
                { required: true, message: "Konfirmasi kata sandi" },
                ({
                  getFieldValue,
                }: {
                  getFieldValue: (field: string) => any;
                }) => ({
                  validator(_: any, value: any) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Kata sandi tidak cocok"));
                  },
                }),
              ],
            },
            type: InputType.PASSWORD,
            inputProps: {
              type: "password",
              placeholder: "Konfirmasi kata sandi",
            },
          },
        ]
      : []),
  ];

  useEffect(() => {
    if (!userData) return;

    const user = userData.data;

    setRoleQueryParams((prev) => ({
      ...prev,
      includedIds: user?.roleId ? [user.roleId] : undefined,
    }));

    form.setFieldsValue(user);
  }, [userData]);

  return {
    userData,
    isUserDataLoading,

    roleData,
    isRoleDataLoading,

    UserFormFields,

    mutatePostPatchUser,
    form,

    handleSubmit,
  };
}

export default useUserFormController;
