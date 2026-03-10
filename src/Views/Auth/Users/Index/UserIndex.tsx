import IndexPageComponent from "@/Components/IndexComponent/IndexPageComponent";
import {
  PermissionCodeEnum,
  PermissionGroupEnum,
} from "@/lib/Enums/PermissionEnum";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import { Link } from "react-router-dom";
import useUserIndexController from "./UserIndexController";

function UserIndex() {
  const {
    UserTableColumns,
    handleSearch,
    isUserDataLoading,
    refetchUserData,
    userData,
    FilterProps,
    handlePageChange,
    ability,
  } = useUserIndexController();

  return (
    <IndexPageComponent
      filters={FilterProps}
      searchProps={{
        placeholder: "Cari pengguna...",
        onSearch: handleSearch,
        loading: isUserDataLoading,
      }}
      refetch={refetchUserData}
      tableProps={{
        dataSource: userData?.items || [],
        columns: UserTableColumns,
        loading: isUserDataLoading,
        pagination: {
          current: userData?.meta?.currentPage,
          pageSize: userData?.meta?.itemsPerPage,
          total: userData?.meta?.totalItems,
        },
        onChange: handlePageChange,
        rowKey: "id",
      }}
      actions={
        <Row className="mt-4">
          <Link to="./create">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              disabled={
                !ability.can(
                  PermissionCodeEnum.CREATE_USER,
                  PermissionGroupEnum.AUTH,
                )
              }
            >
              Tambah Pengguna
            </Button>
          </Link>
        </Row>
      }
    />
  );
}

export default UserIndex;
