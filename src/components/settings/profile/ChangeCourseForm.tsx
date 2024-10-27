import React, { useEffect, useState } from 'react';

import { getCourses } from '@/services/api';
import {
  CampusResponse,
  CourseChangeRequestState,
  CourseResponse,
  HandleCourseChangeRequestFieldChange
} from '@/types';
import { CAMPUS_FIELD_SETTING, COURSE_FIELD_SETTING, DEFAULT_TEXTFIELD_SETTING } from '@/utils/form';
import { MenuItem, TextField } from '@mui/material';

const ChangeCourseForm: React.FC<{
  campuses: CampusResponse[];
  state: CourseChangeRequestState;
  onChange: HandleCourseChangeRequestFieldChange;
}> = ({ campuses, state, onChange }) => {
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const getCampusNameById = (campusId: number) => campuses.find(campus => campus.id === campusId)?.name || '';
  const getCourseNameById = (courseId: number) => courses.find(course => course.id === courseId)?.name || '';

  useEffect(() => {
    const fetchCourses = async () => {
      const campusId = state.campusId;
      if (campusId) {
        try {
          const data = await getCourses(Number(campusId));
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
  }, [state.campusId]);

  return (
    <>
      <TextField
        select
        value={state.campusId || ''}
        onChange={e => onChange('campusId', e.target.value, getCampusNameById(Number(e.target.value)))}
        error={state.fieldErrors.campus.isError}
        helperText={state.fieldErrors.campus.message}
        // disabled={loading}
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
        value={state.courseId || ''}
        onChange={e => onChange('courseId', e.target.value, getCourseNameById(Number(e.target.value)))}
        error={state.fieldErrors.course.isError}
        helperText={state.fieldErrors.course.message}
        disabled={!state.campusId || courses.length === 0}
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

export default ChangeCourseForm;
