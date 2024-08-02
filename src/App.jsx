import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import RootLayout from './layouts/Root.jsx';
import MainLayout from './layouts/Main.jsx';
import LoginPage from './pages/Accounts/Login.jsx';
import ErrorPage from './pages/Error/Error.jsx';
import SignupPage from "./pages/Accounts/Signup.jsx";
import FindPasswordPage from "./pages/Accounts/FindPassword.jsx";


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
        element: <MainLayout />,

        children: [
          {
            index: true,
            //TODO: test 삭제
            loader: () => redirect('/accounts/login')
          },
        ]
      },
      // OAuth Layout
      // TODO: login시 접근 못하도록 설정.
      {
        path: '/accounts',
        element: <ErrorPage errorState={404} />
      },
      {
        path: '/accounts',
        element: <LoginPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'login',
          },
          {
            path: 'signup',
            element: <SignupPage />
          },
          {
            path: 'find/password',
            element: <FindPasswordPage />
          },
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}
export default App;
