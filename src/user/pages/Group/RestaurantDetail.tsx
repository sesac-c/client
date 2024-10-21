import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurant } from '@/user/services/api';
import { RestaurantDetailResponse, RestaurantType } from '@/user/type';
import { isNumber } from '@/common/utils';
import RestaurantDetail from '@/user/components/group/restaurant/detail/RestaurantDetail';

const RestaurantDetailPage: React.FC<{ restaurantType: RestaurantType }> = ({ restaurantType }) => {
  const { restaurantId } = useParams();

  const [restaurant, setRestaurant] = useState<RestaurantDetailResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadRestaurant = useCallback(async () => {
    setIsLoading(true);
    try {
      if (restaurantId) {
        isNumber(restaurantId);
        const id = Number(restaurantId);
        const data = await getRestaurant(restaurantType, id);
        setRestaurant(data);
      }
    } catch (error: any) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [restaurantId, restaurantType]);

  useEffect(() => {
    loadRestaurant();
  }, []);

  if (isLoading) {
    return null;
  } else if (isError) {
    return <p className='w-full text-center'>식당을 찾을 수 없거나 잘못된 접근입니다.</p>;
  } else {
    return restaurant && <RestaurantDetail restaurant={restaurant} restaurantType={restaurantType} />;
  }
};

export default RestaurantDetailPage;
