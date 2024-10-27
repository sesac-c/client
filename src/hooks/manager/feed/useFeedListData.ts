import React, { useState } from 'react';
import { formatDateToKorean } from '@/utils/formatter';
import { Page, RowType, SearchTitle, TableData, FeedListRequest } from '@/types';
import useNoticeStore from '@/stores/writeNoticeStore';

interface UseFeedListDataProps {
  rowType: RowType;
  requestFunc: (params: FeedListRequest) => Promise<any>;
}

function getFeedSearchTitle(rowType: RowType) {
  switch (rowType) {
    case RowType.NOTICE:
      return SearchTitle.NOTICE;
    case RowType.POST:
      return SearchTitle.POST;
    default:
      return SearchTitle.POST;
  }
}
export const useFeedListData = ({ rowType, requestFunc }: UseFeedListDataProps) => {
  const { isNoticeUpdate, setIsNoticeUpdate } = useNoticeStore();
  const [open, setOpen] = useState(false);
  const feedSearchTitle = getFeedSearchTitle(rowType);
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
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadFeed({ page: 0 });
  }, []);

  React.useEffect(() => {
    if (isNoticeUpdate) {
      loadFeed({ page: 0 });
      setIsNoticeUpdate(false);
    }
  }, [isNoticeUpdate]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const getQueryParams = (page: number) => {
    return {
      page,
      keyword: searchTerm
    };
  };

  const handleApplyFilters = () => {
    loadFeed(getQueryParams(currentPage.pageNumber));
  };

  const handlePageChange = (newPage: Page) => {
    setCurrentPage(newPage);
    loadFeed(getQueryParams(newPage.pageNumber));
  };

  return {
    open,
    setOpen,
    feedSearchTitle,
    currentPage,
    feedData,
    isLoading,
    handleSearchChange,
    handleApplyFilters,
    handlePageChange,
    loadFeed
  };
};
