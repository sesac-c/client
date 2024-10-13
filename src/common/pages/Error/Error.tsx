import React from 'react';
import { useRouteError } from 'react-router-dom';
import ErrorLayout from '../../layouts/Error';
import MascotImage from '../../components/common/layout/MascotImage';
import Logo from '../../components/common/layout/Logo';
import { ErrorPageProps, RouteError, ERROR_MESSAGES, ErrorDetails } from '../../types';

const ErrorPage: React.FC<ErrorPageProps> = ({ errorState }) => {
  const error = useRouteError() as RouteError;

  const getErrorDetails = (): ErrorDetails => {
    const status = error?.status || errorState;
    let title = '페이지 요청 실패';
    let message: React.ReactNode = error?.data?.message || ERROR_MESSAGES.DEFAULT;

    if (status === 500) {
      message = error?.data?.message || ERROR_MESSAGES.DEFAULT;
    } else if (status === 404) {
      message = ERROR_MESSAGES.NOT_FOUND;
      3;
    } else if (status === 401 || status === 403) {
      title = '잘못된 접근';
      message = ERROR_MESSAGES.UNAUTHORIZED;
    }

    return { title, message };
  };

  const { title, message } = getErrorDetails();

  return (
    <ErrorLayout>
      <div className='error-page'>
        <div className='error-page__mascot'>
          <MascotImage type='error' />
        </div>
        <div className='error-page__content'>
          <div className='error-page__content-inner'>
            <div className='error-page__header'>
              <Logo to='/' />
              <h1 className='error-page__title'>{title}</h1>
            </div>
            <div className='error-page__message'>{message}</div>
          </div>
        </div>
      </div>
    </ErrorLayout>
  );
};

export default ErrorPage;
