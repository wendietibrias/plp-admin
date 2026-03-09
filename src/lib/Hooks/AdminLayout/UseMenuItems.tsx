import {
  PermissionCodeEnum,
  PermissionGroupEnum,
} from "@/lib/Enums/PermissionEnum";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import type { Ability } from "@casl/ability";
import type { ItemType } from "antd/es/menu/interface";
import { useMemo } from "react";

// Pass ability in so you can filter items by permission later
export const useMenuItems = (ability: Ability): ItemType[] => {
  return useMemo(
    () => [
      {
        key: "/",
        icon: <HomeOutlined />,
        label: "Dashboard",
      },

      {
        key: "AuthManagement",
        icon: <UserOutlined />,
        label: "Manajemen Pengguna",
        children: [
          ...[
            ability.can(
              PermissionCodeEnum.READ_USER,
              PermissionGroupEnum.AUTH,
            ) && {
              key: "users",
              label: "Pengguna",
            },
            ability.can(
              PermissionCodeEnum.READ_ROLE,
              PermissionGroupEnum.AUTH,
            ) && {
              key: "roles",
              label: "Peran",
            },
          ],
        ],
      },
    ],

    [ability],
  )
    .map((item) => {
      if ("children" in item)
        return {
          ...item,
          children: item.children?.filter((child) => child),
        };
      return item;
    })
    .filter((item) => {
      if ("children" in item) return item?.children?.length;
      return true;
    });
};
