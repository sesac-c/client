import React from 'react';
import RunningmateList from '../../components/runningmate/list/RunningmateList';
import { useRunningmateManagement } from '../../hooks/runningmate';
import ContentHeader from '../../components/common/layout/ContentHeader';
import { navIcons } from '../../assets/icon';
import RunningmateRegisterModal from '../../components/runningmate/register/RunningmateRegisterModal';

const page = '러닝메이트 목록 / 관리';
const breadcrumb = {
  homeIcon: navIcons.group,
  breadcrumbTrail: ['그룹 관리', page]
};

const RunningmateListPage = () => {
  const [open, setOpen] = React.useState(false);
  const {
    modalOpen,
    runningmateSearchTitle,
    filters,
    setFilters,
    selectedFilters,
    setSelectedFilters,
    currentPage,
    runningmateData,
    isLoading,
    state,
    errors,
    isFormValid,
    handleChange,
    handleSearchChange,
    handleApplyFilters,
    handlePageChange,
    handleOpenModal,
    handleCloseModal,
    handleAddRunningmate
  } = useRunningmateManagement();

  // Register Modal
  const registerModal = (
    <RunningmateRegisterModal
      open={modalOpen}
      onOpen={handleOpenModal}
      onClose={handleCloseModal}
      state={state}
      errors={errors}
      isFormValid={isFormValid}
      onChange={handleChange}
      onSubmit={handleAddRunningmate}
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
      <RunningmateList
        open={open}
        setOpen={setOpen}
        searchTitle={runningmateSearchTitle}
        searchInputProps={{
          onSearchChange: handleSearchChange,
          searchTitle: runningmateSearchTitle
        }}
        onApplyFilters={handleApplyFilters}
        data={runningmateData}
        isLoading={isLoading}
        page={currentPage}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  );
};

export default RunningmateListPage;
