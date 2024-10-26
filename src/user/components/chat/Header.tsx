import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Logo from '@/common/components/common/layout/Logo';
import { MessageHeaderProps } from '@/user/type';
const Header: React.FC<MessageHeaderProps> = ({ courseName, setDrawerOpen }) => {
  return (
    <AppBar position='static' sx={{ backgroundColor: '#187B46' }}>
      <Toolbar className='flex justify-between'>
        <Logo size='small' />
        <Typography fontWeight={700} component='div'>
          {courseName}
        </Typography>
        <IconButton edge='start' color='inherit' size='large' onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
