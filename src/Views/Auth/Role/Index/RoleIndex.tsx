import IndexPageComponent from "@/Components/IndexComponent/IndexPageComponent";
import {
  PermissionCodeEnum,
  PermissionGroupEnum,
} from "@/lib/Enums/PermissionEnum";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import { Link } from "react-router-dom";
import useRoleIndexController from "./RoleIndexController";

function RoleIndex() {
  const {
    UserTableColumns,
    handlePageChange,
    handleSearch,
    isRoleDataLoading,
    roleData,
    refetchRoleData,
    ability,
  } = useRoleIndexController();

  return (
    <IndexPageComponent
      refetch={refetchRoleData}
      searchProps={{
        onSearch: handleSearch,
        placeholder: "Cari Peran",
      }}
      actions={
        <Row className="mt-4">
          <Link to="./create">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              disabled={
                !ability.can(
                  PermissionCodeEnum.CREATE_ROLE,
                  PermissionGroupEnum.AUTH,
                )
              }
            >
              Tambah Peran
            </Button>
          </Link>
        </Row>
      }
      tableProps={{
        columns: UserTableColumns,
        loading: isRoleDataLoading,
        dataSource: roleData?.items || [],
        pagination: {
          total: roleData?.meta.totalItems || 0,
          current: roleData?.meta.currentPage || 1,
          pageSize: roleData?.meta.itemCount || 10,
        },
        onChange: handlePageChange,
      }}
    />
  );
}

export default RoleIndex;
