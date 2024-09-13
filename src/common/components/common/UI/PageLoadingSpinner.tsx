import React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import Box from '@mui/joy/Box';

const PageLoadingSpinner = () => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
      <CircularProgress size='lg' color='success' />
    </Box>
  );
};

export default PageLoadingSpinner;
