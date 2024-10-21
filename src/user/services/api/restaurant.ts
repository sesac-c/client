import { RESTAURANT_LIST_API_URL } from '@/common/constants';
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
