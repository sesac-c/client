import React from 'react';
import { FormControl, FormLabel, Stack, Button, FormHelperText, Typography } from '@mui/joy';
import { RegisterSelectorProps } from '@/types';

const RegisterSelector: React.FC<RegisterSelectorProps> = ({ title, value, options, onChange, error }) => (
  <FormControl>
    <FormLabel>{title}</FormLabel>
    <Stack direction='row' spacing={2} sx={{ mt: 1 }}>
      {options.map(option => (
        <Button
          key={option.value}
          variant={value === option.value ? 'solid' : 'outlined'}
          color='success'
          onClick={() => onChange(option.value)}
          fullWidth
        >
          {option.label}
        </Button>
      ))}
    </Stack>
    {error && (
      <FormHelperText>
        <Typography color='danger' level='body-xs'>
          {error}
        </Typography>
      </FormHelperText>
    )}
  </FormControl>
);

export default RegisterSelector;
