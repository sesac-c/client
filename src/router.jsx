import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';

import { useAuth } from './common/hooks/auth/useAuth';
import userRoutes from './user/router';

import LoginPage from './common/pages/Accounts/Login';
import SignupPage from './common/pages/Accounts/Signup';
import FindPasswordPage from './common/pages/Accounts/FindPassword';
import ErrorPage from './common/pages/Error/Error';

import UserRootLayout from './user/layouts/UserRoot';
import {
  ACCOUNTS_PATH,
  ACCOUNT_CHILDREN_PATH,
  CAMPUS_POST_LIST_PATH,
  MANAGER_USER_PATH,
  MANAGER_PATH,
  MANAGER_ROLE,
  USER_PATH,
  USER_ROLE,
  LOGIN_PATH,
  PROFILE_PATH,
  USER_SETTING_CHILDREN_PATH,
  USER_SETTING_AND_ARCHIVE_PATH,
  USER_SETTING_AND_ARCHIVE_CHILDREN_PATH,
  USER_ARCHIVE_CHILDREN_PATH
} from './common/constants/index';
import managerRoutes from './manager/router';
import ManagerRootLayout from './manager/layouts/ManagerRoot';
import PageLoadingSpinner from './common/components/common/UI/PageLoadingSpinner';
import ResetPasswordPage, { loader as resetPasswordLoader } from './common/pages/Accounts/ResetPassword';
import ProfilePage, { MyProfilePage, myProfileloader, loader as profileLoader } from './common/pages/Profile/Profile';
import UpdateProfilePage, {
  loader as updateProfileLoader,
  RedirectUpdateProfilePage
} from './common/pages/Settings/UpdateProfile';
import SettingAndArchiveRoot from './common/layouts/SettingAndArchive';
import UpdatePasswordPage from './common/pages/Settings/UpdatePassword';
import AccountInfoPage, { loader as accountInfoLoader } from './common/pages/Settings/AccountInfo';
import RepliesPage from './common/pages/Archives/Replies';
import LikesPage from './common/pages/Archives/Likes';
import AccountDeletionPage from './common/pages/Settings/AccountDeletion';
import ChangeCoursePage, { loader as changeCourseLoader } from './common/pages/Settings/ChangeCourse';

const ProtectedRoute = ({ children, requiredRole }) => {
  // 접근 권한이 필요한 컴포넌트 미들웨어
  const { isAuthorized, isLoading } = useAuth(requiredRole);
  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  if (!isAuthorized) {
    console.log('아직도?');
    return <Navigate to={LOGIN_PATH} />;
  }

  return children;
};

const router = createBrowserRouter([
  {
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
    //todo: 옮기기
    path: PROFILE_PATH + '/:profileId',
    errorElement: <ErrorPage />,
    element: <ProfilePage />,
    loader: profileLoader
  },
  {
    path: PROFILE_PATH,
    element: <MyProfilePage />,
    loader: myProfileloader
  },
  {
    path: USER_SETTING_AND_ARCHIVE_PATH,
    element: <SettingAndArchiveRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: USER_SETTING_AND_ARCHIVE_CHILDREN_PATH.settings,
        children: [
          {
            path: `${USER_SETTING_CHILDREN_PATH.profile}`,
            element: <RedirectUpdateProfilePage />
          },
          {
            path: `${USER_SETTING_CHILDREN_PATH.profile}/:role`,
            element: <UpdateProfilePage />,
            loader: updateProfileLoader
          },
          {
            path: USER_SETTING_CHILDREN_PATH.updatePassword,
            element: <UpdatePasswordPage />
          },
          {
            path: USER_SETTING_CHILDREN_PATH.accountInfo,
            element: <AccountInfoPage />,
            loader: accountInfoLoader
          },
          {
            path: USER_SETTING_CHILDREN_PATH.accountDeletion,
            element: <AccountDeletionPage />
          },
          {
            path: USER_SETTING_CHILDREN_PATH.courseChangeRequest,
            element: <ChangeCoursePage />,
            loader: changeCourseLoader
          }
        ]
      },
      {
        path: USER_SETTING_AND_ARCHIVE_CHILDREN_PATH.archive,
        children: [
          {
            path: USER_ARCHIVE_CHILDREN_PATH.likes,
            element: <LikesPage />
          },
          {
            path: USER_ARCHIVE_CHILDREN_PATH.replies,
            element: <RepliesPage />
          }
        ]
      }
    ]
  },
  {
    path: `${ACCOUNTS_PATH}/${ACCOUNT_CHILDREN_PATH.resetPassword}/:uuid`,
    errorElement: <ErrorPage />,
    element: <ResetPasswordPage />,
    loader: resetPasswordLoader
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
        loader: () => redirect(MANAGER_USER_PATH)
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
