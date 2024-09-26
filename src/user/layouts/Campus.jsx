import { Outlet } from 'react-router-dom';

import Header from '../components/common/layout/Header.jsx';

import { CAMPUS } from '../../common/constants';
import { Suspense } from 'react';
import PageLoadingSpinner from '../../common/components/common/UI/PageLoadingSpinner';
const CampusLayout = () => {
  return (
    <div id='wrap'>
      <Header currentLocation={CAMPUS} />
      <main id='main'>
        <Suspense fallback={<PageLoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default CampusLayout;
