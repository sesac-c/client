import LoginPage from '@/pages/Accounts/Login';
import SignupPage from '@/pages/Accounts/Signup';
import FindPasswordPage from '@/pages/Accounts/FindPassword';
import ResetPasswordPage, { loader as resetPasswordLoader } from '@/pages/Accounts/ResetPassword';
import ErrorPage from '@/pages/Error/Error';

import { ACCOUNTS_PATH, ACCOUNT_CHILDREN_PATH } from '@/routes/paths';

const accountRoutes = [
  {
    id: 'accounts',
    path: ACCOUNTS_PATH,
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ErrorPage errorState={404}/>
      },
      {
        path: ACCOUNT_CHILDREN_PATH.login,
        element: null
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
    path: `${ACCOUNTS_PATH}/${ACCOUNT_CHILDREN_PATH.resetPassword}/:uuid`,
    errorElement: <ErrorPage />,
    element: <ResetPasswordPage />,
    loader: resetPasswordLoader
  }
];
export default accountRoutes;
