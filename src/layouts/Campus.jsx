import { Outlet } from 'react-router-dom';

import Header from '@/components/user/layout/Header'
import PageLoadingSpinner from '@/components/common/UI/PageLoadingSpinner';
import { CAMPUS } from '@/routes/paths';

const CampusLayout = () => {
  return (
    <div id='wrap'>
      <Header currentLocation={CAMPUS} />
      <main id='main'>
          <Outlet />
      </main>
    </div>
  );
};

export default CampusLayout;
