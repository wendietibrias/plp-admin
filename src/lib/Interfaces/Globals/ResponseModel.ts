export interface Pagination<T> {
  items: Array<T>;
  meta: MetaDto;
}

export interface Response<T> {
  data: T;
  message?: string;
}

export interface ServerMessage {
  message: string;
}

type MetaDto = {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};
