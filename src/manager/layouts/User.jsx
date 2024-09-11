import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div id='user-container'>
      <Outlet />
    </div>
  );
};

export default UserLayout;
