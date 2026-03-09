import { InputType } from "@/lib/Enums/InputTypeEnum";
import type { InputFieldProps } from "@/lib/Interfaces/Globals/InputFieldProps";
import {
  Checkbox,
  DatePicker,
  Divider,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
} from "antd";

export function GenerateInput(props: InputFieldProps, index: number) {
  switch (props.type) {
    case InputType.INPUT:
      return <Input key={index} {...props.inputProps} />;
    case InputType.INPUT_NUMBER:
      return <InputNumber key={index} {...props.inputNumberProps} />;
    case InputType.SELECT:
      return <Select key={index} {...props.selectProps} />;
    case InputType.DATEPICKER:
      return <DatePicker key={index} {...props.datePickerProps} />;
    case InputType.DATE_RANGE:
      return <DatePicker.RangePicker key={index} {...props.rangePickerProps} />;
    case InputType.CHECKBOX:
      return <Checkbox key={index} {...props.checkboxProps} />;
    case InputType.RADIO:
      return <Radio key={index} {...props.radioProps} />;
    case InputType.SWITCH:
      return <Switch key={index} {...props.switchProps} />;
    case InputType.TEXT_AREA:
      return <Input.TextArea key={index} {...props.textAreaProps} />;
    case InputType.SEPARATOR:
      return <Divider {...props.dividerProps} />;
    case InputType.PASSWORD:
      return <Input.Password key={index} {...props.passwordProps} />;
    default:
      return null;
  }
}
