import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { DEFAULT_TEXTFIELD_SETTING, BIRTHDATE_FIELD_SETTING, GENDER_FIELD_SETTING } from '@/utils/form';
import { BirthdateInputProps } from '@/types';

const BirthdateInput: React.FC<BirthdateInputProps> = ({ birthdate, gender, onChange, errors }) => {
  const handleChange = (field: 'birthdate' | 'gender') => (e: ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value);
  };

  return (
    <div className='signup__birthdate-filed-container'>
      <div className='signup__birthdate-filed-inner'>
        <TextField
          className='signup__birthdate-filed-birthdate'
          value={birthdate}
          onChange={handleChange('birthdate')}
          error={!!errors.birthdate}
          helperText={errors.birthdate}
          {...DEFAULT_TEXTFIELD_SETTING}
          {...BIRTHDATE_FIELD_SETTING}
        />
        <span className='signup__birthdate-filed-hyphen'>-</span>
        <TextField
          className='signup__birthdate-filed-gender'
          value={gender}
          onChange={handleChange('gender')}
          error={!!errors.gender}
          helperText={errors.gender}
          {...DEFAULT_TEXTFIELD_SETTING}
          {...GENDER_FIELD_SETTING}
        />
        <div className='signup__birthdate-filed__blurred-info-container'>
          {[...Array(6)].map((_, index) => (
            <span key={index} className='signup__birthdate-filed__blurred-info-item'></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BirthdateInput;
