import { useState } from 'react';
import { useRestaurantListData } from './useRestaurantListData';
import { useRestaurantRegister } from './useRestaurantRegister';
import { getCoordinates } from '../../../common/utils';
import { registerRestaurant } from '../../services/api';
import { confirmAction } from '../../../common/utils';
import { RestaurantRegisterRequest } from '../../types';

export const useRestaurantManagement = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { restaurantSearchTitle, restaurantData, isLoading, handleSearchChange, handleApplyFilters, loadRestaurant } =
    useRestaurantListData();

  const { state, errors, isFormValid, handleChange, validateForm, resetForm } = useRestaurantRegister();

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

  const handleAddRestaurant = async () => {
    if (validateForm()) {
      try {
        const coordinates = await getCoordinates(state.address);

        const restaurantData: RestaurantRegisterRequest = {
          ...state,
          ...coordinates
        };

        await registerRestaurant(restaurantData);

        setModalOpen(false);
        await loadRestaurant({});
      } catch (error) {
        console.error('식당 등록 실패: ', error);
      }
    }
  };

  return {
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
  };
};
