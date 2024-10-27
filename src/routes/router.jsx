import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';

import { useAuth } from '@/hooks/auth/useAuth';
import userRoutes from './userRouter';
import accountRoutes from './accountRouter';
import profileRoutes from './profileRouter';

import UserRootLayout from '@/layouts/UserRoot';
import PageLoadingSpinner from '@/components/common/UI/PageLoadingSpinner';

import { MANAGER_ROLE, USER_ROLE } from '@/constants';
import { CAMPUS_POST_LIST_PATH, LOGIN_PATH, MANAGER_PATH, MANAGER_USER_PATH } from '@/routes/paths';
import ManagerRootLayout from '@/layouts/ManagerRoot';
import managerRoutes from '@/routes/managerRouter';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthorized, isLoading } = useAuth(requiredRole);
  if (isLoading) {
    return <PageLoadingSpinner />;
  }
  if (!isAuthorized) {
    return <Navigate to={LOGIN_PATH} />;
  }
  return children;
};

const router = createBrowserRouter([
  ...accountRoutes,
  ...profileRoutes,
  // 일반 사용자
  {
    path: '',
    element: (
      <ProtectedRoute requiredRole={USER_ROLE}>
        <UserRootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        loader: () => redirect(CAMPUS_POST_LIST_PATH)
      },
      ...userRoutes
    ]
  },
  // 매니저 사용자
  {
    path: MANAGER_PATH,
    element: (
      <ProtectedRoute requiredRole={MANAGER_ROLE}>
        <ManagerRootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        loader: () => redirect(MANAGER_USER_PATH)
      },
      ...managerRoutes
    ]
  }
]);

export default router;
