import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { DASHBOARD_PATH } from '../common/constants';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('./pages/home'));
// export const BlogPage = lazy(() => import('./pages/blog'));
// export const UserPage = lazy(() => import('./pages/user'));
// export const SignInPage = lazy(() => import('./pages/sign-in'));
// export const ProductsPage = lazy(() => import('./pages/products'));
// export const Page404 = lazy(() => import('./pages/page-not-found'));

// ----------------------------------------------------------------------

// {
//   path: '404',
//   element: <Page404 />
// },
// {
//   path: '*',
//   element: <Navigate to='/404' replace />
// }
const managerRoutes = [
  {
    path: DASHBOARD_PATH,
    element: <HomePage />
  }
  // { path: 'user', element: <UserPage /> },
  // { path: 'products', element: <ProductsPage /> },
  // { path: 'blog', element: <BlogPage /> }
];

export default managerRoutes;
