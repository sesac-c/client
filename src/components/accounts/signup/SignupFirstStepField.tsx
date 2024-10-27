import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import BirthdateInput from './BirthdateInput';
import PasswordInput from './PasswordInput';
import {
  CONFIRMPASSWORD_FIELD_SETTING,
  DEFAULT_TEXTFIELD_SETTING,
  EMAIL_FIELD_SETTING,
  NAME_FIELD_SETTING,
  PASSWORD_FIELD_SETTING
} from '@/utils/form';
import { FormData } from '../../../types';

interface SignupFirstStepFieldProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  errors: Partial<FormData>;
}

const SignupFirstStepField: React.FC<SignupFirstStepFieldProps> = ({ formData, onChange, errors }) => {
  return (
    <>
      <div className='signup__filed-container'>
        <TextField
          value={formData.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          {...DEFAULT_TEXTFIELD_SETTING}
          {...NAME_FIELD_SETTING}
        />
        <BirthdateInput
          birthdate={formData.birthdate}
          gender={formData.gender}
          onChange={onChange}
          errors={{ birthdate: errors.birthdate, gender: errors.gender }}
        />
      </div>
      <div className='signup__filed-container'>
        <TextField
          value={formData.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          {...DEFAULT_TEXTFIELD_SETTING}
          {...EMAIL_FIELD_SETTING}
        />
        <PasswordInput
          id='password'
          label='비밀번호'
          placeholder='비밀번호를 입력하세요'
          value={formData.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('password', e.target.value)}
          error={!!errors.password}
          helperText={errors.password || ''}
          {...PASSWORD_FIELD_SETTING}
        />
        <PasswordInput
          id='confirmPassword'
          label='비밀번호 확인'
          placeholder='비밀번호를 다시 입력하세요'
          value={formData.confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('confirmPassword', e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword || ''}
          {...CONFIRMPASSWORD_FIELD_SETTING}
        />
      </div>
    </>
  );
};

export default SignupFirstStepField;
