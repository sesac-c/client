import React from 'react';
import ContentHeader from '../../common/layout/ContentHeader';
import { navIcon } from '../../../assets/icon';
import AddIcon from '@mui/icons-material/Add';

const page = '캠퍼스 관리';
const breadcrumb = {
  homeIcon: navIcon.campus,
  breadcrumbTrail: [page]
};
const button = {
  buttonText: '캠퍼스 등록',
  buttonIcon: React.createElement(AddIcon)
};
const CampusList = () => {
  function handleAddCampus() {
    // 캠퍼스 추가 요청
  }
  return (
    <ContentHeader breadcrumb={breadcrumb} pageInfo={{ page, button: { ...button, buttonOnclick: handleAddCampus } }} />
  );
};

export default CampusList;
