import { Outlet } from 'react-router-dom';
import '../assets/styles/main.css';

const RootLayout = ({ children }) => {
  return (
    <>
      <Outlet />
      {children}
    </>
  );
};
export default RootLayout;
