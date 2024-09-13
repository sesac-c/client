import React, { ChangeEvent } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { campuses, courses } from '../../../_mock';
import { DEFAULT_TEXTFIELD_SETTING, CAMPUS_FIELD_SETTING, COURSE_FIELD_SETTING } from '../../../utils';
import { FormData } from '../../../types';

interface SignupSecondStepFieldProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  errors: Partial<FormData>;
}

const SignupSecondStepField: React.FC<SignupSecondStepFieldProps> = ({ formData, onChange, errors }) => {
  return (
    <>
      <TextField
        value={formData.campus}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('campus', e.target.value)}
        error={!!errors.campus}
        helperText={errors.campus}
        {...DEFAULT_TEXTFIELD_SETTING}
        {...CAMPUS_FIELD_SETTING}
      >
        {campuses.map(campus => (
          <MenuItem key={campus.value} value={campus.value}>
            {campus.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        value={formData.course}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('course', e.target.value)}
        error={!!errors.course}
        helperText={errors.course}
        {...DEFAULT_TEXTFIELD_SETTING}
        {...COURSE_FIELD_SETTING}
      >
        {courses.map(course => (
          <MenuItem key={course.value} value={course.value}>
            {course.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default SignupSecondStepField;
