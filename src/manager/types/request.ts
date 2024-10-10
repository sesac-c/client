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
  classNumber: number;
  instructorName: string;
  startDate: string;
  endDate: string;
}
export interface NoticeRegisterRequest {
  title: string;
  content: string;
  image?: string;
  hashtages?: string[];
  importance?: number;
}

export interface RestaurantRegisterRequest {
  name: string;
  category: string;
  address: string;
  type: '' | 'campus' | 'runningmate';
  latitude?: string;
  longitude?: string;
}
