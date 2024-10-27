import { CourseResponse, FilterSortOption } from '@/types';

export const transformCourseOptions = (apiResponse: CourseResponse[]): FilterSortOption[] => {
  return apiResponse.map(course => ({
    value: course.id,
    label: `${course.name} (${course.classNumber}기)`
  }));
};
