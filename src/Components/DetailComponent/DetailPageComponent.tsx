import {
  Card,
  Col,
  Descriptions,
  Divider,
  Row,
  Spin,
  type DescriptionsProps,
} from "antd";

interface Props {
  descriptionProps: DescriptionsProps;
  suffixDescriptionChildren?: React.ReactNode | (() => React.ReactNode);
  actionLayoutProps?: {
    actionButtonChildren: React.ReactNode | (() => React.ReactNode);
  }; // If True, the layout will have an action button on right;
  divider?: {
    display: boolean;
    title?: string;
  };
  detailChildren?: React.ReactNode | (() => React.ReactNode);
  pageLoading?: boolean;
  /**
   * If you want to render custom suffix children after the detailChildren
   * And still inside Row
   */
  customColSuffixChildren?: React.ReactNode | (() => React.ReactNode);
}

const DetailPageComponent = ({
  actionLayoutProps,
  descriptionProps,
  suffixDescriptionChildren,
  divider,
  detailChildren: DetailChildren,
  pageLoading = false,
  customColSuffixChildren,
}: Props) => {
  const handleComponentRender = (
    children: React.ReactNode | (() => React.ReactNode),
  ) => {
    return typeof children === "function" ? children() : children;
  };

  return (
    <Spin spinning={pageLoading}>
      <Row>
        <Col md={actionLayoutProps ? 18 : 24}>
          <Card>
            <>
              <Descriptions {...descriptionProps} />
              {handleComponentRender(suffixDescriptionChildren)}
            </>
          </Card>
        </Col>

        {actionLayoutProps ? (
          <Col md={6}>
            <Card
              styles={{
                body: {
                  padding: "1.15rem 0.5rem 2rem 0.5rem",
                },
              }}
            >
              {handleComponentRender(actionLayoutProps.actionButtonChildren)}
            </Card>
          </Col>
        ) : null}

        {divider?.display && (
          <Col span={24}>
            <Divider>{divider.title}</Divider>
          </Col>
        )}

        {DetailChildren ? (
          <Col md={24}>
            <Card>{handleComponentRender(DetailChildren)}</Card>
          </Col>
        ) : null}

        {customColSuffixChildren ? (
          <>
            {typeof customColSuffixChildren === "function"
              ? customColSuffixChildren()
              : customColSuffixChildren}
          </>
        ) : null}
      </Row>
    </Spin>
  );
};

export default DetailPageComponent;
