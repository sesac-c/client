import React from 'react';
import ContentHeader from '../../components/common/layout/ContentHeader';
import CampusList from '../../components/campus/list/CampusList';
import { navIcons } from '../../assets/icon';
import { useCampusListData } from '../../hooks/campus';
import CampusRegisterModal from '../../components/campus/register/CampusRegisterModal';

const page = '캠퍼스 관리';
const breadcrumb = {
  homeIcon: navIcons.campus,
  breadcrumbTrail: [page]
};

const CampusListPage = () => {
  const [open, setOpen] = React.useState(false);
  const { campusSearchTitle, campusData, isLoading, handleAddCampus } = useCampusListData();
  return (
    <React.Fragment>
      {/* 페이지 헤더 */}
      <ContentHeader
        breadcrumb={breadcrumb}
        pageInfo={{ page, register: React.createElement(CampusRegisterModal, { handleClick: handleAddCampus }) }}
      />

      {/* 테이블 */}
      <CampusList
        searchTitle={campusSearchTitle}
        open={open}
        setOpen={setOpen}
        data={campusData}
        isLoading={isLoading}
      />
    </React.Fragment>
  );
};

export default CampusListPage;
