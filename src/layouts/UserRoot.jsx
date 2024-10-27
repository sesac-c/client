import { Outlet } from 'react-router-dom';
import '@/styles/user/main.css';

const UserRootLayout = ({ children }) => {
  return (
    <>
      <Outlet />
      {children}
    </>
  );
};
export default UserRootLayout;
