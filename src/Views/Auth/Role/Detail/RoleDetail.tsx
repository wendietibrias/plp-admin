import DetailPageComponent from "@/Components/DetailComponent/DetailPageComponent";
import { Card, Col, Table } from "antd";
import RoleDetailController from "./RoleDetailController";

function RoleDetail() {
  const {
    RelatedUserTableColumns,
    RoleDetailFields,
    isRoleDataFetching,
    roleData,
  } = RoleDetailController();

  return (
    <DetailPageComponent
      descriptionProps={{
        title: "Detail Peran",
        column: 1,
        items: RoleDetailFields,
      }}
      pageLoading={isRoleDataFetching}
      customColSuffixChildren={
        <Col md={24}>
          <Card title="Pengguna Terkait" loading={isRoleDataFetching}>
            <Table
              bordered
              columns={RelatedUserTableColumns}
              dataSource={roleData?.data?.users}
              pagination={false}
            />
          </Card>
        </Col>
      }
    />
  );
}

export default RoleDetail;
