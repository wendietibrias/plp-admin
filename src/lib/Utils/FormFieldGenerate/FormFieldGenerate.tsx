import type { FormFieldComponent } from "@/lib/Interfaces/Globals/FormComponent";
import { Col, Form } from "antd";
import { GenerateInput } from "./GenerateInput";

export function GenerateFormField(field: FormFieldComponent, index: number) {
  return (
    <Col md={12} key={index} {...field.columnProps}>
      <Form.Item {...field.formItemProps}>
        {GenerateInput(field, index)}
      </Form.Item>
    </Col>
  );
}
