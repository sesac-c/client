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
  POST = '게시글',
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

export interface CampusRowContent extends BaseRowContent {
  name: string;
}

export interface CourseRowContent extends BaseRowContent {
  name: string;
  classNumber: string;
  instructorName: string;
  startDate: string;
  endDate: string;
}

export interface RunningmateRowContent extends BaseRowContent {
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
interface FilterSortOption {
  value: string | number;
  label: string | number;
}
interface FilterSortGroup {
  name: string;
  label: string;
  options: FilterSortOption[];
}

type FilterConfig = Record<SearchTitle, FilterSortGroup[]>;
type SortConfig = Record<SearchTitle, FilterSortGroup>;

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
interface TableSearchProps {
  // search input 컴포넌트
  // search input 컴포넌트
  searchTitle: SearchTitle;
}

interface MobileSearchProps extends TableSearchProps {
  // 모바일 검색 props 인터페이스
  // 모바일 검색 props 인터페이스
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FilterSortProps {
  // 필터 정렬 props 인터페이스
  // 필터
  onFilterChange: (filterName: string, value: string) => void;
  selectedFilters: Record<string, any>;

  // 서치(필터)
  onSearchChange: (value: string) => void;
  searchTerm?: string;

  // 정렬
  onSortChange: (value: string) => void;
  sortOption?: string;
  onApplyFilters: () => void;
}

// Select props 인터페이스
interface SelectProps {
  placeholder?: string;
}

// 전체 검색 및 필터 props 인터페이스
interface SearchAndFilterProps extends FilterSortProps, TableSearchProps {
  selectProps?: SelectProps;
}

// 일괄 export
export type {
  TableSearchProps,
  MobileSearchProps,
  FilterSortOption,
  FilterSortGroup,
  FilterConfig,
  SortConfig,
  FilterSortProps,
  SelectProps,
  SearchAndFilterProps
};

export interface CustomTableProps extends TableContentProps, PaginationsProps, FilterSortProps, MobileSearchProps {}
