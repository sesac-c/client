import UserListPage from '@/pages/manager/User/UserList';
import AllNoticeListPage from '@/pages/manager/Feed/Notice/AllNoticeList';
import GroupNoticeListPage from '@/pages/manager/Feed/Notice/GroupNoticeList';
import CampusPostListPage from '@/pages/manager/Feed/Post/CampusPostList';
import AllPostListPage from '@/pages/manager/Feed/Post/AllPostList';
import CampusListPage from '@/pages/manager/Campus/CampusList';
import CourseListPage from '@/pages/manager/Course/CourseList';
import RestaurantListPage from '@/pages/manager/Restaurant/RestaurantList';
import RunningmateListPage from '@/pages/manager/Runningmate/RunningmateList';
import ActivityReportListPage
  from '@/pages/manager/Runningmate/ActivityReport/ActivityReportList';

import {
  MANAGER_CAMPUS_PATH,
  MANAGER_COURSE_PATH,
  MANAGER_FEEDS_CHILDREN_PATH,
  MANAGER_FEEDS_PATH,
  MANAGER_RESTAURANT_PATH,
  MANAGER_RUNNINGMATE_CHILDREN_PATH,
  MANAGER_RUNNINGMATE_PATH,
  MANAGER_USER_PATH
} from '@/routes/paths';

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