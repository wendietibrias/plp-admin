import type { FilterType } from "@/lib/Enums/FilterType";
import type { FormFieldComponent } from "@/lib/Interfaces/Globals/FormComponent";
import { GenerateFormField } from "@/lib/Utils/FormFieldGenerate/FormFieldGenerate";
import { FilterOutlined, RedoOutlined } from "@ant-design/icons";
import type { RefetchOptions } from "@tanstack/query-core";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Table,
  type FormProps,
  type TableProps,
} from "antd";
import type { SearchProps } from "antd/es/input";
import { useState } from "react";

interface FilterField extends FormFieldComponent {
  filterType: FilterType;
}

export interface IndexPageProps<T = any> {
  filters?: {
    formProps?: FormProps;
    fields: FilterField[];
  };
  searchProps?: SearchProps;
  actions?: React.ReactNode;
  tableProps?: TableProps<T>;
  refetch?: (options?: RefetchOptions) => Promise<any>;
}

interface IndexPageState {
  isFilterVisible: boolean;
}

function IndexPageComponent(props: IndexPageProps) {
  const { filters, actions, searchProps, tableProps, refetch } = props;

  const [indexPageState, setIndexPageState] = useState<IndexPageState>({
    isFilterVisible: false,
  });

  const handleToggleFilter = () => {
    setIndexPageState((prev) => {
      if (!prev.isFilterVisible) filters?.formProps?.form?.resetFields();

      return {
        ...prev,
        isFilterVisible: !prev.isFilterVisible,
      };
    });
  };

  return (
    <Card>
      <Row gutter={[10, 10]}>
        {!!filters && (
          <Col md={1.5}>
            <Button
              type="dashed"
              icon={<FilterOutlined />}
              onClick={handleToggleFilter}
            >
              Filters
            </Button>
          </Col>
        )}
        {!!searchProps && (
          <Col md={10}>
            <Input.Search {...searchProps} allowClear />
          </Col>
        )}
        {refetch && (
          <Col md={2}>
            <Button
              onClick={() => refetch()}
              type="primary"
              icon={<RedoOutlined spin={!!tableProps?.loading} />}
            ></Button>
          </Col>
        )}
      </Row>

      {!!indexPageState.isFilterVisible && (
        <Col md={24}>
          <Divider className="mt-2">Saring</Divider>
          <Form layout="vertical" {...filters?.formProps}>
            <Row>
              {filters?.fields.map((filter, index) =>
                GenerateFormField(filter, index),
              )}
            </Row>
          </Form>
        </Col>
      )}

      {!!actions && <Col md={24}>{actions}</Col>}

      <Row className="mt-4">
        <Col md={24}>
          <Table {...tableProps} />
        </Col>
      </Row>
    </Card>
  );
}

export default IndexPageComponent;
