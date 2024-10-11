import React, { useEffect, useState } from 'react';

import { Typography, FormControl, FormLabel, Select, Option, FormHelperText } from '@mui/joy';
import { runningmateError, RunningmateFormState } from '../../../../types';
import axios from 'axios';

interface CourseResponse {
  id: number;
  name: string;
  classNumber: string;
}

const CourseSelect: React.FC<{
  state: RunningmateFormState;
  errors: runningmateError;
  onChange: (field: keyof RunningmateFormState, value: string) => void;
}> = ({ state, errors, onChange }) => {
  const [courses, setCourses] = useState<CourseResponse[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/campuses/manager-courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <FormControl error={!!errors.courseId}>
      <FormLabel>
        강의 선택
        <Typography component='span' color='success' fontSize='sm'>
          *필수
        </Typography>
      </FormLabel>
      <Select
        value={state.courseId !== undefined ? String(state.courseId) : ''}
        onChange={(_, newValue) => onChange('courseId', newValue as string)}
        placeholder='선택'
      >
        {courses.map(course => (
          <Option key={course.id} value={String(course.id)}>
            {`(${course.classNumber}기) ${course.name}`}
          </Option>
        ))}
      </Select>
      {errors.courseId && <FormHelperText>{errors.courseId}</FormHelperText>}
    </FormControl>
  );
};

export default CourseSelect;
