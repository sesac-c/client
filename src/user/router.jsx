import { lazy, Suspense } from 'react';
import { ALL_PATH, CAMPUS_CHILDREN_PATH, CAMPUS_PATH, GROUP_CHILDREN_PATH, GROUP_PATH } from '@/common/constants';
import CampusLayout from './layouts/Campus';
import AllLayout from './layouts/All';
import GroupLayout from './layouts/Group';

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
    element: <GroupLayout />,
    children: [
      {
        path: GROUP_CHILDREN_PATH.courses,
        element: <GroupCoursePage />
      },
      {
        path: GROUP_CHILDREN_PATH.runningmate,
        element: <GroupRunningMatePage />
      }
    ]
  }
];

export default userRoutes;
