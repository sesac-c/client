import React from 'react';
import { RowType, SearchTitle, TableData, RestaurantListRequest } from '../../types';
import { restaurantListRequest } from '../../services/api';
import { MANAGER_RESTAURANT_CHILDREN_PATH } from '../../../common/constants';
import { useNavigate } from 'react-router-dom';

export const useRestaurantListData = () => {
  const navigate = useNavigate();
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
      console.error('Failed to fetch restaurant:', error);
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
  function handleAddRestaurant() {
    // 식당 등록 요청, 후에 상세 페이지 이동
    navigate(MANAGER_RESTAURANT_CHILDREN_PATH.register);
    return;
  }

  return {
    restaurantSearchTitle,
    restaurantData,
    isLoading,
    handleSearchChange,
    handleApplyFilters,
    handleAddRestaurant
  };
};
