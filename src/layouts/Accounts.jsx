import { Outlet } from 'react-router-dom';

const AccountsLayout = () => {
  return (
    <main id='main' className='flex h-full w-full items-center justify-center'>
      <div className='h-3/5 w-full'>
        <Outlet />
      </div>
    </main>
  );
};

export default AccountsLayout;
