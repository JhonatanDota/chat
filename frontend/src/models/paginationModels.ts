export type CursorPaginationModel = {
  prev: string | null;
  next: string | null;
};

export type CursorPaginationResponseModel<T> = {
  data: T[];
  cursors: CursorPaginationModel;
};
