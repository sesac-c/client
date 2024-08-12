import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/Root.jsx';
import LoginPage from './pages/Accounts/Login.jsx';
import ErrorPage from './pages/Error/Error.jsx';
import SignupPage from './pages/Accounts/Signup.jsx';
import FindPasswordPage from './pages/Accounts/FindPassword.jsx';
import CampusLayout from './layouts/Campus.jsx';
import CampusPostListPage from './pages/Campus/CampusPostList.jsx';
import CampusNoticeListPage from './pages/Campus/CampusNoticeList.jsx';
import SearchCampusPostPage from './pages/Campus/SearchCampusPost.jsx';
import { ACCOUNTS_PATH, ACCOUNT_CHILDREN_PATH, CAMPUS_PATH, CAMPUS_CHILDREN_PATH } from './constants/routes.js';
import AccountsLayout from './layouts/Accounts.jsx';

const router = createBrowserRouter([
  {
    // default page layout
    id: 'root',
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Main Layout
      {
        path: '',
        children: [
          {
            index: true,
            //TODO: test 삭제
            loader: () => redirect('/feed/campus/post/list')
          },
          {
            path: CAMPUS_PATH,
            element: <CampusLayout />,
            children: [
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
        ]
      },
      // OAuth Layout
      // TODO: login시 접근 못하도록 설정.
      {
        path: ACCOUNTS_PATH,
        element: <ErrorPage errorState={404} />
      },
      {
        path: ACCOUNTS_PATH,
        element: <LoginPage />,
        errorElement: <ErrorPage />,
        children: [
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
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
