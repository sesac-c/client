import { MENU_LIST_API_URL, RESTAURANT_DETAIL_API_URL, RESTAURANT_LIST_API_URL } from '@/common/constants';
import { RouteBaseError } from '@/common/types';
import { RestaurantType } from '@/user/type';
import axios, { AxiosError } from 'axios';

export const getRestaurants = async (restaurantType: RestaurantType) => {
  try {
    const response = await axios.get(RESTAURANT_LIST_API_URL(restaurantType));
    return response.data;
  } catch (error: any) {
    console.error('식당 로딩 중 오류 발생:', error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new Error('식당 정보를 찾을 수 없습니다.');
      }
    }
    throw new Error('식당 정보를 가져오는 데 실패했습습니다.');
  }
};

export const getRestaurant = async (restaurantType: RestaurantType, id: number) => {
  try {
    const response = await axios.get(RESTAURANT_DETAIL_API_URL(restaurantType, id));
    return response.data;
  } catch (error: any) {
    const status = error.errorState || error.response?.status || 500;
    const message =
      error.data.message ||
      error.response?.data?.message ||
      '식당 정보를 가져오던 중 오류가 발생했습니다. 다시 시도해 주세요.';
    throw new RouteBaseError(status, message);
  }
};
export const getMenu = async (restaurantType: RestaurantType, id: number) => {
  try {
    const response = await axios.get(MENU_LIST_API_URL(restaurantType, id));
    return response.data;
  } catch (error: any) {
    const status = error.errorState || error.response?.status || 500;
    const message =
      error.data.message ||
      error.response?.data?.message ||
      '메뉴 정보를 가져오던 중 오류가 발생했습니다. 다시 시도해 주세요.';
    throw new RouteBaseError(status, message);
  }
};
