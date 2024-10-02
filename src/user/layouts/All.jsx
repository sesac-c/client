import { Outlet } from 'react-router-dom';

import Header from '../components/common/layout/Header.jsx';

import { ALL } from '../../common/constants';
import { Suspense } from 'react';
import PageLoadingSpinner from '../../common/components/common/UI/PageLoadingSpinner';

const AllLayout = () => {
  return (
    <div id='wrap'>
      <Header currentLocation={ALL} />
      <main id='main'>
        <Suspense fallback={<PageLoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default AllLayout;
