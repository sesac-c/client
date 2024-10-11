import { CampusError, RestaurantError, CourseError, NoticeError, RunningmateError } from '../constants';

import {
  CampusRegisterRequest,
  CourseRegisterRequest,
  campusError,
  restaurantError,
  courseError,
  NoticeRegisterRequest,
  noticeError,
  RestaurantFormState,
  RunningmateRegisterRequest,
  runningmateError
} from '../types';
import { isBefore, isValid, parse } from 'date-fns';

// 공통 유효성 검사 함수
const validateStringField = (value: string, minLength: number, maxLength: number): boolean => {
  return value.trim().length >= minLength && value.trim().length <= maxLength;
};

const isEmptyField = (value: string): boolean => {
  return value.trim().length === 0;
};

// Restaurant 유효성 검사
export const validateRestaurantForm = (formData: RestaurantFormState): restaurantError => {
  const errors: restaurantError = {};

  if (isEmptyField(formData.name)) {
    errors.name = RestaurantError.ERROR_NAME_REQUIRED;
  } else if (!validateStringField(formData.name, 1, 20)) {
    errors.name = RestaurantError.ERROR_NAME_INVALID;
  }

  if (isEmptyField(formData.category)) {
    errors.category = RestaurantError.ERROR_CATEGORY_REQUIRED;
  } else if (!validateStringField(formData.category, 1, 20)) {
    errors.category = RestaurantError.ERROR_CATEGORY_INVALID;
  }

  if (formData.type && isEmptyField(formData.type)) {
    errors.type = RestaurantError.ERROR_TYPE_REQUIRED;
  }

  if (isEmptyField(formData.address)) {
    errors.address = RestaurantError.ERROR_ADDRESS_REQUIRED;
  } else if (!validateStringField(formData.address, 1, 150)) {
    errors.address = RestaurantError.ERROR_ADDRESS_INVALID;
  }

  return errors as restaurantError;
};

// Campus 유효성 검사
export const validateCampusForm = (formData: CampusRegisterRequest): campusError => {
  const errors: campusError = {};

  if (isEmptyField(formData.name)) {
    errors.name = CampusError.ERROR_NAME_REQUIRED;
  } else if (!validateStringField(formData.name, 2, 20)) {
    errors.name = CampusError.ERROR_NAME_INVALID;
  }

  if (isEmptyField(formData.address)) {
    errors.address = CampusError.ERROR_ADDRESS_REQUIRED;
  } else if (!validateStringField(formData.address, 2, 150)) {
    errors.address = CampusError.ERROR_ADDRESS_INVALID;
  }

  return errors as campusError;
};

export const validateCourseForm = (
  formData: CourseRegisterRequest
): Partial<Record<keyof CourseRegisterRequest, CourseError>> => {
  const errors: courseError = {};

  if (isEmptyField(formData.name)) {
    errors.name = CourseError.ERROR_NAME_REQUIRED;
  } else if (!validateStringField(formData.name, 1, 50)) {
    errors.name = CourseError.ERROR_NAME_INVALID;
  }

  if (isEmptyField(formData.classNumber)) {
    errors.classNumber = CourseError.ERROR_CLASS_NUMBER_REQUIRED;
  } else {
    const parsed = Number(formData.classNumber);
    if (isNaN(parsed) || !Number.isInteger(parsed) || parsed < 1) {
      errors.classNumber = CourseError.ERROR_CLASS_NUMBER_INVALID;
    }
  }

  if (isEmptyField(formData.instructorName)) {
    errors.instructorName = CourseError.ERROR_INSTRUCTOR_NAME_REQUIRED;
  } else if (!/^[가-힣]+$/.test(formData.instructorName)) {
    errors.instructorName = CourseError.ERROR_INSTRUCTOR_NAME_PATTERN;
  } else if (!validateStringField(formData.instructorName, 1, 5)) {
    errors.instructorName = CourseError.ERROR_INSTRUCTOR_NAME_INVALID;
  }

  if (isEmptyField(formData.startDate)) {
    errors.startDate = CourseError.ERROR_START_DATE_REQUIRED;
  } else if (!isValidDate(formData.startDate)) {
    errors.startDate = CourseError.ERROR_START_DATE_INVALID;
  }

  if (isEmptyField(formData.endDate)) {
    errors.endDate = CourseError.ERROR_END_DATE_REQUIRED;
  } else if (!isValidDate(formData.endDate)) {
    errors.endDate = CourseError.ERROR_END_DATE_INVALID;
  }

  if (!errors.startDate && !errors.endDate) {
    const startDate = parse(formData.startDate, 'yyyy-MM-dd', new Date());
    const endDate = parse(formData.endDate, 'yyyy-MM-dd', new Date());

    if (!isBefore(startDate, endDate)) {
      errors.startDate = CourseError.ERROR_END_DATE_BEFORE_START_DATE;
      errors.endDate = CourseError.ERROR_END_DATE_BEFORE_START_DATE;
    }
  }
  return errors;
};

function isValidDate(dateString: string): boolean {
  const date = parse(dateString, 'yyyy-MM-dd', new Date());
  return isValid(date);
}

export const validateNoticeForm = (formData: NoticeRegisterRequest): noticeError => {
  const errors: noticeError = {};

  if (!formData.title.trim()) {
    errors.title = NoticeError.ERROR_TITLE_REQUIRED;
  } else if (formData.title.length < 1 || formData.title.length > 20) {
    errors.title = NoticeError.ERROR_TITLE_INVALID;
  }

  if (!formData.content.trim()) {
    errors.content = NoticeError.ERROR_CONTENT_REQUIRED;
  } else if (formData.content.length < 1 || formData.content.length > 500) {
    errors.content = NoticeError.ERROR_CONTENT_INVALID;
  }

  if (formData.type === 'group' && formData.courseId !== undefined) {
    errors.type = NoticeError.ERROR_COURSEID_REQUIRED;
  }

  return errors;
};
export const validateRunningmateForm = (formData: RunningmateRegisterRequest): runningmateError => {
  const errors: runningmateError = {};

  if (!formData.name.trim()) {
    errors.name = RunningmateError.ERROR_NAME_REQUIRED;
  } else if (formData.name.length < 1 || formData.name.length > 20) {
    errors.name = RunningmateError.ERROR_NAME_INVALID;
  }

  if (!formData.subject.trim()) {
    errors.subject = RunningmateError.ERROR_SUBJECT_REQUIRED;
  } else if (formData.subject.length < 1 || formData.subject.length > 100) {
    errors.subject = RunningmateError.ERROR_SUBJECT_INVALID;
  }
  if (!formData.goal.trim()) {
    errors.goal = RunningmateError.ERROR_GOAL_REQUIRED;
  } else if (formData.subject.length < 1 || formData.subject.length > 100) {
    errors.goal = RunningmateError.ERROR_GOAL_INVALID;
  }
  if (formData.courseId === undefined) {
    errors.courseId = RunningmateError.ERROR_COURSEID_REQUIRED;
  }

  return errors;
};
