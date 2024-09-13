import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import AccountsLayout from '../../layouts/Accounts';
import MascotImage from '../../components/common/layout/MascotImage';
import LoginForm from '../../components/accounts/LoginForm.jsx';
import useAuthStore from '../../stores/authStore';
import ErrorPage from '../Error/Error';

const LoginPage = () => {
  const { isAuthenticated } = useAuthStore();

  const loginMascotSize = 'w-2/12 h-[25rem]';
  const loginFormSize = 'w-2/5 h-[35rem]';

  if (isAuthenticated) {
    return <ErrorPage errorState={403} />;
  } else {
    return (
      <AccountsLayout>
        <div className='container flex h-full w-full flex-row items-center justify-center gap-5'>
          <div className={`${loginMascotSize} hidden xl:flex xl:justify-end`}>
            <MascotImage type='login' />
          </div>
          <div className={`${loginFormSize} flex items-center justify-center`}>
            <LoginForm />
          </div>
        </div>
        <Outlet />
      </AccountsLayout>
    );
  }
};

export default LoginPage;
