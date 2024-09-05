import { TextField, MenuItem } from '@mui/material';

import { campuses, courses } from '../../../_mock';

import { CAMPUS_FIELD_SETTING, COURSE_FIELD_SETTING } from '../../../utils/form';

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
        value={formData.campus || ''}
        onChange={e => onChange('campus', Number(e.target.value))}
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
        value={formData.course || ''}
        onChange={e => onChange('course', Number(e.target.value))}
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
