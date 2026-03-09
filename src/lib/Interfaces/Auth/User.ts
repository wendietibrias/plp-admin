import type { BaseModel } from "../Globals/BaseModel";
import type { QueryParams } from "../Globals/QueryParams";
import type { Role } from "./Role";

export interface User extends BaseModel {
  name?: string;
  username: string;
  password?: string;
  roleId?: string;
  role: Role;
}

export interface CreateUser {
  name?: string;
  username: string;
  password: string;
  confirmPassword: string;
  roleId?: string;
}

export interface UpdateUser {
  name?: string;
  username: string;
  roleId?: string;
}

export interface UserQueryParams extends QueryParams {
  roleId?: string;
}
