import { Outlet } from 'react-router-dom';

const RootLayout = ({ children }) => {
  return (
    <div className='h-screen w-full text-gray-basic'>
      <Outlet />
      {children}
    </div>
  );
};

export default RootLayout;
