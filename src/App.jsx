import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import RootLayout from './layouts/Root.jsx';
import AccountsLayout from './layouts/Accounts.jsx';
import MainLayout from './layouts/Main.jsx';
import LoginPage from './pages/Accounts/Login.jsx';
import ErrorPage from './pages/Error/Error.jsx';


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
      {
        path: '/accounts',
        element: <AccountsLayout/>,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'login',
            element: <LoginPage/>
          }
          // ,
          // {
          //   path: 'signup',
          //   element:
          // }
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}
export default App;
