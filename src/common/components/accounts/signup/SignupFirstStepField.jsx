import { TextField } from '@mui/material';

import BirthdateInput from './BirthdateInput.jsx';
import PasswordInput from './PasswordInput.jsx';

import {
  CONFIRMPASSWORD_FIELD_SETTING,
  DEFAULT_TEXTFIELD_SETTING,
  EMAIL_FIELD_SETTING,
  NAME_FIELD_SETTING,
  PASSWORD_FIELD_SETTING
} from '../../../utils/form';

const SignupFirstStepField = ({ formData, onChange, errors }) => {
  return (
    <>
      <div className='signup__filed-container'>
        <TextField
          value={formData.name}
          onChange={e => onChange('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          {...DEFAULT_TEXTFIELD_SETTING}
          {...NAME_FIELD_SETTING}
        />
        <BirthdateInput birthdate={formData.birthdate} gender={formData.gender} onChange={onChange} errors={errors} />
      </div>
      <div className='signup__filed-container'>
        <TextField
          value={formData.email}
          onChange={e => onChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          {...DEFAULT_TEXTFIELD_SETTING}
          {...EMAIL_FIELD_SETTING}
        />
        <PasswordInput
          value={formData.password}
          onChange={e => onChange('password', e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          {...PASSWORD_FIELD_SETTING}
        />
        <PasswordInput
          value={formData.confirmPassword}
          onChange={e => onChange('confirmPassword', e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          {...CONFIRMPASSWORD_FIELD_SETTING}
        />
      </div>
    </>
  );
};

export default SignupFirstStepField;
