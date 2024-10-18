import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { SettingsContentLayoutProps } from '@/common/types';

const SettingsContentLayout: React.FC<SettingsContentLayoutProps> = ({
  title,
  buttonText,
  form,
  onSubmit,
  isButtonDisabled
}) => {
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
        <Box
          component='form'
          noValidate
          sx={{
            my: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxWidth: '50vw'
            }}
          >
            {form}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 'auto',
          mb: 2
        }}
      >
        <Button
          disabled={isButtonDisabled}
          size='large'
          onClick={onSubmit}
          variant='contained'
          sx={{
            width: '20%',
            bgcolor: '#187b46',
            color: 'white',
            '&:hover': {
              bgcolor: '#165132'
            }
          }}
        >
          {buttonText ? buttonText : '확인'}
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsContentLayout;
