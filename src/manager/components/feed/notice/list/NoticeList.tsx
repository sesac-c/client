import React from 'react';
import ContentHeader from '../../../common/layout/ContentHeader';
import { navIcons } from '../../../../assets/icon';
import AddIcon from '@mui/icons-material/Add';

const page = '공지 관리';
const breadcrumb = {
  homeIcon: navIcons.feed,
  breadcrumbTrail: ['피드 관리', page]
};
const button = {
  buttonText: '공지 등록',
  buttonIcon: React.createElement(AddIcon)
};
const NoticeList = () => {
  function handleAddNotice() {
    // 공지 추가 요청
  }
  return (
    <ContentHeader breadcrumb={breadcrumb} pageInfo={{ page, button: { ...button, buttonOnclick: handleAddNotice } }} />
  );
};

export default NoticeList;
