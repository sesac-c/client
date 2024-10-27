import React from 'react';
import { FormLabel, FormControl, FormHelperText, Typography } from '@mui/joy';
import { RegisterFormFieldProps } from '@/types';

const RegisterDateFormField = <T extends string>({
  name,
  label,
  value,
  onChange,
  error
}: RegisterFormFieldProps<T>): React.ReactElement => (
  <FormControl>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <input
      type='date'
      required
      name={name}
      placeholder={label}
      value={value}
      onChange={e => onChange(name, e.target.value)}
      style={{
        width: '100%',
        padding: '0.5rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem',
        lineHeight: '1.5'
      }}
    />
    {error && (
      <FormHelperText>
        <Typography color='danger' level='body-xs'>
          {error}
        </Typography>
      </FormHelperText>
    )}
  </FormControl>
);

export default RegisterDateFormField;
