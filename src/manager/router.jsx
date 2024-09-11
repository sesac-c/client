import { lazy, Suspense } from 'react';
import { MANAGER_USER_PATH } from '../common/constants';
import UserLayout from './layouts/User';

// ----------------------------------------------------------------------

export const UserListPage = lazy(() => import('./pages/User/UserList.jsx'));

// ----------------------------------------------------------------------

const managerRoutes = [
  {
    path: MANAGER_USER_PATH,
    element: (
      <UserLayout>
        <Suspense fallback={<p>잠시만여,,</p>}></Suspense>
      </UserLayout>
    ),
    children: [
      {
        index: true,
        element: <UserListPage />
      }
    ]
  }
];

export default managerRoutes;
