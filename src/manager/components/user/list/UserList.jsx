import React from 'react';
import ContentHeader from '../../common/layout/ContentHeader';
import { navIcon } from '../../../assets/icon';

const page = '사용자 목록 / 관리';
const breadcrumb = {
  homeIcon: navIcon.user,
  breadcrumbTrail: ['사용자 관리', page]
};
const UserList = () => {
  return <ContentHeader breadcrumb={breadcrumb} pageInfo={{ page }} />;
};

export default UserList;
