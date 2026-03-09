export const InputType = {
  INPUT: "input",
  PASSWORD: "password",
  INPUT_NUMBER: "input_number",
  SELECT: "select",
  RADIO: "radio",
  DATEPICKER: "datepicker",
  DATE_RANGE: "date_range",
  CHECKBOX: "checkbox",
  SWITCH: "switch",
  TEXT_AREA: "text_area",
  SEPARATOR: "separator",
};

export type InputTypeEnumType = (typeof InputType)[keyof typeof InputType];
