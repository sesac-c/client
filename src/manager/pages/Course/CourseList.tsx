import React from 'react';
import { useCourseListData } from '../../hooks/course';
import CourseList from '../../components/course/list/CourseList';
import ContentHeader from '../../components/common/layout/ContentHeader';
import { navIcons } from '../../assets/icon';
import CourseRegisterModal from '../../components/course/register/CourseRegisterModal';

const page = '강의 관리';
const breadcrumb = {
  homeIcon: navIcons.course,
  breadcrumbTrail: [page]
};
const CourseListPage = () => {
  const [open, setOpen] = React.useState(false);

  const {
    courseSearchTitle,
    selectedFilters,
    sortOption,
    currentPage,
    courseData,
    isLoading,
    handleFilterChange,
    handleSortChange,
    handleSearchChange,
    handleApplyFilters,
    handlePageChange,
    handleAddCourse
  } = useCourseListData();
  return (
    <React.Fragment>
      {/* 페이지 헤더 */}
      <ContentHeader
        breadcrumb={breadcrumb}
        pageInfo={{ page, register: React.createElement(CourseRegisterModal, { handleClick: handleAddCourse }) }}
      />
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
