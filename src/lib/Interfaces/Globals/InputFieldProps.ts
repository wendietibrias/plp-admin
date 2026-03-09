import type { InputTypeEnumType } from "@/lib/Enums/InputTypeEnum";
import type {
  CheckboxProps,
  DatePickerProps,
  DividerProps,
  InputNumberProps,
  RadioGroupProps,
  SelectProps,
  SwitchProps,
} from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import type { InputProps, PasswordProps, TextAreaProps } from "antd/es/input";

export interface InputFieldProps {
  type: InputTypeEnumType;
  inputProps?: InputProps;
  inputNumberProps?: InputNumberProps;
  selectProps?: SelectProps;
  datePickerProps?: DatePickerProps;
  rangePickerProps?: RangePickerProps;
  radioProps?: RadioGroupProps;
  checkboxProps?: CheckboxProps;
  switchProps?: SwitchProps;
  textAreaProps?: TextAreaProps;
  dividerProps?: DividerProps;
  passwordProps?: PasswordProps;
}
