import React, { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

const ArchiveContentLayout: React.FC<{ title: string; children: ReactNode }> = ({ title, children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <Box
        sx={{
          width: '62vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '85%',
          padding: 4,
          boxSizing: 'border-box',
          mt: 3
        }}
      >
        <Box>
          <Typography variant='h5' fontWeight={650} component='h1' gutterBottom>
            {title}
          </Typography>
          <Box mt={3}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ArchiveContentLayout;
