import React, { ReactNode } from 'react';
import MenuTable from '@/components/group/restaurant/detail/MenuTable';
import { RestaurantDetailProps } from '@/types';
import { Box, Chip, Divider, IconButton, Typography, Stack } from '@mui/joy';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { GROUP_PATH, RESTAURANT_END_POINT } from '@/routes/paths';
import Address from './Address';

const Header: React.FC<{ name: string; category: string; backPath: string }> = ({ name, category, backPath }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <IconButton
        size='lg'
        onClick={() => {
          navigate(backPath);
        }}
        sx={{ marginRight: 2 }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <Typography level='h3' component='h1'>
        {name}
        <Chip color='success' sx={{ ml: 1 }}>
          {category}
        </Chip>
      </Typography>
    </Box>
  );
};

const LabelWrapper: React.FC<{ label: string; children: ReactNode }> = ({ label, children }) => (
  <div>
    <Typography level='title-lg' fontWeight={550} mb={2} pl={2}>
      {label}
    </Typography>
    <Divider sx={{ mb: 3 }} />
    <div className='px-3'>{children}</div>
  </div>
);
const RestaurantDetail: React.FC<RestaurantDetailProps> = props => {
  const { restaurant, restaurantType } = props;
  const { id, name, category, address, longitude, latitude } = restaurant;
  const backPath = `/${GROUP_PATH}/${restaurantType === 'campus' ? 'courses' : restaurantType}/${RESTAURANT_END_POINT}`;

  return (
    <div className='mb-24'>
      <Header {...{ name, category, backPath }} />
      <Stack spacing={10} px={5} mt={5}>
        <LabelWrapper label='주소'>
          <Address {...{ address, longitude, latitude }} />
        </LabelWrapper>
        <LabelWrapper label='메뉴'>
          <MenuTable id={id} restaurantType={restaurantType} />
        </LabelWrapper>
      </Stack>
    </div>
  );
};
export default RestaurantDetail;
