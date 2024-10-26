import React from 'react';
import { Avatar, Box, IconButton, Typography } from '@mui/joy';

const SidebarHeader = () => {
  return (
    <Box sx={{ height: '55px', justifyItems: 'center', display: 'flex', gap: 0.5, alignItems: 'center' }}>
      <IconButton size='sm'>
        <Avatar
          variant='plain'
          size='sm'
          src='./assets/images/sesacc-logo.png'
          sx={{
            padding: '2px',
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }
          }}
        />
      </IconButton>
      <Typography level='title-lg' color='success'>
        SeSACC Manager
      </Typography>
    </Box>
  );
};

export default SidebarHeader;
