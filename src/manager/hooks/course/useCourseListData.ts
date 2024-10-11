import React from 'react';
import { FILTERS, FilterSortGroup, Page, RowType, SearchTitle, TableData } from '../../types';
import { courseListRequest } from '../../services/api';
import { formatDateToKorean } from '../../../common/utils';

export function useCourseListData() {
  const courseSearchTitle = SearchTitle.COURSE;
  const [filters, setFilters] = React.useState<FilterSortGroup[]>(FILTERS[courseSearchTitle]);
  const [selectedFilters, setSelectedFilters] = React.useState<Record<string, any>>({});
  const [sortOption, setSortOption] = React.useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = React.useState<Page>({
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    last: false
  });
  const [courseData, setCourseData] = React.useState<TableData>({
    type: RowType.COURSE,
    contents: []
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState<string | undefined>(undefined);

  const loadCourse = async (params: {}) => {
    setIsLoading(true);
    try {
      const response = await courseListRequest(params);
      const data = response.data;
      const { content, ...pageInfo } = data;
      const { pageNumber, pageSize, totalElements, totalPages, last } = pageInfo;
      setCurrentPage({ pageNumber, pageSize, totalElements, totalPages, last });
      setCourseData({
        type: RowType.COURSE,
        contents: content.map((course: any) => ({
          id: course.id,
          status: course.status,
          name: `(${course.classNumber}기)　${course.name}`,
          instructorName: course.instructorName,
          startDate: formatDateToKorean(course.startDate),
          endDate: formatDateToKorean(course.endDate),
          createdAt: formatDateToKorean(course.createdAt)
        }))
      });
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      // 에러 처리 로직 추가
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadCourse({ page: 0 });
  }, []);

  const handleFilterChange = (filterName: string, value: string | number) => {
    setSelectedFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const getQueryParams = (page: number) => {
    return {
      page,
      ...selectedFilters,
      name: searchTerm,
      sort: sortOption
    };
  };

  const handleApplyFilters = () => {
    loadCourse(getQueryParams(currentPage.pageNumber));
  };

  const handlePageChange = (newPage: Page) => {
    setCurrentPage(newPage);
    loadCourse(getQueryParams(newPage.pageNumber));
  };

  return {
    courseSearchTitle,
    loadCourse,
    courseData,
    isLoading,
    currentPage,
    filters,
    selectedFilters,
    sortOption,
    searchTerm,
    handleFilterChange,
    handleSortChange,
    handleSearchChange,
    handleApplyFilters,
    handlePageChange
  };
}
