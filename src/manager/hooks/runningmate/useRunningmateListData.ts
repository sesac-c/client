import React from 'react';
import {
  FilterSortGroup,
  Page,
  RowType,
  RunningmateListRequest,
  SearchTitle,
  TableData,
  RunningmateRowContent
} from '../../types';
import { runningmateListRequest } from '../../services/api/runningmate';
import { FILTERS } from '../../types';

export function useRunningmateListData() {
  const runningmateSearchTitle = SearchTitle.RUNNINGMATE;
  const [filters, setFilters] = React.useState<FilterSortGroup[]>(FILTERS[runningmateSearchTitle]);

  const [selectedFilters, setSelectedFilters] = React.useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = React.useState<Page>({
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    last: false
  });
  const [runningmateData, setRunningmateData] = React.useState<TableData>({
    type: RowType.RUNNINGMATE,
    contents: []
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState<string | undefined>(undefined);

  const loadRunningmates = async (params: RunningmateListRequest) => {
    console.log(params);
    setIsLoading(true);
    try {
      const response = await runningmateListRequest(params);
      const data = response.data;

      const { content, ...pageInfo } = data;
      const { pageNumber, pageSize, totalElements, totalPages, last } = pageInfo;

      setCurrentPage({ pageNumber, pageSize, totalElements, totalPages, last });

      setRunningmateData({
        type: RowType.RUNNINGMATE,
        contents: content.map((runningmate: any) => ({
          id: runningmate.id,
          name: runningmate.name,
          subject: runningmate.name,
          goal: runningmate.goal,
          course: runningmate.course
        })) as RunningmateRowContent[]
      });
    } catch (error) {
      console.error('Failed to fetch runningmates:', error);
      // 에러 처리 로직 추가
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadRunningmates({ page: 0 });
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  function getQueryParams(page: number) {
    return {
      page,
      ...selectedFilters,
      name: searchTerm
    };
  }

  const handleApplyFilters = () => {
    loadRunningmates(getQueryParams(currentPage.pageNumber));
  };

  const handlePageChange = (newPage: Page) => {
    setCurrentPage(newPage);
    loadRunningmates(getQueryParams(newPage.pageNumber));
  };

  return {
    runningmateSearchTitle,
    filters,
    setFilters,
    selectedFilters,
    setSelectedFilters,
    currentPage,
    runningmateData,
    isLoading,
    handleSearchChange,
    handleApplyFilters,
    handlePageChange
  };
}
