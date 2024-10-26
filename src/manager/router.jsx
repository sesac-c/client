import { lazy, Suspense } from 'react';
import {
  MANAGER_CAMPUS_PATH,
  MANAGER_USER_PATH,
  MANAGER_FEEDS_PATH,
  MANAGER_COURSE_PATH,
  MANAGER_RUNNINGMATE_PATH,
  MANAGER_RESTAURANT_PATH
} from '../common/constants';
import { MANAGER_FEEDS_CHILDREN_PATH, MANAGER_RUNNINGMATE_CHILDREN_PATH } from '../common/constants';
export const UserListPage = lazy(() => import('./pages/User/UserList'));
export const CampusListPage = lazy(() => import('./pages/Campus/CampusList'));
export const CourseListPage = lazy(() => import('./pages/Course/CourseList'));
export const RunningmateListPage = lazy(() => import('./pages/Runningmate/RunningmateList'));
export const ActivityReportListPage = lazy(() => import('./pages/Runningmate/ActivityReport/ActivityReportList'));
export const CampusPostListPage = lazy(() => import('./pages/Feed/Post/CampusPostList'));
export const AllPostListPage = lazy(() => import('./pages/Feed/Post/AllPostList'));
export const AllNoticeListPage = lazy(() => import('./pages/Feed/Notice/AllNoticeList'));
export const GroupNoticeListPage = lazy(() => import('./pages/Feed/Notice/GroupNoticeList'));
export const RestaurantListPage = lazy(() => import('./pages/Restaurant/RestaurantList'));
// ----------------------------------------------------------------------

const managerRoutes = [
  // 사용자 관리
  {
    path: MANAGER_USER_PATH,
    children: [
      {
        index: true,
        element: <UserListPage />
      }
    ]
  },

  // 피드 관리
  {
    path: MANAGER_FEEDS_PATH,
    children: [
      // 게시글 관리
      {
        path: MANAGER_FEEDS_CHILDREN_PATH.campusPost,
        element: <CampusPostListPage />
      },
      {
        path: MANAGER_FEEDS_CHILDREN_PATH.allPost,
        element: <AllPostListPage />
      },
      // 공지 관리
      {
        path: MANAGER_FEEDS_CHILDREN_PATH.allNotice,
        element: <AllNoticeListPage />
      },
      {
        path: MANAGER_FEEDS_CHILDREN_PATH.groupNotice,
        element: <GroupNoticeListPage />
      }
    ]
  },

  // 캠퍼스 관리
  {
    path: MANAGER_CAMPUS_PATH,
    children: [
      {
        index: true,
        element: <CampusListPage />
      }
    ]
  },

  // 강의 관리
  {
    path: MANAGER_COURSE_PATH,
    children: [
      {
        index: true,
        element: <CourseListPage />
      }
    ]
  },

  // 식당 관리
  {
    path: MANAGER_RESTAURANT_PATH,
    children: [
      {
        index: true,
        element: <RestaurantListPage />
      }
    ]
  },

  // 그룹 관리
  {
    path: MANAGER_RUNNINGMATE_PATH,
    children: [
      // 그룹 관리
      {
        index: true,
        element: <RunningmateListPage />
      },
      // 활동보고서 관리
      {
        path: MANAGER_RUNNINGMATE_CHILDREN_PATH.report,
        element: <ActivityReportListPage />
      }
    ]
  }
];

export default managerRoutes;
