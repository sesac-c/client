import React, { memo } from 'react';
import { TextField } from '@mui/material';
import { DEFAULT_TEXTFIELD_SETTING, EMAIL_FIELD_SETTING } from '../../../../common/utils';
import { EmailInputFieldProps, FindPasswordField } from '../../../../common/types';

const EmailInputField: React.FC<EmailInputFieldProps> = memo(({ email, isEmailValid, helperText, onChange }) => {
  return (
    <TextField
      value={email}
      onChange={e => onChange('email' as FindPasswordField, e.target.value)}
      disabled={isEmailValid}
      helperText={helperText}
      error={helperText !== '' && !isEmailValid}
      {...DEFAULT_TEXTFIELD_SETTING}
      {...EMAIL_FIELD_SETTING}
      placeholder='가입한 이메일을 입력합니다'
    />
  );
});

export default EmailInputField;
