import { lazy, Suspense } from 'react';
import { DASHBOARD_PATH } from '../common/constants';
import DashBoardLayout from './layouts/DashBoard';

// ----------------------------------------------------------------------

export const DashBoardPage = lazy(() => import('./pages/DashBoard/DashBoard.jsx'));

// ----------------------------------------------------------------------

const managerRoutes = [
  {
    path: DASHBOARD_PATH,
    element: (
      <DashBoardLayout>
        <Suspense fallback={<p>잠시만여,,</p>}></Suspense>
      </DashBoardLayout>
    ),
    children: [
      {
        index: true,
        element: <DashBoardPage />
      }
    ]
  }
];

export default managerRoutes;
