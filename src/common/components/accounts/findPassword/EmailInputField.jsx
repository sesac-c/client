import { memo } from 'react';

import PropTypes from 'prop-types';

import { TextField } from '@mui/material';
import { DEFAULT_TEXTFIELD_SETTING, EMAIL_FIELD_SETTING } from '../../../utils/form';

const EmailInputField = memo(({ email, isEmailValid, helperText, onChange }) => {
  return (
    <TextField
      value={email}
      onChange={e => onChange('email', e.target.value)}
      disabled={isEmailValid}
      helperText={helperText}
      error={helperText !== '' && !isEmailValid}
      {...DEFAULT_TEXTFIELD_SETTING}
      {...EMAIL_FIELD_SETTING}
      placeholder='가입한 이메일을 입력합니다'
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
