import { Outlet } from 'react-router-dom';
import '../styles/main.css';

const UserRootLayout = ({ children }) => {
  return (
    <>
      <Outlet />
      {children}
    </>
  );
};
export default UserRootLayout;
