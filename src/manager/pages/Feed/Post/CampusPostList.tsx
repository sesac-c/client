import React from 'react';
import FeedList from '../../../components/feed/list/FeedList';
import { navIcons } from '../../../assets/icon';
import ContentHeader from '../../../components/common/layout/ContentHeader';
import { useFeedListData } from '../../../hooks/feed';
import { RowType } from '../../../types';
import { campusPostListRequest } from '../../../services/api';

const page = '캠퍼스 게시글 관리';
const breadcrumb = {
  homeIcon: navIcons.feed,
  breadcrumbTrail: ['피드 관리', page]
};

const CampusPostListPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const {
    feedSearchTitle,
    currentPage,
    feedData,
    isLoading,
    handleSearchChange,
    handleApplyFilters,
    handlePageChange
  } = useFeedListData({
    rowType: RowType.POST,
    requestFunc: campusPostListRequest
  });

  return (
    <React.Fragment>
      {/* 페이지 헤더 */}
      <ContentHeader breadcrumb={breadcrumb} pageInfo={{ page }} />

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

export default CampusPostListPage;
