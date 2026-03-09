export const NavigationKeyEnum = {
  DASHBOARD: "",
  USERS: "users",
  ROLES: "roles",
};

export type NavigationKeyEnumType =
  (typeof NavigationKeyEnum)[keyof typeof NavigationKeyEnum];
