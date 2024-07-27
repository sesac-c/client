import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <main id='main' className='h-full w-full'>
        <div className=''>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
