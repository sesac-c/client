import React from 'react';
import { useCourseManagement } from '@/hooks/manager/course';
import CourseList from '@/components/manager/course/list/CourseList';
import ContentHeader from '@/components/manager/layout/ContentHeader';
import { navIcons } from '@/assets/icon';
import CourseRegisterModal from '@/components/manager/course/register/CourseRegisterModal';

const page = '강의 관리';
const breadcrumb = {
  homeIcon: navIcons.course,
  breadcrumbTrail: [page]
};
const CourseListPage = () => {
  const {
    courseSearchTitle,
    open,
    setOpen,
    modalOpen,
    courseData,
    isLoading,
    currentPage,
    filters,
    selectedFilters,
    sortOption,
    searchTerm,
    state,
    errors,
    isFormValid,
    handleFilterChange,
    handleSortChange,
    handleSearchChange,
    handleApplyFilters,
    handlePageChange,
    handleChange,
    handleOpenModal,
    handleCloseModal,
    handleAddCourse,
    loadCourse
  } = useCourseManagement();

  // Register Modal
  const registerModal = (
    <CourseRegisterModal
      open={modalOpen}
      onOpen={handleOpenModal}
      onClose={handleCloseModal}
      state={state}
      errors={errors}
      isFormValid={isFormValid}
      onChange={handleChange}
      onSubmit={handleAddCourse}
    />
  );
  return (
    <React.Fragment>
      {/* 페이지 헤더 */}
      <ContentHeader breadcrumb={breadcrumb} pageInfo={{ page, register: registerModal }} />
      {/* 테이블 */}
      <CourseList
        open={open}
        setOpen={setOpen}
        searchTitle={courseSearchTitle}
        searchInputProps={{
          searchTitle: courseSearchTitle,
          onSearchChange: handleSearchChange
        }}
        filtersProps={{
          searchTitle: courseSearchTitle,
          selectedFilters: selectedFilters,
          onFilterChange: handleFilterChange
        }}
        sortsProps={{
          searchTitle: courseSearchTitle,
          sortOption: sortOption,
          onSortChange: handleSortChange
        }}
        onApplyFilters={handleApplyFilters}
        data={courseData}
        isLoading={isLoading}
        page={currentPage}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  );
};

export default CourseListPage;
