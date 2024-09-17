import React from 'react';
import ContentHeader from '../../common/layout/ContentHeader';
import { addIcon, navIcons } from '../../../assets/icon';
import {
  CourseRowContent,
  FilterConfig,
  FILTERS,
  FilterSortGroup,
  Page,
  RowType,
  SearchTitle,
  TableData
} from '../../../types';
import { formatDateToKorean } from '../../../../common/utils';
import { courseListRequest, courseOptionsRequest } from '../../../services/api';
import { transformCourseOptions } from '../../../utils';
import MobileSearch from '../../common/UI/table/mobile/MobileSearch';
import { SearchAndFilter } from '../../common/UI/table/TableFilters';
import TableContent from '../../common/UI/table/TableContent';
import Paginations from '../../common/UI/table/Paginations';

const page = '강의 관리';
const breadcrumb = {
  homeIcon: navIcons.course,
  breadcrumbTrail: [page]
};
const button = {
  buttonText: '강의 등록',
  buttonIcon: addIcon
};
const CourseList: React.FC = () => {
  const [open, setOpen] = React.useState(false);
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
        })) as CourseRowContent[]
      });
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      // 에러 처리 로직 추가
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    loadCourse({
      page: 0
    });
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

  function getQueryParams(page: number) {
    return {
      page,
      ...selectedFilters,
      name: searchTerm,
      sort: sortOption
    };
  }
  const handleApplyFilters = () => {
    loadCourse(getQueryParams(currentPage.pageNumber));
  };

  const handlePageChange = (newPage: Page) => {
    setCurrentPage(newPage);
    loadCourse(getQueryParams(newPage.pageNumber));
  };

  function handleAddCourse() {
    // 강의 추가 요청
  }
  return (
    <React.Fragment>
      {/* 페이지 헤더 */}
      <ContentHeader
        breadcrumb={breadcrumb}
        pageInfo={{ page, button: { ...button, buttonOnclick: handleAddCourse } }}
      />
      {/* 테이블 */}
      <React.Fragment>
        <MobileSearch
          open={open}
          setOpen={setOpen}
          searchTitle={courseSearchTitle}
          // onSearchChange={onSearchChange}
        />
        <SearchAndFilter
          // search
          searchInputProps={{
            searchTitle: courseSearchTitle,
            onSearchChange: handleSearchChange
          }}
          // filter
          filtersProps={{
            searchTitle: courseSearchTitle,
            selectedFilters: selectedFilters,
            onFilterChange: handleFilterChange
          }}
          // sort
          sortsProps={{
            searchTitle: courseSearchTitle,
            sortOption: sortOption,
            onSortChange: handleSortChange
          }}
          onApplyFilters={handleApplyFilters}
        />
        <TableContent data={courseData} isLoading={isLoading} />
        <Paginations page={currentPage} onPageChange={handlePageChange} />
      </React.Fragment>
    </React.Fragment>
  );
};

export default CourseList;
