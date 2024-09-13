import React from 'react';
import ContentHeader from '../../common/layout/ContentHeader';
import { navIcons } from '../../../assets/icon';
import CustomTable from '../../common/UI/table/CustomTable';
import {
  FilterConfig,
  FILTERS,
  FilterSortGroup,
  Page,
  RowType,
  SearchTitle,
  TableData,
  UserRowContent
} from '../../../types';
import { formatDateToKorean } from '../../../../common/utils';
import { courseOptionsRequest, userListRequest } from '../../../services/api/user';
import { transformCourseOptions } from '../../../utils';

const page = '사용자 목록 / 관리';
const breadcrumb = {
  homeIcon: navIcons.user,
  breadcrumbTrail: ['사용자 관리', page]
};

const UserList: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [campusId, setCampusId] = React.useState<number | null>(null);
  const [filters, setFilters] = React.useState<FilterSortGroup[]>(FILTERS[SearchTitle.USER]);

  const [selectedFilters, setSelectedFilters] = React.useState<Record<string, any>>({});
  const [sortOption, setSortOption] = React.useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = React.useState<Page>({
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    last: false
  });
  const [userData, setUserData] = React.useState<TableData>({
    type: RowType.USER,
    contents: []
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState<string | undefined>(undefined);

  const loadUsers = async (params: {}) => {
    console.log(params);
    setIsLoading(true);
    try {
      const response = await userListRequest(params);
      const data = response.data;
      const campusId = data.campusId;

      const { content, ...pageInfo } = data;
      const { pageNumber, pageSize, totalElements, totalPages, last } = pageInfo;

      setCurrentPage({ pageNumber, pageSize, totalElements, totalPages, last });
      setCampusId(campusId);

      setUserData({
        type: RowType.USER,
        contents: content.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          course: user.course,
          status: user.status,
          createdAt: formatDateToKorean(user.createdAt)
        })) as UserRowContent[]
      });

      return campusId;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      // 에러 처리 로직 추가
    } finally {
      setIsLoading(false);
    }
  };

  const loadCourseOptions = async (campusId: number) => {
    try {
      const coursesResponse = await courseOptionsRequest(campusId);
      const transformedOptions = transformCourseOptions(coursesResponse);

      setFilters(prevFilters =>
        prevFilters.map(filter => (filter.name === 'courseId' ? { ...filter, options: transformedOptions } : filter))
      );
    } catch (error) {
      console.error('Failed to load course options:', error);
      // 에러 처리 로직
    }
  };

  React.useEffect(() => {
    const initializeData = async () => {
      try {
        const campusId = await loadUsers({ page: currentPage.pageNumber });
        if (campusId !== undefined) {
          await loadCourseOptions(campusId);
        } else {
          console.error('Failed to get campusId');
          // campusId를 받지 못했을 때의 에러 처리
        }
      } catch (error) {
        console.error('Error initializing data:', error);
        // 전체 초기화 과정의 에러 처리
      }
    };

    initializeData();
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
    loadUsers(getQueryParams(currentPage.pageNumber));
  };

  const handlePageChange = (newPage: Page) => {
    setCurrentPage(newPage);
    loadUsers(getQueryParams(newPage.pageNumber));
  };

  return (
    <React.Fragment>
      <ContentHeader breadcrumb={breadcrumb} pageInfo={{ page: '사용자 목록 / 관리' }} />
      <CustomTable
        data={userData}
        searchTitle={SearchTitle.USER}
        open={open}
        setOpen={setOpen}
        lazyLoadedFilters={filters}
        selectedFilters={selectedFilters}
        sortOption={sortOption}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
        onApplyFilters={handleApplyFilters}
        page={currentPage}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </React.Fragment>
  );
};

export default UserList;