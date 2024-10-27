import React from 'react';
import ContentHeader from '@/components/manager/layout/ContentHeader';
import CampusList from '@/components/manager/campus/list/CampusList';
import { navIcons } from '@/assets/icon';
import { useCampusManagement } from '@/hooks/manager/campus';
import CampusRegisterModal from '@/components/manager/campus/register/CampusRegisterModal';

const page = '캠퍼스 관리';
const breadcrumb = {
  homeIcon: navIcons.campus,
  breadcrumbTrail: [page]
};

const CampusListPage = () => {
  const {
    open,
    setOpen,
    modalOpen,
    campusSearchTitle,
    campusData,
    isLoading,
    state,
    errors,
    isFormValid,
    handleChange,
    handleOpenModal,
    handleCloseModal,
    handleAddCampus
  } = useCampusManagement();

  // Register Modal
  const registerModal = (
    <CampusRegisterModal
      open={modalOpen}
      onOpen={handleOpenModal}
      onClose={handleCloseModal}
      state={state}
      errors={errors}
      isFormValid={isFormValid}
      onChange={handleChange}
      onSubmit={handleAddCampus}
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
