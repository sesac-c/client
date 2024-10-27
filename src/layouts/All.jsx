import { Outlet } from 'react-router-dom';

import Header from '@/components/user/layout/Header';

import { ALL } from '@/routes/paths';
import { Suspense } from 'react';
import PageLoadingSpinner from '@/components/common/UI/PageLoadingSpinner';

const AllLayout = () => {
  return (
    <div id='wrap'>
      <Header currentLocation={ALL} />
      <main id='main'>
          <Outlet />
      </main>
    </div>
  );
};

export default AllLayout;
