export type CastMember = {
  name: string;
  character: string;
};

export type TVShow = {
  id: string;
  title: string;
  cast: CastMember[];
};

export type PaginatedData<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
};

export type SingleData<T> = {
  data: T;
  success: boolean;
};
