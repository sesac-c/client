import { CourseError } from '../constants';
import {
  CampusRegisterRequest,
  CourseRegisterRequest,
  NoticeRegisterRequest,
  RestaurantRegisterRequest
} from './request';

export interface RestaurantFormState
  extends Pick<RestaurantRegisterRequest, 'name' | 'category' | 'address' | 'type'> {}

export type restaurantError = Partial<Record<keyof RestaurantFormState, string>>;
export interface UseRestaurantRegisterReturn {
  state: RestaurantFormState;
  errors: restaurantError;
  handleChange: (field: keyof RestaurantFormState, value: string) => void;
  validateForm: () => boolean;
  isFormValid: boolean;
  resetForm: () => void;
}

export type CampusFormState = CampusRegisterRequest;
export type campusError = Partial<Record<keyof CampusFormState, string>>;
export interface UseCampusRegisterReturn {
  state: CampusFormState;
  errors: campusError;
  handleChange: (field: keyof CampusFormState, value: string) => void;
  validateForm: () => boolean;
}

export type CourseFormState = CourseRegisterRequest;
export type courseError = Partial<Record<keyof CourseRegisterRequest, CourseError>>;
export interface UseCourseRegisterReturn {
  state: CourseRegisterRequest;
  errors: courseError;
  handleChange: (field: keyof CourseFormState, value: string | number) => void;
  validateForm: () => boolean;
}

export type NoticeFormState = NoticeRegisterRequest;
export type noticeError = Partial<Record<keyof NoticeRegisterRequest, string>>;
export interface UseNoticeRegisterReturn {
  state: NoticeRegisterRequest;
  errors: noticeError;
  handleChange: (field: keyof NoticeFormState, value: string | number) => void;
  validateForm: () => boolean;
}
