import React from 'react';
import UserList from '@/components/manager/user/list/UserList';
import ContentHeader from '@/components/manager/layout/ContentHeader';
import { navIcons } from '@/assets/icon';
import { useUserListData } from '@/hooks/manager/user';

const page = '사용자 목록 / 관리';
const breadcrumb = {
  homeIcon: navIcons.user,
  breadcrumbTrail: ['사용자 관리', page]
};
const UserListPage = () => {
  const [open, setOpen] = React.useState(false);
  const {
    userSearchTitle,
    filters,
    selectedFilters,
    sortOption,
    currentPage,
    userData,
    isLoading,
    handleFilterChange,
    handleSortChange,
    handleSearchChange,
    handleApplyFilters,
    handlePageChange
  } = useUserListData();

  return (
    <React.Fragment>
      {/* 페이지 헤더 */}
      <ContentHeader breadcrumb={breadcrumb} pageInfo={{ page: '사용자 목록 / 관리' }} />

      {/* 테이블 */}
      <UserList
        open={open}
        setOpen={setOpen}
        searchTitle={userSearchTitle}
        searchInputProps={{
          searchTitle: userSearchTitle,
          onSearchChange: handleSearchChange
        }}
        filtersProps={{
          searchTitle: userSearchTitle,
          lazyLoadedFilters: filters,
          selectedFilters: selectedFilters,
          onFilterChange: handleFilterChange
        }}
        sortsProps={{
          searchTitle: userSearchTitle,
          sortOption: sortOption,
          onSortChange: handleSortChange
        }}
        onApplyFilters={handleApplyFilters}
        data={userData}
        isLoading={isLoading}
        page={currentPage}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  );
};

export default UserListPage;
