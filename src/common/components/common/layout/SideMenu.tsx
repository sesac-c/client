import React from 'react';
import { Box, Paper, Typography, Stack } from '@mui/material';
import GradientDivider from '@/common/components/settings/layout/GradientDivider';
import { NavLink } from 'react-router-dom';
import { SideMenuItemProps, SideMenuPage, SideMenuProps } from '@/common/types';

const SideMenuItem: React.FC<SideMenuItemProps> = ({ title, items }) => {
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

const getStyle = (page: SideMenuPage) => {
  let style = { py: 0, px: 0, mt: 0 };
  switch (page) {
    case 'group':
      style = { ...style, px: 3, mt: 1 };
      break;
    case 'settings':
      style = { py: 3, px: 3, mt: 4 };
  }
  return style;
};
const SideMenu: React.FC<SideMenuProps> = ({ page, menu }) => {
  const style = getStyle(page);
  return (
    <Paper
      elevation={0}
      sx={{ width: '20vw', height: '100vh', px: style.px, py: style.py, bgcolor: 'inherit', borderRadius: 2 }}
    >
      <Stack spacing={4} mt={style.mt}>
        {menu.map(item => (
          <SideMenuItem title={item.title} items={item.items} />
        ))}
      </Stack>
    </Paper>
  );
};

export default SideMenu;
