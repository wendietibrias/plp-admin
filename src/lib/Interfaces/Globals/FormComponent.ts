import type { InputTypeEnumType } from "@/lib/Enums/InputTypeEnum";
import type { ColProps, FormItemProps } from "antd";
import type { InputFieldProps } from "./InputFieldProps";

export interface FormFieldComponent extends InputFieldProps {
  type: InputTypeEnumType;
  columnProps?: ColProps;

  formItemProps?: FormItemProps;
}
