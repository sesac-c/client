import { lazy, Suspense } from 'react';
import { ALL_PATH, CAMPUS_CHILDREN_PATH, CAMPUS_PATH } from '../common/constants';
import CampusLayout from './layouts/Campus.jsx';
import AllLayout from './layouts/All';

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
  }
];

export default userRoutes;
