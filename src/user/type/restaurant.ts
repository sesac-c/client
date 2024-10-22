import { RestaurantDetailResponse } from './response';

export type RestaurantType = 'campus' | 'runningmate';
export interface MenuTableProps {
  restaurantType: RestaurantType;
  id: number;
}
export interface RestaurantDetailProps {
  restaurant: RestaurantDetailResponse;
  restaurantType: RestaurantType;
}

export interface KakaoMapProps {
  longitude: string;
  latitude: string;
}
