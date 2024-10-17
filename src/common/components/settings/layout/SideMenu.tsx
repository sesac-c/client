import React from 'react';
import { Box, Paper, Typography, Stack } from '@mui/material';
import GradientDivider from '@/common/components/settings/layout/GradientDivider';
import { NavLink } from 'react-router-dom';
import { archives, settings } from '@/common/constants';

const Menu: React.FC<{ title: string; items: { name: string; to: string }[] }> = ({ title, items }) => {
  return (
    <Box>
      <Typography
        className='text-gray-basic'
        fontWeight={550}
        sx={{ width: '30%', textAlign: 'center', py: 1, letterSpacing: -1, userSelect: 'none' }}
      >
        {title}
      </Typography>
      <GradientDivider />
      <Stack spacing={3} sx={{ width: '100%', px: 2.5, py: 3, letterSpacing: -1, color: 'grey.600' }}>
        {items.map((item, index) => (
          <Typography key={index} variant='body2'>
            <NavLink
              to={item.to}
              end
              className={({ isActive }) => (isActive ? 'font-bold text-gray-basic' : undefined)}
              style={{
                display: 'inline-block',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              {item.name}
            </NavLink>
          </Typography>
        ))}
      </Stack>
    </Box>
  );
};

const SideMenu = () => {
  return (
    <Paper elevation={3} sx={{ width: '20vw', p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
      <Stack spacing={4} mt={2}>
        <Menu title='설정' items={settings} />
        <Menu title='보관함' items={archives} />
      </Stack>
    </Paper>
  );
};

export default SideMenu;
