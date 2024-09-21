import React from 'react';
import FeedList from '../../../components/feed/list/FeedList';
import { navIcons } from '../../../assets/icon';
import ContentHeader from '../../../components/common/layout/ContentHeader';
import { useFeedListData } from '../../../hooks/feed';
import { RowType } from '../../../types';
import { allNoticeListRequest } from '../../../services/api';
import NoticeRegisterModal from '../../../components/feed/register/NoticeRegisterModal';

const page = '전체 공지 관리';
const breadcrumb = {
  homeIcon: navIcons.feed,
  breadcrumbTrail: ['피드 관리', page]
};
const AllNoticeListPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  function handleAddAllNotice() {
    // 전체 공지 추가 로직
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
    requestFunc: allNoticeListRequest
  });

  return (
    <React.Fragment>
      {/* 페이지 헤더 */}
      <ContentHeader
        breadcrumb={breadcrumb}
        pageInfo={{
          page,
          register: React.createElement(NoticeRegisterModal, {
            handleClick: handleAddAllNotice,
            type: '전체'
          })
        }}
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

export default AllNoticeListPage;
