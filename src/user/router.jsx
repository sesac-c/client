import { lazy } from 'react';
import {
  ALL_PATH,
  CAMPUS_CHILDREN_PATH,
  CAMPUS_PATH,
  GROUP_CHILDREN_PATH,
  COURSES_CHILDREN_PATH,
  RUNNINGMATE_CHILDREN_PATH,
  GROUP_PATH
} from '@/common/constants';
import CampusLayout from './layouts/Campus';
import AllLayout from './layouts/All';
import GroupRootLayout from './layouts/Group';

// ----------------------------------------------------------------------

export const CampusNoticeListPage = lazy(() => import('./pages/Campus/CampusNoticeList.jsx'));
export const CampusNoticeDetailPage = lazy(() => import('./pages/Campus/CampusNoticeDetail.jsx'));
export const CampusPostDetailPage = lazy(() => import('./pages/Campus/CampusPostDetail.jsx'));
export const CampusPostListPage = lazy(() => import('./pages/Campus/CampusPostList.jsx'));
export const SearchCampusPostPage = lazy(() => import('./pages/Campus/SearchCampusPost.jsx'));

// ----------------------------------------------------------------------

export const AllPostDetailPage = lazy(() => import('./pages/All/AllPostDetail.jsx'));
export const AllPostListPage = lazy(() => import('./pages/All/AllPostList.jsx'));
export const SearchAllPostPage = lazy(() => import('./pages/All/SearchAllPost.jsx'));

// ----------------------------------------------------------------------
export const GroupCoursePage = lazy(() => import('./pages/Group/GroupCourse'));
export const GroupRunningMatePage = lazy(() => import('./pages/Group/GroupRunningMate'));

export const RestaurantGridContainer = lazy(() => import('./components/group/restaurant/RestaurantGridContainer'));
export const RestaurantDetailPage = lazy(() => import('./pages/Group/RestaurantDetail'));
export const ActivityReportDetailPage = lazy(() => import('@/user/components/group/ActivityReportDetail'));
export const ActivityReportWritePage = lazy(() => import('@/user/components/group/ActivityReportWrite'));

// ----------------------------------------------------------------------

const userRoutes = [
  {
    path: CAMPUS_PATH,
    element: <CampusLayout />,
    children: [
      {
        path: `${CAMPUS_CHILDREN_PATH.postList}/:postId`,
        element: <CampusPostDetailPage />
      },
      {
        path: CAMPUS_CHILDREN_PATH.postList,
        element: <CampusPostListPage />
      },
      {
        path: CAMPUS_CHILDREN_PATH.noticeList,
        element: <CampusNoticeListPage />
      },
      {
        path: `${CAMPUS_CHILDREN_PATH.noticeList}/:noticeId`,
        element: <CampusNoticeDetailPage />
      },
      {
        path: CAMPUS_CHILDREN_PATH.search,
        element: <SearchCampusPostPage />
      }
    ]
  },
  {
    path: ALL_PATH,
    element: <AllLayout />,
    children: [
      {
        path: `${CAMPUS_CHILDREN_PATH.postList}/:postId`,
        element: <AllPostDetailPage />
      },
      {
        path: CAMPUS_CHILDREN_PATH.postList,
        element: <AllPostListPage />
      },
      {
        path: CAMPUS_CHILDREN_PATH.search,
        element: <SearchAllPostPage />
      }
    ]
  },
  {
    path: GROUP_PATH,
    element: <GroupRootLayout />,
    children: [
      {
        path: `${GROUP_CHILDREN_PATH.courses}/${COURSES_CHILDREN_PATH.notices}`,
        element: <GroupCoursePage path={COURSES_CHILDREN_PATH.notices} />
      },
      {
        path: `${GROUP_CHILDREN_PATH.courses}/${COURSES_CHILDREN_PATH.notices}/:noticeId`,
        element: <CampusNoticeDetailPage />
      },
      {
        path: `${GROUP_CHILDREN_PATH.courses}/${COURSES_CHILDREN_PATH.restaurants}`,
        element: <GroupCoursePage path={COURSES_CHILDREN_PATH.restaurants} />,
        children: [
          {
            index: true,
            element: <RestaurantGridContainer restaurantType='campus' />
          },
          {
            path: ':restaurantId',
            element: <RestaurantDetailPage restaurantType='campus' />
          }
        ]
      },
      {
        path: `${GROUP_CHILDREN_PATH.runningmate}/${RUNNINGMATE_CHILDREN_PATH.reports}`,
        element: <GroupRunningMatePage path={RUNNINGMATE_CHILDREN_PATH.reports} />
      },
      {
        path: `${GROUP_CHILDREN_PATH.runningmate}/${RUNNINGMATE_CHILDREN_PATH.reports}/write`,
        element: <ActivityReportWritePage />
      },
      {
        path: `${GROUP_CHILDREN_PATH.runningmate}/${RUNNINGMATE_CHILDREN_PATH.reports}/:reportId`,
        element: <ActivityReportDetailPage />
      },
      {
        path: `${GROUP_CHILDREN_PATH.runningmate}/${RUNNINGMATE_CHILDREN_PATH.restaurants}`,
        element: <GroupRunningMatePage path={RUNNINGMATE_CHILDREN_PATH.restaurants} />,
        children: [
          {
            index: true,
            element: <RestaurantGridContainer restaurantType='runningmate' />
          },
          {
            path: ':restaurantId',
            element: <RestaurantDetailPage restaurantType='runningmate' />
          }
        ]
      }
    ]
  }
];

export default userRoutes;
