import ProfilePage, { loader as profileLoader, MyProfilePage, myProfileLoader } from '@/pages/Profile/Profile';
import UpdatePasswordPage from '@/pages/Settings/UpdatePassword';
import AccountInfoPage, { loader as accountInfoLoader } from '@/pages/Settings/AccountInfo';
import LikesPage from '@/pages/Archives/Likes';
import RepliesPage from '@/pages/Archives/Replies';
import ChangeCoursePage, { loader as changeCourseLoader } from '@/pages/Settings/ChangeCourse';
import AccountDeletionPage from '@/pages/Settings/AccountDeletion';
import UpdateProfilePage, { loader as updateProfileLoader, RedirectUpdateProfilePage } from '@/pages/Settings/UpdateProfile';
import SettingAndArchiveRoot from '@/layouts/SettingAndArchive';
import ErrorPage from '@/pages/Error/Error';

import { PROFILE_PATH, USER_SETTING_AND_ARCHIVE_PATH, USER_SETTING_AND_ARCHIVE_CHILDREN_PATH, USER_SETTING_CHILDREN_PATH, USER_ARCHIVE_CHILDREN_PATH } from '@/routes/paths';

const profileRoutes = [
  {
    path: PROFILE_PATH + '/:profileId',
    errorElement: <ErrorPage />,
    element: <ProfilePage />,
    loader: profileLoader
  },
  {
    path: PROFILE_PATH,
    element: <MyProfilePage />,
    loader: myProfileLoader
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
  }
];

export default profileRoutes;