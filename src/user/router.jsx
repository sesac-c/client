import { CAMPUS_CHILDREN_PATH, CAMPUS_PATH } from '../common/constants';
import CampusLayout from './layouts/Campus.jsx';
import CampusNoticeListPage from './pages/Campus/CampusNoticeList.jsx';
import CampusPostDetailPage from './pages/Campus/CampusPostDetail.jsx';
import CampusPostListPage from './pages/Campus/CampusPostList.jsx';
import SearchCampusPostPage from './pages/Campus/SearchCampusPost.jsx';

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
