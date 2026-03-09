import type { FormFieldComponent } from "@/lib/Interfaces/Globals/FormComponent";
import { GenerateFormField } from "@/lib/Utils/FormFieldGenerate/FormFieldGenerate";
import { Button, Card, Col, Form, Row, type FormProps } from "antd";

export interface FormPageComponentProps {
  formFields?: FormFieldComponent[];
  formProps?: FormProps;
  onSubmit?: () => void;
  formSuffix?: React.ReactNode;
  submitLoading?: boolean;
}

function FormPageComponent(props: FormPageComponentProps) {
  const { formFields, formProps, onSubmit, formSuffix } = props;
  return (
    <>
      <Form layout="vertical" {...formProps} onFinish={onSubmit}>
        <Card>
          <Row gutter={16}>
            {formFields?.map((field, index) => {
              return GenerateFormField(field, index);
            })}
          </Row>
        </Card>
        {formSuffix}
        <Card>
          <Row>
            <Col md={24}>
              <Button
                type="primary"
                htmlType="submit"
                children="Simpan"
                loading={props.submitLoading}
                disabled={props.submitLoading}
              />
            </Col>
          </Row>
        </Card>
      </Form>
    </>
  );
}

export default FormPageComponent;
