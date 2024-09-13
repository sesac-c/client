import React from 'react';
import ContentHeader from '../../common/layout/ContentHeader';
import { navIcons } from '../../../assets/icon';
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
  function handleAddRunningmate() {
    // 러닝메이트 추가 요청
  }
  return (
    <ContentHeader
      breadcrumb={breadcrumb}
      pageInfo={{ page, button: { ...button, buttonOnclick: handleAddRunningmate } }}
    />
  );
};

export default RunningmateList;
