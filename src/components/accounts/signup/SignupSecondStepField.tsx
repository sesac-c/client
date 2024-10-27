import React, { useState, useEffect } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { DEFAULT_TEXTFIELD_SETTING, CAMPUS_FIELD_SETTING, COURSE_FIELD_SETTING } from '@/utils/form';
import { CampusResponse, SignupSecondStepFieldProps } from '@/types';
import { CourseResponse } from '@/types';
import { getCampuses, getCourses } from '@/services/api/signup';

const SignupSecondStepField: React.FC<SignupSecondStepFieldProps> = ({ formData, onChange, errors }) => {
  const [campuses, setCampuses] = useState<CampusResponse[]>([]);
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const data = await getCampuses();
        setCampuses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampuses();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (formData.campus) {
        try {
          const data = await getCourses(Number(formData.campus));
          setCourses(data);
        } catch (error) {
          console.error(error);
          setCourses([]);
        }
      } else {
        setCourses([]);
      }
    };

    fetchCourses();
  }, [formData.campus]);

  return (
    <>
      <TextField
        select
        value={formData.campus}
        onChange={e => onChange('campus', e.target.value)}
        error={!!errors.campus}
        helperText={errors.campus}
        disabled={loading}
        {...DEFAULT_TEXTFIELD_SETTING}
        {...CAMPUS_FIELD_SETTING}
      >
        {campuses.map(campus => (
          <MenuItem key={campus.id} value={campus.id}>
            {campus.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        value={formData.course}
        onChange={e => onChange('course', e.target.value)}
        error={!!errors.course}
        helperText={errors.course}
        disabled={!formData.campus || courses.length === 0}
        {...DEFAULT_TEXTFIELD_SETTING}
        {...COURSE_FIELD_SETTING}
      >
        {courses.map(course => (
          <MenuItem key={course.id} value={course.id}>
            {`(${course.classNumber}기) ${course.name}`}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default SignupSecondStepField;
