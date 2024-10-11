import React from 'react';
import { RowType, SearchTitle, TableData, RestaurantListRequest } from '../../types';
import { restaurantListRequest } from '../../services/api';

export const useRestaurantListData = () => {
  const restaurantSearchTitle = SearchTitle.RESTAURANT;

  const [restaurantData, setRestaurantData] = React.useState<TableData>({
    type: RowType.RESTAURANT,
    contents: []
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState<string | undefined>(undefined);

  const loadRestaurant = async (params: RestaurantListRequest) => {
    setIsLoading(true);
    try {
      const response = await restaurantListRequest(params);
      const data = response.data;

      setRestaurantData({
        type: RowType.RESTAURANT,
        contents: data.map((item: any) => ({
          id: item.id,
          name: item.name,
          type: item.type,
          address: item.address,
          category: item.category
        }))
      });
    } catch (error) {
      console.error('식당 정보 로드 실패: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadRestaurant({});
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleApplyFilters = () => {
    loadRestaurant({ name: searchTerm });
  };

  return {
    restaurantSearchTitle,
    restaurantData,
    isLoading,
    handleSearchChange,
    handleApplyFilters,
    loadRestaurant
  };
};
