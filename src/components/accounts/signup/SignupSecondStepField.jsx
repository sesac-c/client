import { TextField, MenuItem } from '@mui/material';

import { campuses, courses } from '../../../services/mockData/account';

// Constants
const DEFAULT_TEXTFIELD_SETTING = {
  color: 'success',
  margin: 'dense',
  fullWidth: true
};
const SignupSecondStepField = ({ formData, onChange, errors }) => {
  return (
    <>
      <TextField
        select
        label='캠퍼스 선택'
        defaultValue=''
        value={formData.campus || ''}
        onChange={e => onChange('campus', Number(e.target.value))}
        error={!!errors.campus}
        helperText={errors.campus}
        {...DEFAULT_TEXTFIELD_SETTING}
      >
        {campuses.map(campus => (
          <MenuItem key={campus.value} value={campus.value}>
            {campus.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label='강의 선택'
        defaultValue=''
        value={formData.course || ''}
        onChange={e => onChange('course', Number(e.target.value))}
        error={!!errors.course}
        helperText={errors.course}
        {...DEFAULT_TEXTFIELD_SETTING}
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
