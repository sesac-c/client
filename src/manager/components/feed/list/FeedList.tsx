import React from 'react';
import ContentHeader from '../../common/layout/ContentHeader';
import { navIcons } from '../../../assets/icon';
import {
  Page,
  RowType,
  SearchTitle,
  TableData,
  PostRowContent,
  NoticeRowContent,
  FeedListRequest
} from '../../../types';
import { formatDateToKorean } from '../../../../common/utils';
import MobileSearch from '../../common/UI/table/mobile/MobileSearch';
import { SearchAndFilter } from '../../common/UI/table/TableFilters';
import TableContent from '../../common/UI/table/TableContent';
import Paginations from '../../common/UI/table/Paginations';
import {
  allPostListRequest,
  campusPostListRequest,
  allNoticeListRequest,
  groupNoticeListRequest
} from '../../../services/api';
interface FeedListProps {
  feedType: 'post' | 'notice';
  category: 'campus' | 'all' | 'group';
}

const getFeedInfo = ({ feedType, category }: FeedListProps) => {
  switch (`${feedType}-${category}`) {
    case 'post-campus':
      return {
        page: '캠퍼스 게시글 관리',
        rowType: RowType.POST,
        requestFunc: campusPostListRequest,
        searchTitle: SearchTitle.POST
      };
    case 'post-all':
      return {
        page: '전체 게시글 관리',
        rowType: RowType.POST,
        requestFunc: allPostListRequest,
        searchTitle: SearchTitle.POST
      };
    case 'notice-all':
      return {
        page: '전체 공지 관리',
        rowType: RowType.NOTICE,
        requestFunc: allNoticeListRequest,
        searchTitle: SearchTitle.NOTICE
      };
    case 'notice-group':
      return {
        page: '그룹 공지 관리',
        rowType: RowType.NOTICE,
        requestFunc: groupNoticeListRequest,
        searchTitle: SearchTitle.NOTICE
      };
    default:
      throw new Error('Invalid feedType and category combination');
  }
};
const FeedList: React.FC<FeedListProps> = feedInfo => {
  const { page, rowType, requestFunc, searchTitle } = getFeedInfo(feedInfo);

  const breadcrumb = {
    homeIcon: navIcons.feed,
    breadcrumbTrail: ['피드 관리', page]
  };

  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState<Page>({
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    last: false
  });
  const [feedData, setFeedData] = React.useState<TableData>({
    type: rowType,
    contents: []
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState<string | undefined>(undefined);

  const loadFeed = async (params: FeedListRequest) => {
    console.log(params);
    setIsLoading(true);
    try {
      const response = await requestFunc(params);
      const data = response.data;
      const { content, ...pageInfo } = data;
      const { pageNumber, pageSize, totalElements, totalPages, last } = pageInfo;

      setCurrentPage({ pageNumber, pageSize, totalElements, totalPages, last });

      setFeedData({
        type: rowType,
        contents: content.map((item: any) => ({
          id: item.id,
          writer: item.writer,
          title: item.title,
          content: item.content,
          createdAt: formatDateToKorean(item.createdAt)
        }))
      });
    } catch (error) {
      console.error('Failed to fetch feed:', error);
      // Add error handling logic here
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadFeed({ page: 0 });
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  function getQueryParams(page: number) {
    return {
      page,
      keyword: searchTerm
    };
  }

  const handleApplyFilters = () => {
    loadFeed(getQueryParams(currentPage.pageNumber));
  };

  const handlePageChange = (newPage: Page) => {
    setCurrentPage(newPage);
    loadFeed(getQueryParams(newPage.pageNumber));
  };

  return (
    <React.Fragment>
      <ContentHeader breadcrumb={breadcrumb} pageInfo={{ page }} />
      <React.Fragment>
        <MobileSearch open={open} setOpen={setOpen} searchTitle={searchTitle} />
        <SearchAndFilter
          searchInputProps={{
            searchTitle: searchTitle,
            onSearchChange: handleSearchChange
          }}
          onApplyFilters={handleApplyFilters}
        />
        <TableContent data={feedData} isLoading={isLoading} />
        <Paginations page={currentPage} onPageChange={handlePageChange} />
      </React.Fragment>
    </React.Fragment>
  );
};

export const CampusPostList: React.FC = () => {
  return <FeedList feedType='post' category='campus' />;
};

export const AllPostList: React.FC = () => {
  return <FeedList feedType='post' category='all' />;
};

export const AllNoticeList: React.FC = () => {
  return <FeedList feedType='notice' category='all' />;
};

export const GroupNoticeList: React.FC = () => {
  return <FeedList feedType='notice' category='group' />;
};
