import {
  activityReportHeader,
  campusFilter,
  campusHeader,
  campusSort,
  courseFilter,
  courseHeader,
  courseSort,
  noticeFilter,
  noticeHeader,
  noticeSort,
  postFilter,
  postHeader,
  postSort,
  runningmateFilter,
  runningmateHeader,
  runningmateSort,
  userFilter,
  userHeader,
  userSort
} from '../constants';

// ============================= Enum
export enum RowType {
  USER = 'USER',
  CAMPUS = 'CAMPUS',
  COURSE = 'COURSE',
  RUNNINGMATE = 'RUNNINGMATE',
  ACTIVITY_REPORT = 'ACTIVITY_REPORT',
  POST = 'POST',
  NOTICE = 'NOTICE'
}

export type StatusCode = 0 | 10 | 20 | 30;

export enum SearchTitle {
  USER = '유저 이름으로',
  CAMPUS = '캠퍼스',
  COURSE = '강의',
  RUNNINGMATE = '러닝메이트',
  POST = '게시글 제목으로',
  NOTICE = '공지'
}

// ============================ Pagination Type
export type Page = {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export interface PaginationsProps {
  page: Page;
  onPageChange: (newPage: Page) => void;
}

// ============================ Header Type
export type Headers<T> = {
  [K in keyof T]: {
    label: string;
    width?: number | string;
  };
};

export const allHeaders: { [key in RowType]: Headers<any> } = {
  [RowType.USER]: userHeader,
  [RowType.CAMPUS]: campusHeader,
  [RowType.COURSE]: courseHeader,
  [RowType.RUNNINGMATE]: runningmateHeader,
  [RowType.POST]: postHeader,
  [RowType.NOTICE]: noticeHeader,
  [RowType.ACTIVITY_REPORT]: activityReportHeader
};

// ============================ Row Type
interface BaseRowContent {
  id?: number;
  createdAt?: string;
}

export interface UserRowContent extends BaseRowContent {
  name: string;
  email: string;
  course: string;
  status: StatusCode;
}

export interface CampusRowContent {
  id: number;
  name: string;
}

export interface CourseRowContent extends BaseRowContent {
  name: string;
  classNumber: string;
  instructorName: string;
  startDate: string;
  endDate: string;
}

export interface RunningmateRowContent {
  id: number;
  name: string;
  subject: string;
  goal: string;
  course: string;
}

export interface FeedRowContent extends BaseRowContent {
  title: string;
  writer: string;
  content: string;
}

export interface PostRowContent extends FeedRowContent {
  postType: string;
}

export interface NoticeRowContent extends FeedRowContent {
  noticeType: string;
}

export type RowContent =
  | UserRowContent
  | CampusRowContent
  | CourseRowContent
  | RunningmateRowContent
  | PostRowContent
  | NoticeRowContent;

export interface TableData {
  type: RowType;
  contents: RowContent[];
}

// ============================ Filter, Sort Type
export interface FilterSortOption {
  value: string | number;
  label: string | number;
}
export interface FilterSortGroup {
  name: string;
  label: string;
  options: FilterSortOption[] | null;
}

export type FilterConfig = Record<SearchTitle, FilterSortGroup[]>;
export type SortConfig = Record<SearchTitle, FilterSortGroup>;

export const FILTERS: FilterConfig = {
  [SearchTitle.USER]: userFilter,
  [SearchTitle.CAMPUS]: campusFilter,
  [SearchTitle.COURSE]: courseFilter,
  [SearchTitle.POST]: postFilter,
  [SearchTitle.NOTICE]: noticeFilter,
  [SearchTitle.RUNNINGMATE]: runningmateFilter
};

// 정렬 설정 객체
export const SORTS: SortConfig = {
  [SearchTitle.USER]: userSort,
  [SearchTitle.CAMPUS]: campusSort,
  [SearchTitle.COURSE]: courseSort,
  [SearchTitle.POST]: postSort,
  [SearchTitle.NOTICE]: noticeSort,
  [SearchTitle.RUNNINGMATE]: runningmateSort
};

// ============================ Component Prop Type
export interface RowMenuProps {
  // 더보기 메뉴 컴포넌트

  hasDeleteMenu?: boolean;
  onAction: (action: 'detail' | 'delete') => void;
}

export interface TableContentProps {
  // row 데이터 컴포넌트

  data: TableData;
  isLoading: boolean;
}

export interface FiltersProps {
  // 필터 정렬 props 인터페이스
  // 필터
  searchTitle: SearchTitle;
  lazyLoadedFilters?: FilterSortGroup[];
  selectedFilters: Record<string, any>;
  onFilterChange: (filterName: string, value: string) => void;
}

export interface SortsProps {
  searchTitle: SearchTitle;
  onSortChange: (value: string) => void;
  sortOption?: string;
}

export interface SearchInputProps {
  searchTitle: SearchTitle;
  onSearchChange: (value: string) => void;
}

export interface MobileSearchProps {
  // 모바일 검색 props 인터페이스
  // 모바일 검색 props 인터페이스
  searchTitle: SearchTitle;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
// Select props 인터페이스
// 전체 검색 및 필터 props 인터페이스
export interface SearchAndFilterProps {
  searchInputProps?: SearchInputProps;
  filtersProps?: FiltersProps;
  sortsProps?: SortsProps;

  buttonText?: string;
  onApplyFilters: () => void;
}

export interface CourseListProps extends MobileSearchProps, SearchAndFilterProps, TableContentProps, PaginationsProps {}
