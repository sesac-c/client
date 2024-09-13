import React from 'react';
import ContentHeader from '../../common/layout/ContentHeader';
import { navIcons } from '../../../assets/icon';
import AddIcon from '@mui/icons-material/Add';

const page = '강의 관리';
const breadcrumb = {
  homeIcon: navIcons.course,
  breadcrumbTrail: [page]
};
const button = {
  buttonText: '강의 등록',
  buttonIcon: React.createElement(AddIcon)
};
const CourseList = () => {
  function handleAddCourse() {
    // 강의 추가 요청
  }
  return (
    <ContentHeader breadcrumb={breadcrumb} pageInfo={{ page, button: { ...button, buttonOnclick: handleAddCourse } }} />
  );
};

export default CourseList;
