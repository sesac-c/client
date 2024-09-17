import { lazy, Suspense } from 'react';
import {
  MANAGER_CAMPUS_PATH,
  MANAGER_USER_PATH,
  MANAGER_FEEDS_PATH,
  MANAGER_COURSE_PATH,
  MANAGER_RUNNINGMATE_PATH
} from '../common/constants';
import { MANAGER_FEEDS_CHILDREN_PATH, MANAGER_RUNNINGMATE_CHILDREN_PATH } from '../common/constants';

import UserListPage from './pages/User/UserList';
import CampusListPage from './pages/Campus/CampusList';
import CourseListPage from './pages/Course/CourseList';
import RunningmateListPage from './pages/Runningmate/RunningmateList';
import ActivityReportListPage from './pages/Runningmate/ActivityReport/ActivityReportList';
import CampusPostListPage from './pages/Feed/Post/CampusPostList';
import AllPostListPage from './pages/Feed/Post/AllPostList';
import AllNoticeListPage from './pages/Feed/Notice/AllNoticeList';
import GroupNoticeListPage from './pages/Feed/Notice/GroupNoticeList';
// ----------------------------------------------------------------------

// TODO: 나중에 lazy loading으로 변경하기
// export const UserListPage = lazy(() => import('./pages/User/UserList.jsx'));
// export const CampusListPage = lazy(() => import('./pages/Campus/CampusList'));

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

  // 러닝메이트 관리
  {
    path: MANAGER_RUNNINGMATE_PATH,
    children: [
      // 러닝메이트 관리
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
