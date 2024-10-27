import { useState } from 'react';
import { useRunningmateListData } from './useRunningmateListData';
import { useRunningmateRegister } from './useRunningmateRegister';
import { registerRunningmate } from '@/services/api/manager';
import { confirmAction } from '@/utils/confirmation';
import { RunningmateRegisterRequest } from '@/types';

export const useRunningmateManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    runningmateSearchTitle,
    filters,
    setFilters,
    selectedFilters,
    setSelectedFilters,
    currentPage,
    runningmateData,
    isLoading,
    handleSearchChange,
    handleApplyFilters,
    handlePageChange
  } = useRunningmateListData();

  const { state, errors, isFormValid, handleChange, validateForm, resetForm } = useRunningmateRegister();

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

  const handleAddRunningmate = async () => {
    if (validateForm()) {
      try {
        const runningmateData: RunningmateRegisterRequest = {
          ...state
        };

        await registerRunningmate(runningmateData);

        setModalOpen(false);
        await handleApplyFilters();
      } catch (error) {
        console.error('러닝메이트 등록 실패: ', error);
      }
    }
  };

  return {
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
  };
};
