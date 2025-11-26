export interface PaginatorInfo<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export interface GetParams {
  slug: string;
  language: string;
}

export interface MappedPaginatorInfo {
    currentPage: number;
    firstPageUrl: string;
    from: number;
    lastPage: number;
    lastPageUrl: string;
    links: any[];
    nextPageUrl: string | null;
    path: string;
    perPage: number;
    prevPageUrl: string | null;
    to: number;
    total: number;
    hasMorePages: boolean;
  }
  
export interface QueryOptions {
  language: string;
  limit?: number;
  page?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
}

export interface Course {
  id: string;
  name: string;
  slug: string;
}

export interface CourseInput {
  name: string;
  slug: string;
}

export interface CourseQueryOptions extends QueryOptions {
  name: string;
  slug: string;
}

export interface CoursePaginator extends PaginatorInfo<Course> {}
