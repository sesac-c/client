import React from 'react';
import FeedList from '@/components/manager/feed/list/FeedList';
import { addIcon, navIcons } from '@/assets/icon';
import ContentHeader from '@/components/manager/layout/ContentHeader';
import { useFeedListData } from '@/hooks/manager/feed';
import { RowType } from '@/types';
import { allNoticeListRequest } from '@/services/api/manager';
import { useModal } from '@/hooks';
import WriteNoticeModal from '@/components/manager/feed/register/NoticeRegisterModal';
import { Button } from '@mui/joy';

const page = '전체 공지 관리';
const breadcrumb = {
  homeIcon: navIcons.feed,
  breadcrumbTrail: ['피드 관리', page]
};
const AllNoticeListPage: React.FC = () => {
  const { openModal, closeModal } = useModal(() => <WriteNoticeModal onClose={closeModal} type='all' />);

  // Register Modal
  const registerModal = (
    <Button onClick={openModal} variant='outlined' color='neutral' startDecorator={addIcon} size='sm'>
      공지 등록
    </Button>
  );
  const {
    open,
    setOpen,
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
          register: registerModal
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
