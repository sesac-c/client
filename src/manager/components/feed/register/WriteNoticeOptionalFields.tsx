import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useNoticeStore from '../../../store/writeNoticeStore';
import { FormControl, MenuItem, Select, FormHelperText, SelectChangeEvent } from '@mui/material';
import { Typography } from '@mui/joy';

const DEFAULT_TEXTFIELD_SETTING = {
  color: 'success' as 'success',
  margin: 'dense' as 'dense',
  fullWidth: true,
  size: 'small' as 'small'
};

export const ImportanceSelector: React.FC = () => {
  const { state, setState, errors } = useNoticeStore();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setState('importance', value === '' ? undefined : Number(value));
  };

  return (
    <div className='mx-auto flex w-full max-w-md flex-col gap-1'>
      <div>
        <div className='flex flex-row items-end justify-between'>
          <h2 className='pl-2 text-basic font-semibold'>중요도 선택</h2>
        </div>
      </div>
      <div className='h-fit w-full pl-2'>
        <FormControl variant='outlined' {...DEFAULT_TEXTFIELD_SETTING}>
          <Select
            value={state.importance !== undefined ? String(state.importance) : ''}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value=''>
              <em>선택 안함</em>
            </MenuItem>
            {Array.from({ length: 10 }, (_, i) => (
              <MenuItem key={i + 1} value={String(i + 1)}>
                {i + 1}
              </MenuItem>
            ))}
          </Select>
          {errors.importance && <FormHelperText error>{errors.importance}</FormHelperText>}
        </FormControl>
      </div>
    </div>
  );
};

interface CourseResponse {
  id: number;
  name: string;
  classNumber: string;
}
const CourseSelect: React.FC = () => {
  const { state, setState, errors } = useNoticeStore();
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

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setState('courseId', value === '' ? undefined : Number(value));
  };

  return (
    <div className='mx-auto flex w-full max-w-md flex-col gap-1'>
      <div>
        <div className='flex flex-row items-end justify-between'>
          <h2 className='flex flex-row pl-2 text-basic font-semibold'>
            강의 선택
            <Typography color='success' level='body-xs'>
              *필수
            </Typography>
          </h2>
        </div>
      </div>
      <div className='h-fit w-full pl-2'>
        <FormControl variant='outlined' {...DEFAULT_TEXTFIELD_SETTING}>
          <Select
            value={state.courseId !== undefined ? String(state.courseId) : ''}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value=''>
              <em>선택</em>
            </MenuItem>
            {courses.map(course => (
              <MenuItem key={course.id} value={String(course.id)}>
                {`(${course.classNumber}기) ${course.name}`}
              </MenuItem>
            ))}
          </Select>
          {errors.courseId && <FormHelperText error>{errors.courseId}</FormHelperText>}
        </FormControl>
      </div>
    </div>
  );
};

export const NoticeSelectors: React.FC = () => {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <CourseSelect />
      <ImportanceSelector />
    </div>
  );
};
