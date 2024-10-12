export interface CampusResponse {
  id: number;
  name: string;
}
export interface CourseResponse {
  id: number;
  name: string;
  classNumber: string;
}
export interface EmailCheckRequest {
  email: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  birthDate: string;
  gender: number;
  firstCourseId: number;
}

export interface ApiError {
  code: string;
  message: string;
}
