import { Outlet } from 'react-router-dom';

import Header from '../components/common/layout/Header.jsx';

import { CAMPUS } from '../constants/index';

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
