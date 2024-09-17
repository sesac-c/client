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
