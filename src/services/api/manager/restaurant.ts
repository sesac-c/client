import axios from 'axios';
import { RestaurantListRequest, RestaurantRegisterRequest } from '@/types';
import { MANAGER_RESTAURANT_LIST_API_URL, MANAGER_RESTAURANT_REGISTER_API_URL } from '@/constants';

export const restaurantListRequest = async (params: RestaurantListRequest) => {
  try {
    const response = await axios.get(MANAGER_RESTAURANT_LIST_API_URL, {
      params
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch restaurant list:', error);
    throw error;
  }
};

export const registerRestaurant = async (data: RestaurantRegisterRequest) => {
  const response = await axios.post(MANAGER_RESTAURANT_REGISTER_API_URL(data.type), data);
  return response.data;
};
