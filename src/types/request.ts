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

export interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}
export interface ResetPasswordRequest {
  password: string;
  passwordConfirm: string;
  uuid: string;
}

export interface UpdatePasswordForm extends ResetPasswordForm {}
export interface UpdatePasswordRequest {
  password: string;
  passwordConfirm: string;
}

export interface UpdateProfileForm {
  nickname: string;
  profileImage: string;
}

export interface CourseChangeRequestForm {
  campusId: string;
  courseId: string;
  campusName: string;
  courseName: string;
}
export interface UpdateProfileRequest {
  nickname?: string;
  profileImage?: string;
  removed: boolean;
}
export interface ManagerUpdateProfileRequest {
  profileImage: string;
  removed: boolean;
}

interface BasicListRequest {
  page?: number;
  sort?: string;
}
export interface UserListRequest extends BasicListRequest {
  name?: string;
  courseId?: number;
  status?: number;
}

export interface CourseListRequest extends BasicListRequest {
  sort?: 'startDate,desc' | 'startDate,asc' | 'createdAt,asc' | 'createdAt,desc';
  status?: 'upcoming' | 'ongoing' | 'finished';
}
export interface FeedListRequest extends BasicListRequest {
  keyword?: string;
}

export interface RunningmateListRequest extends BasicListRequest {
  name?: string;
}

export interface RestaurantListRequest {
  name?: string;
}

export interface CampusRegisterRequest {
  name: string;
  address: string;
}
export interface CourseRegisterRequest {
  name: string;
  classNumber: string;
  instructorName: string;
  startDate: string;
  endDate: string;
}
export interface NoticeRegisterRequest {
  title: string;
  content: string;
  image?: string;
  hashtags?: string[];
  importance?: number;
  courseId?: number;
  type: '' | 'all' | 'group';
}

export interface RestaurantRegisterRequest {
  name: string;
  category: string;
  address: string;
  type: '' | 'campus' | 'runningmate';
  latitude?: string;
  longitude?: string;
}

export interface RunningmateRegisterRequest {
  name: string;
  subject: string;
  goal: string;
  courseId: string;
}
