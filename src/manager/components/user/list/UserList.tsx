import React from 'react';
import ContentHeader from '../../common/layout/ContentHeader';
import { navIcon } from '../../../assets/icon';
import CustomTable from '../../common/UI/table/CustomTable';
import { Page, RowType, SearchTitle, TableData, UserRowContent } from '../../../types/table';
import { formatDateToKorean } from '../../../../common/utils';
import { users } from '../../../_mock';
import { userListRequest } from '../../../services/api/user';

const page = '사용자 목록 / 관리';
const breadcrumb = {
  homeIcon: navIcon.user,
  breadcrumbTrail: ['사용자 관리', page]
};

const UserList: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [campusId, setCampusId] = React.useState<number | null>(null);
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

  const loadUsers = async (page: number = 0) => {
    setIsLoading(true);
    try {
      //TODO: 실제 데이터 불러오기
      // const response = await userListRequest();
      // const data = response.data;
      const data = users;

      const { content, ...pageInfo } = data;

      setCurrentPage({
        pageNumber: pageInfo.pageNumber,
        pageSize: pageInfo.pageSize,
        totalElements: pageInfo.totalElements,
        totalPages: pageInfo.totalPages,
        last: pageInfo.last
      });

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

      setCampusId(data.campusId);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      // 에러 처리 로직 추가
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadUsers();
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

  const handleApplyFilters = () => {
    loadUsers(0); // 첫 페이지부터 새로운 필터로 데이터 로드

    const queryParams = {
      ...selectedFilters,
      name: searchTerm,
      sort: sortOption
    };
    console.log(queryParams);
  };

  const handlePageChange = (newPage: Page) => {
    setCurrentPage(newPage);
    // loadUsers(newPage.pageNumber); 실제 데이터 시 필요
  };

  return (
    <React.Fragment>
      <ContentHeader breadcrumb={breadcrumb} pageInfo={{ page: '사용자 목록 / 관리' }} />
      <CustomTable
        data={userData}
        searchTitle={SearchTitle.USER}
        open={open}
        setOpen={setOpen}
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
