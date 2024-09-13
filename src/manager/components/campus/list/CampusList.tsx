import React from 'react';
import ContentHeader from '../../common/layout/ContentHeader';
import { navIcons, addIcon } from '../../../assets/icon';

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
  function handleAddCampus() {
    // 캠퍼스 추가 요청
  }
  return (
    <ContentHeader breadcrumb={breadcrumb} pageInfo={{ page, button: { ...button, buttonOnclick: handleAddCampus } }} />
  );
};

export default CampusList;
