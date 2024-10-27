import { POST_TYPE } from '../constants';

export interface CampusResponse {
  id: number;
  name: string;
}
export interface CourseResponse {
  id: number;
  name: string;
  classNumber: string;
}
export interface ProfileResponse {
  nickname: string;
  affiliation: string; // 소속-학생: 강의, 매니저: 캠퍼스
  profileImage: string;
  isProfileMine: boolean;
  followCount: number;
  followerCount: number;
  isFollowing: boolean;
}
export interface ProfileHeaderProps extends ProfileResponse {
  profileId: number;
}
export interface UserPostResponse {
  id: number;
  title: string;
  content: string;
  image?: string;
  postType: typeof POST_TYPE;
}
export interface FollowResponse {
  id: number;
  nickname: string;
  discription: string;
  profileImage: string;
  isFollowing: boolean;
  isThisMe: boolean;
}
export interface AccountInfoResponse {
  name?: string;
  campusName?: string;
  email: string;
  birthdate?: string;
}

export interface ManagerProfileFormResponse {
  profileImage: string;
}
export interface ProfileFormResponse extends ManagerProfileFormResponse {
  nickname?: string;
  campusId?: number;
  campusName?: string;
  courseId?: number;
  courseName?: string;
  isCourseChanging?: boolean;
}
export type StudentProfileFormResponse = Required<ProfileFormResponse>;

interface ImageData {
  uuid: string;
  fileName: string;
  link: string;
}

export interface UploadResponse {
  data: ImageData[];
}
export interface RemoveResponse {
  result: boolean;
}
export interface CourseResponse {
  id: number;
  name: string;
  classNumber: string;
}
export interface RestaurantResponse {
  id: number;
  name: string;
  category: string;
  address: string;
}
export interface RestaurantDetailResponse {
  id: number;
  name: string;
  category: string;
  address: string;
  longitude?: string;
  latitude?: string;
  type: string;
}

export interface MenuResponse {
  id: number;
  name: string;
  price: number;
}

export interface UserCourseInfoResponse {
  courseId: number;
  courseName: string;
}

export interface ChatMessage {
  id: number;
  senderId: number;
  senderName: string;
  content: string;
  createdAt: string;
  delivered: boolean;
  isMine: boolean;
}

export interface ChatMessageResponse extends ChatMessage {
  chatRoomId: number;
}

export interface ChatRoomMessagesResponse {
  content: ChatMessage[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface StudentMemberResponse {
  id: number;
  nickname: string;
  courseName: string;
  profileImage: string;
}
