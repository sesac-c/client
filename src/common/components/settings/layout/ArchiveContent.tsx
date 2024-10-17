import React, { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

const ArchiveContentLayout: React.FC<{ title: string; children: ReactNode }> = ({ title, children }) => {
  return (
    <Box
      sx={{
        px: 15,
        pt: 6,
        height: '85%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Box>
        <Typography variant='h5' fontWeight={650} component='h1' gutterBottom>
          {title}
        </Typography>
        <Box mt={3}>{children}</Box>
      </Box>
    </Box>
  );
};

export default ArchiveContentLayout;
