import React from 'react';
import FeedList from '../../../components/feed/list/FeedList';
import { navIcons, addIcon } from '../../../assets/icon';
import ContentHeader from '../../../components/common/layout/ContentHeader';
import { useFeedListData } from '../../../hooks/feed';
import { RowType } from '../../../types';
import { groupNoticeListRequest } from '../../../services/api';

const page = '그룹 공지 관리';
const breadcrumb = {
  homeIcon: navIcons.feed,
  breadcrumbTrail: ['피드 관리', page]
};
const button = {
  buttonText: '그룹 공지 등록',
  buttonIcon: addIcon
};
const GroupNoticeListPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  function handleAddGroupNotice() {
    // 그룹 공지 추가 로직
  }
  const {
    feedSearchTitle,
    currentPage,
    feedData,
    isLoading,
    handleSearchChange,
    handleApplyFilters,
    handlePageChange
  } = useFeedListData({
    rowType: RowType.NOTICE,
    requestFunc: groupNoticeListRequest
  });

  return (
    <React.Fragment>
      {/* 페이지 헤더 */}
      <ContentHeader
        breadcrumb={breadcrumb}
        pageInfo={{ page, button: { ...button, buttonOnclick: handleAddGroupNotice } }}
      />

      {/* 테이블 */}
      <FeedList
        searchTitle={feedSearchTitle}
        open={open}
        setOpen={setOpen}
        searchInputProps={{
          searchTitle: feedSearchTitle,
          onSearchChange: handleSearchChange
        }}
        onApplyFilters={handleApplyFilters}
        data={feedData}
        isLoading={isLoading}
        page={currentPage}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  );
};

export default GroupNoticeListPage;
