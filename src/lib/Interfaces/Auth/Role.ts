import type { BaseModel } from "../Globals/BaseModel";
import type { QueryParams } from "../Globals/QueryParams";
import type { Permission } from "./Permission";
import type { User } from "./User";

export interface Role extends BaseModel {
  name: string;
  description?: string;
  permissions?: Permission[];
  users?: User[];
}

export interface CreateRole {
  name: string;
  description?: string;
  permissionIds?: string[];
}

export interface UpdateRole extends CreateRole {}

export interface RoleQuery extends QueryParams {}
