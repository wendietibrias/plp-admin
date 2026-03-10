import type { TablePaginationConfig } from "antd";
import { debounce } from "lodash";
import type { Dispatch, SetStateAction } from "react";

function UseIndexPageHooks<T>(setQueryParams: Dispatch<SetStateAction<T>>) {
  const handlePageChange = (pagination: TablePaginationConfig) => {
    setQueryParams(
      (prev) =>
        ({
          ...prev,
          page: pagination.current,
          limit: pagination.pageSize,
        }) as T,
    );
  };

  const handleSearch = debounce((value: string) => {
    setQueryParams((prev) => ({ ...prev, search: value }) as T);
  }, 500);

  return {
    handlePageChange,
    handleSearch,
  };
}

export default UseIndexPageHooks;
