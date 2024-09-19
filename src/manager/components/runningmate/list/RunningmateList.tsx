import React from 'react';
import ContentHeader from '../../common/layout/ContentHeader';
import { navIcons } from '../../../assets/icon';
import {
  FilterConfig,
  FILTERS,
  FilterSortGroup,
  Page,
  RowType,
  RunningmateListRequest,
  SearchTitle,
  TableData,
  RunningmateRowContent
} from '../../../types';
import { formatDateToKorean } from '../../../../common/utils';
import { runningmateListRequest } from '../../../services/api/runningmate';
import { transformCourseOptions } from '../../../utils';
import MobileSearch from '../../common/UI/table/mobile/MobileSearch';
import { SearchAndFilter } from '../../common/UI/table/TableFilters';
import TableContent from '../../common/UI/table/TableContent';
import Paginations from '../../common/UI/table/Paginations';
import AddIcon from '@mui/icons-material/Add';

const page = '러닝메이트 목록 / 관리';
const breadcrumb = {
  homeIcon: navIcons.runningmate,
  breadcrumbTrail: ['러닝메이트 관리', page]
};
const button = {
  buttonText: '러닝메이트 등록',
  buttonIcon: React.createElement(AddIcon)
};
const RunningmateList = () => {
  const [open, setOpen] = React.useState(false);
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
  const [runningmateData, setUserData] = React.useState<TableData>({
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

      setUserData({
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
      <React.Fragment>
        <MobileSearch
          open={open}
          setOpen={setOpen}
          searchTitle={runningmateSearchTitle}
          // onSearchChange={onSearchChange}
        />
        <SearchAndFilter
          // search
          searchInputProps={{
            searchTitle: runningmateSearchTitle,
            onSearchChange: handleSearchChange
          }}
          onApplyFilters={handleApplyFilters}
        />
        <TableContent data={runningmateData} isLoading={isLoading} />
        <Paginations page={currentPage} onPageChange={handlePageChange} />
      </React.Fragment>
    </React.Fragment>
  );
};

export default RunningmateList;
