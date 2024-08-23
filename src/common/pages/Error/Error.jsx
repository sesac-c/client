import { useRouteError } from 'react-router-dom';

import ErrorLayout from '../../layouts/Error.jsx';
import MascotImage from '../../components/common/layout/MascotImage.jsx';
import Logo from '../../components/common/layout/Logo.jsx';

const ErrorPage = ({ errorState }) => {
  const error = useRouteError();

  let title = '페이지 요청 실패';
  let message = '잠시 후에 다시 시도해주세요.';

  if (error?.status === 500) {
    message = error.data.message;
  }

  if (error?.status === 404 || errorState === 404) {
    message = (
      <>
        <div>
          <p>죄송합니다.</p>
          <p>요청하신 페이지를 찾을 수 없습니다.</p>
          <p>&nbsp;</p>
          <p>방문하시려는 페이지의 주소가 잘못 입력되었거나,</p>
          <p>페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.</p>
          <p>&nbsp;</p>
        </div>
        <p>입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.</p>
      </>
    );
  }

  if (error?.status === 401 || errorState === 401 || error?.status === 403 || errorState === 403) {
    title = '잘못된 접근';
    message = (
      <>
        <div className='flex h-3/4 flex-col justify-center text-center'>
          <p>요청하신 페이지를 접근할 수 없습니다.</p>
          <p>&nbsp;</p>
          <p>페이지의 접근 권한이 없거나, 접근할 수 없는 상태입니다.</p>
        </div>
      </>
    );
  }

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
