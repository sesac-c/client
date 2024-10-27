import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { SettingsContentLayoutProps } from '@/types';

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
                mt: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
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
              mt: 3,
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
    </Box>
  );
};

export default SettingsContentLayout;
