import type { FilterType } from "@/lib/Enums/FilterType";

export interface FilterQuery {
  filterType: FilterType;
  field: string;
  value: any;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: string;
  sortBy?: SortByType;
  isPaginated?: number | boolean;
  filters?: any;
  includedIds?: string[];
}

const SortBy = {
  ASC: "asc",
  DESC: "desc",
};

type SortByType = (typeof SortBy)[keyof typeof SortBy];
