import { CourseError } from '../constants';
import {
  CampusRegisterRequest,
  CourseRegisterRequest,
  NoticeRegisterRequest,
  RestaurantRegisterRequest,
  RunningmateRegisterRequest
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
interface BasicUseRegisterReturn {
  validateForm: () => boolean;
  isFormValid: boolean;
  resetForm: () => void;
}
export interface UseCampusRegisterReturn extends BasicUseRegisterReturn {
  state: CampusFormState;
  errors: campusError;
  handleChange: (field: keyof CampusFormState, value: string) => void;
}

export type CourseFormState = CourseRegisterRequest;
export type courseError = Partial<Record<keyof CourseRegisterRequest, CourseError>>;
export interface UseCourseRegisterReturn extends BasicUseRegisterReturn {
  state: CourseRegisterRequest;
  errors: courseError;
  handleChange: (field: keyof CourseFormState, value: string | number) => void;
}

export type NoticeFormState = NoticeRegisterRequest;
export type noticeError = Partial<Record<keyof NoticeRegisterRequest, string>>;
export interface UseNoticeRegisterReturn extends BasicUseRegisterReturn {
  state: NoticeRegisterRequest;
  errors: noticeError;
  handleChange: (field: keyof NoticeFormState, value: string) => void;
}

export type RunningmateFormState = RunningmateRegisterRequest;
export type runningmateError = Partial<Record<keyof RunningmateRegisterRequest, string>>;
export interface UseRunningmateRegisterReturn extends BasicUseRegisterReturn {
  state: RunningmateRegisterRequest;
  errors: runningmateError;
  handleChange: (field: keyof RunningmateFormState, value: string) => void;
}
