import { useState } from 'react';
import { useCampusListData } from './useCampusListData';
import { useCampusRegister } from './useCampusRegister';
import { getCoordinates } from '../../../common/utils';
import { registerCampus } from '../../services/api';
import { confirmAction } from '../../../common/utils';
import { CampusRegisterRequest } from '../../types';

export const useCampusManagement = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { campusSearchTitle, campusData, isLoading, loadCampus } = useCampusListData();

  const { state, errors, isFormValid, handleChange, validateForm, resetForm } = useCampusRegister();

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

  const handleAddCampus = async () => {
    if (validateForm()) {
      try {
        const coordinates = await getCoordinates(state.address);

        const campusData: CampusRegisterRequest = {
          ...state,
          ...coordinates
        };

        await registerCampus(campusData);

        setModalOpen(false);
        await loadCampus();
      } catch (error) {
        console.error('캠퍼스 등록 실패: ', error);
      }
    }
  };

  return {
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
  };
};
