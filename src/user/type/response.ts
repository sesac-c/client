export interface RestaurantResponse {
  id: number;
  name: string;
  category: string;
  address: string;
}
export interface RestaurantDetailResponse {
  id: number;
  name: string;
  category: string;
  address: string;
  longitude?: string;
  latitude?: string;
  type: string;
}

export interface MenuResponse {
  id: number;
  name: string;
  price: number;
}
