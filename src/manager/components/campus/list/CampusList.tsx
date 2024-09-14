import React from 'react';
import ContentHeader from '../../common/layout/ContentHeader';
import { addIcon, navIcons } from '../../../assets/icon';
import { CampusRowContent, Page, RowType, SearchTitle, TableData } from '../../../types';
import MobileSearch from '../../common/UI/table/mobile/MobileSearch';
import TableContent from '../../common/UI/table/TableContent';
import { Divider } from '@mui/material';
import { campusListRequest } from '../../../services/api';

const page = '캠퍼스 관리';
const breadcrumb = {
  homeIcon: navIcons.campus,
  breadcrumbTrail: [page]
};
const button = {
  buttonText: '캠퍼스 등록',
  buttonIcon: addIcon
};
const CampusList = () => {
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState<Page>({
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    last: false
  });
  const [campusData, setCampusData] = React.useState<TableData>({
    type: RowType.CAMPUS,
    contents: []
  });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadCampuses = async () => {
      setIsLoading(true);
      try {
        const response = await campusListRequest();
        const data = response.data;
        setCampusData({
          type: RowType.CAMPUS,
          contents: data.map((campus: any) => ({
            id: campus.id,
            name: campus.name + ' 캠퍼스'
          })) as CampusRowContent[]
        });
      } catch (error) {
        console.error('Failed to fetch campuses:', error);
        // 에러 처리 로직 추가
      } finally {
        setIsLoading(false);
      }
    };
    loadCampuses();
  }, []);
  function handleAddCampus() {
    // 캠퍼스 추가 요청
  }
  return (
    <React.Fragment>
      {/* 페이지 헤더 */}
      <ContentHeader
        breadcrumb={breadcrumb}
        pageInfo={{ page, button: { ...button, buttonOnclick: handleAddCampus } }}
      />

      {/* 테이블 */}
      <React.Fragment>
        <MobileSearch
          open={open}
          setOpen={setOpen}
          searchTitle={SearchTitle.CAMPUS}
          // onSearchChange={onSearchChange}
        />
        <Divider
          sx={{
            margin: '10px 0 20px'
          }}
        />
        <TableContent data={campusData} isLoading={isLoading} />
      </React.Fragment>
    </React.Fragment>
  );
};

export default CampusList;
