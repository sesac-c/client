import { useState } from 'react';

import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from '@mui/material';

import { EyeSlashIcon, EyeIcon } from '@heroicons/react/20/solid';

import { DEFAULT_TEXTFIELD_SETTING } from '../../../utils';

const PasswordInput = ({ id, label, placeholder, value, onChange, error, helperText }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = event => event.preventDefault();

  const endAdornmentContent = (
    <InputAdornment position='end'>
      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end'>
        {showPassword ? (
          <EyeSlashIcon className='signup__visibility-icon' />
        ) : (
          <EyeIcon className='signup__visibility-icon' />
        )}
      </IconButton>
    </InputAdornment>
  );

  return (
    <FormControl variant='outlined' {...DEFAULT_TEXTFIELD_SETTING}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        endAdornment={endAdornmentContent}
        label={label}
        placeholder={placeholder}
        {...DEFAULT_TEXTFIELD_SETTING}
        required={true}
      />
      <FormHelperText error={!!error}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default PasswordInput;
