import { useState } from 'react';
import { useCourseListData } from './useCourseListData';
import { useCourseRegister } from './useCourseRegister';
import { registerCourse } from '../../services/api';
import { confirmAction } from '../../../common/utils';
import { CourseRegisterRequest } from '../../types';

export const useCourseManagement = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    courseSearchTitle,
    loadCourse,
    courseData,
    isLoading,
    currentPage,
    filters,
    selectedFilters,
    sortOption,
    searchTerm,
    handleFilterChange,
    handleSortChange,
    handleSearchChange,
    handleApplyFilters,
    handlePageChange
  } = useCourseListData();

  const { state, errors, isFormValid, handleChange, validateForm, resetForm } = useCourseRegister();

  const handleOpenModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const handleCloseModal = async () => {
    const confirm = await confirmAction('등록을 취소하시겠습니까?\n입력된 정보는 저장되지 않습니다.');
    if (confirm) {
      setModalOpen(false);
      resetForm();
    }
  };

  const handleAddCourse = async () => {
    if (validateForm()) {
      try {
        const courseData: CourseRegisterRequest = {
          ...state
        };

        await registerCourse(courseData);

        setModalOpen(false);
        await loadCourse({ page: 0 });
      } catch (error) {
        console.error('강좌 등록 실패: ', error);
      }
    }
  };

  return {
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
  };
};
