import { createBrowserRouter, redirect } from 'react-router-dom';

import { useAuth } from './common/hooks/auth/useAuth';
import userRoutes from './user/router';

import LoginPage from './common/pages/Accounts/Login';
import SignupPage from './common/pages/Accounts/Signup';
import FindPasswordPage from './common/pages/Accounts/FindPassword';
import ErrorPage from './common/pages/Error/Error';

import UserRootLayout from './user/layouts/UserRootLayout';
import {
  ACCOUNTS_PATH,
  ACCOUNT_CHILDREN_PATH,
  CAMPUS_POST_LIST_PATH,
  DASHBOARD_PATH,
  MANAGER_PATH,
  MANAGER_ROLE,
  USER_PATH,
  USER_ROLE
} from './common/constants/index';
import managerRoutes from './manager/router';
import ManagerRootLayout from './manager/layouts/ManagerRootLayout';

const ProtectedRoute = ({ children, requiredRole }) => {
  // 접근 권한이 필요한 컴포넌트 미들웨어
  const isAuthorized = useAuth(requiredRole);
  return isAuthorized ? children : <ErrorPage errorState={403} />;
};

const router = createBrowserRouter([
  {
    // TODO: 로그인 상태면 접근 못하도록
    id: 'accounts',
    path: ACCOUNTS_PATH,
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ErrorPage errorState={404} />
      },
      {
        path: ACCOUNT_CHILDREN_PATH.login
      },
      {
        path: ACCOUNT_CHILDREN_PATH.signup,
        element: <SignupPage />
      },
      {
        path: ACCOUNT_CHILDREN_PATH.findPassword,
        element: <FindPasswordPage />
      }
    ]
  },
  {
    path: MANAGER_PATH,
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute requiredRole={MANAGER_ROLE}>
        <ManagerRootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        loader: () => redirect(DASHBOARD_PATH)
      },
      ...managerRoutes
    ]
  },
  {
    path: USER_PATH,
    errorElement: <ErrorPage />,
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
  }
]);

export default router;
