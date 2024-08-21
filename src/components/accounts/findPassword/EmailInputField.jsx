import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const EmailInputField = memo(({ email, isEmailValid, helperText, onChange }) => {
  return (
    <TextField
      label='이메일'
      placeholder='가입한 이메일을 입력합니다'
      name='email'
      type='email'
      value={email}
      onChange={e => onChange('email', e.target.value)}
      disabled={isEmailValid}
      helperText={helperText}
      error={helperText !== '' && !isEmailValid}
      required
      fullWidth
      margin='dense'
      color='success'
    />
  );
});

EmailInputField.propTypes = {
  email: PropTypes.string.isRequired,
  isEmailValid: PropTypes.bool.isRequired,
  helperText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default EmailInputField;
