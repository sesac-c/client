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

type OnButtonDisabled = (condition: boolean) => void;
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
