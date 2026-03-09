export const PermissionCodeEnum = {
  READ_USER: "Melihat Pengguna",
  CREATE_USER: "Membuat Pengguna",
  UPDATE_USER: "Mengubah Pengguna",
  DELETE_USER: "Menghapus Pengguna",

  READ_ROLE: "Melihat Peran",
  CREATE_ROLE: "Membuat Peran",
  UPDATE_ROLE: "Mengubah Peran",
  DELETE_ROLE: "Menghapus Peran",
};

export const PermissionGroupEnum = {
  AUTH: "Autentikasi",
};

export type PermissionGroupEnumType =
  (typeof PermissionGroupEnum)[keyof typeof PermissionGroupEnum];

export type PermissionCodeEnumType =
  (typeof PermissionCodeEnum)[keyof typeof PermissionCodeEnum];
