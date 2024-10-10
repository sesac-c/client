import { Outlet } from 'react-router-dom';

import Header from '../components/common/layout/Header.jsx';

import { GROUP } from '@/common/constants';
import { Suspense } from 'react';
import PageLoadingSpinner from '@/common/components/common/UI/PageLoadingSpinner';

const GroupLayout = () => {
  return (
    <div id='wrap'>
      <Header currentLocation={GROUP} />
      <main id='main'>
        <Suspense fallback={<PageLoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default GroupLayout;
