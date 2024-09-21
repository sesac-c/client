import { navIcons } from '../../assets/icon';
import AddressRegistration from '../../components/restaurant/register/AddressRegistration';
import React from 'react';
import ContentHeader from '../../components/common/layout/ContentHeader';
import { Divider } from '@mui/joy';

const page = '식당 등록';
const breadcrumb = {
  homeIcon: navIcons.group,
  breadcrumbTrail: ['그룹 관리', '식당 목록 / 관리', page]
};
const RestaurantRegisterPage: React.FC = () => {
  return (
    <React.Fragment>
      {/* 페이지 헤더 */}
      <ContentHeader breadcrumb={breadcrumb} pageInfo={{ page }} />
      <Divider />
      <AddressRegistration />
    </React.Fragment>
  );
};
export default RestaurantRegisterPage;
