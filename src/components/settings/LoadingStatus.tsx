import { Box, CircularProgress } from '@mui/material';

const LoadingStatus = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      zIndex: 1000
    }}
  >
    <CircularProgress />
  </Box>
);

export default LoadingStatus;
