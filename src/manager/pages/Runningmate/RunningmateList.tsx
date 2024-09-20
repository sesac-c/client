import React from 'react';
import RunningmateList from '../../components/runningmate/list/RunningmateList';
import { useRunningmateListData } from '../../hooks/runningmate';
import ContentHeader from '../../components/common/layout/ContentHeader';
import { navIcons, addIcon } from '../../assets/icon';

const page = '러닝메이트 목록 / 관리';
const breadcrumb = {
  homeIcon: navIcons.runningmate,
  breadcrumbTrail: ['러닝메이트 관리', page]
};
const button = {
  buttonText: '러닝메이트 등록',
  buttonIcon: addIcon
};

const RunningmateListPage = () => {
  const [open, setOpen] = React.useState(false);
  const {
    runningmateSearchTitle,
    currentPage,
    runningmateData,
    isLoading,
    handleSearchChange,
    handleApplyFilters,
    handlePageChange
  } = useRunningmateListData();

  function handleAddRunningmate() {
    // 러닝메이트 추가 요청
  }
  return (
    <React.Fragment>
      {/* 페이지 헤더 */}
      <ContentHeader
        breadcrumb={breadcrumb}
        pageInfo={{ page, button: { ...button, buttonOnclick: handleAddRunningmate } }}
      />

      {/* 테이블 */}
      <RunningmateList
        open={open}
        setOpen={setOpen}
        searchTitle={runningmateSearchTitle}
        searchInputProps={{
          onSearchChange: handleSearchChange,
          searchTitle: runningmateSearchTitle
        }}
        onApplyFilters={handleApplyFilters}
        data={runningmateData}
        isLoading={isLoading}
        page={currentPage}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  );
};

export default RunningmateListPage;
