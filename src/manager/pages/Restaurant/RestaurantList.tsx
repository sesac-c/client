import React from 'react';
import RestaurantList from '../../components/restaurant/list/RestaurantList';
import { navIcons } from '../../assets/icon';
import { useRestaurantManagement } from '../../hooks/restaurant';
import ContentHeader from '../../components/common/layout/ContentHeader';
import RestaurantRegisterModal from '../../components/restaurant/register/RestaurantRegisterModal';

const page = '식당 목록 / 관리';
const breadcrumb = {
  homeIcon: navIcons.group,
  breadcrumbTrail: ['그룹 관리', page]
};

const RestaurantListPage: React.FC = () => {
  const {
    open,
    setOpen,
    modalOpen,
    restaurantSearchTitle,
    restaurantData,
    isLoading,
    handleSearchChange,
    handleApplyFilters,
    state,
    errors,
    isFormValid,
    handleChange,
    handleOpenModal,
    handleCloseModal,
    handleAddRestaurant
  } = useRestaurantManagement();

  // Register Modal
  const registerModal = (
    <RestaurantRegisterModal
      open={modalOpen}
      onOpen={handleOpenModal}
      onClose={handleCloseModal}
      state={state}
      errors={errors}
      isFormValid={isFormValid}
      onChange={handleChange}
      onSubmit={handleAddRestaurant}
    />
  );

  return (
    <React.Fragment>
      {/* 페이지 헤더 */}
      <ContentHeader
        breadcrumb={breadcrumb}
        pageInfo={{
          page,
          register: registerModal
        }}
      />

      {/* 테이블 */}
      <RestaurantList
        open={open}
        setOpen={setOpen}
        searchTitle={restaurantSearchTitle}
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
