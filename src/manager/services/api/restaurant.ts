import axios from 'axios';
import { RestaurantListRequest } from '../../types';
import { MANAGER_RESTAURANT_LIST_API_URL } from '../../../common/constants';

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
