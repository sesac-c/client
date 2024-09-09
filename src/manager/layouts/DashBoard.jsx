import { Outlet } from 'react-router-dom';

const DashBoardLayout = () => {
  return (
    <div id='wrap'>
      <Outlet />
    </div>
  );
};

export default DashBoardLayout;
