import React from 'react';
import RestaurantList from '../../components/restaurant/list/RestaurantList';
import { navIcons } from '../../assets/icon';
import { useRestaurantListData } from '../../hooks/restaurant';
import ContentHeader from '../../components/common/layout/ContentHeader';
import RestaurantRegisterModal from '../../components/restaurant/register/RestaurantRegisterModal';

const page = '식당 목록 / 관리';
const breadcrumb = {
  homeIcon: navIcons.group,
  breadcrumbTrail: ['그룹 관리', page]
};

const RestaurantListPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const {
    restaurantSearchTitle,
    restaurantData,
    isLoading,
    handleSearchChange,
    handleApplyFilters,
    handleAddRestaurant
  } = useRestaurantListData();
  return (
    <React.Fragment>
      {/* 페이지 헤더 */}
      <ContentHeader
        breadcrumb={breadcrumb}
        pageInfo={{
          page,
          register: React.createElement(RestaurantRegisterModal, { handleClick: handleAddRestaurant })
        }}
      />

      {/* 테이블 */}
      <RestaurantList
        searchTitle={restaurantSearchTitle}
        open={open}
        setOpen={setOpen}
        searchInputProps={{
          searchTitle: restaurantSearchTitle,
          onSearchChange: handleSearchChange
        }}
        onApplyFilters={handleApplyFilters}
        data={restaurantData}
        isLoading={isLoading}
      />
    </React.Fragment>
  );
};

export default RestaurantListPage;
