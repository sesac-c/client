import { lazy, Suspense } from 'react';
import { CAMPUS_CHILDREN_PATH, CAMPUS_PATH } from '../common/constants';
import CampusLayout from './layouts/Campus.jsx';

// ----------------------------------------------------------------------

export const CampusNoticeListPage = lazy(() => import('./pages/Campus/CampusNoticeList.jsx'));
export const CampusPostDetailPage = lazy(() => import('./pages/Campus/CampusPostDetail.jsx'));
export const CampusPostListPage = lazy(() => import('./pages/Campus/CampusPostList.jsx'));
export const SearchCampusPostPage = lazy(() => import('./pages/Campus/SearchCampusPost.jsx'));

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
        path: CAMPUS_CHILDREN_PATH.search,
        element: <SearchCampusPostPage />
      }
    ]
  }
];

export default userRoutes;
