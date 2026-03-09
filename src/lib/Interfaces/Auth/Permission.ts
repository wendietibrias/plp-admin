import type {
  PermissionCodeEnumType,
  PermissionGroupEnumType,
} from "@/lib/Enums/PermissionEnum";
import type { BaseModel } from "../Globals/BaseModel";

export interface Permission extends BaseModel {
  code: PermissionCodeEnumType;
  group: PermissionGroupEnumType;
  description: string;
}
