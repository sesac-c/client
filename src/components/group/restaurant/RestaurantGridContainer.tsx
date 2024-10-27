import React, { useEffect, useState } from 'react';
import { getRestaurants } from '@/services/api';
import { RestaurantType, RestaurantResponse } from '@/types';
import { Chip, Container, Grid2, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { scrollStyle } from '@/constants';
import { GROUP_PATH, RESTAURANT_END_POINT } from '@/routes/paths';

const RestaurantGridSkeleton: React.FC<{ itemCount?: number }> = ({ itemCount = 3 }) => (
  <Container
    disableGutters
    sx={{
      margin: 0,
      minHeight: 'calc(100vh - 380px)',
      padding: 1
    }}
    maxWidth='md'
  >
    <Grid2 container spacing={1} columns={6}>
      {[...Array(itemCount)].map((_, index) => (
        <Grid2 key={index} size={2}>
          <Skeleton
            variant='rectangular'
            sx={{
              aspectRatio: '1/1',
              height: '100%',
              borderRadius: 1
            }}
            animation='wave'
          />
        </Grid2>
      ))}
    </Grid2>
  </Container>
);

const RestaurantWrapper: React.FC<{
  children: React.ReactNode;
  restaurantType: RestaurantType;
  restaurant: RestaurantResponse;
}> = ({ children, restaurantType, restaurant }) => {
  const naviagte = useNavigate();

  return (
    <Paper
      component='div'
      onClick={() => naviagte('')}
      elevation={3}
      sx={{
        aspectRatio: '1/1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          bgcolor: 'grey.200'
        },
        '&:hover img': {
          opacity: 0.85,
          transform: 'scale(1.05)',
          transition: 'all 0.3s ease'
        }
      }}
    >
      {children}
    </Paper>
  );
};

const RestaurantGrid: React.FC<{
  restaurants: RestaurantResponse[];
  restaurantType: RestaurantType;
}> = ({ restaurants, restaurantType }) => {
  const navigate = useNavigate();
  const containerStyle = {
    margin: 0,
    maxHeight: 'calc(100vh - 200px)',
    overflowY: 'auto',
    ...scrollStyle,
    padding: 1
  };
  return (
    <Container disableGutters sx={{ ...containerStyle }} maxWidth='md'>
      {restaurants && restaurants.length > 0 ? (
        <Grid2 container spacing={1} columns={6}>
          {restaurants.map(restaurant => (
            <Grid2
              key={restaurant.id}
              size={2}
              component='button'
              onClick={() => {
                navigate(
                  `/${GROUP_PATH}/${restaurantType === 'campus' ? 'courses' : restaurantType}/${RESTAURANT_END_POINT}/${restaurant.id}`
                );
              }}
            >
              <RestaurantWrapper restaurant={restaurant} restaurantType={restaurantType}>
                <Stack p={1} alignItems='center'>
                  <Chip label={restaurant.category} variant='outlined' className='w-fit text-xs' size='small' />
                  <Typography
                    marginBottom={1}
                    variant='subtitle1'
                    color='success.main'
                    align='center'
                    noWrap
                    fontWeight={700}
                  >
                    {restaurant.name}
                  </Typography>
                  <Typography variant='caption' color='text.secondary' align='center'>
                    {restaurant.address}
                  </Typography>
                </Stack>
              </RestaurantWrapper>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <p className='mt-2 w-full text-center text-gray-basic'>등록된 음식점이 없습니다.</p>
      )}
    </Container>
  );
};
const RestaurantGridContainer: React.FC<{ restaurantType: RestaurantType }> = ({ restaurantType }) => {
  const [isRestaurantLoading, setIsRestaurantLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([]);

  const fetchRestaurants = async () => {
    let timer: NodeJS.Timeout;
    try {
      setIsRestaurantLoading(true);
      const fetchedRestaurants = await getRestaurants(restaurantType);
      setRestaurants(fetchedRestaurants || []);
      timer = setTimeout(() => setIsRestaurantLoading(false), 800);
    } catch (error) {
      console.error('식당 로딩 중 오류 발생:', error);
      setIsRestaurantLoading(false);
    } finally {
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [restaurantType]);

  return isRestaurantLoading ? (
    <RestaurantGridSkeleton itemCount={3} />
  ) : (
    <RestaurantGrid restaurantType={restaurantType} restaurants={restaurants} />
  );
};

export default RestaurantGridContainer;
