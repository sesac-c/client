import { useRouteError } from 'react-router-dom';

import ErrorLayout from '../../layouts/Error.jsx';
import MascotImage from '../../components/common/layout/MascotImage.jsx';
import Logo from '../../components/common/layout/Logo.jsx';

const ErrorPage = ({ errorState }) => {
  const error = useRouteError();

  // default
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

  const errorMascotSize = 'w-3/12 h-[30rem]';
  const contentContainerSize = 'w-2/5 h-[30rem]';
  const contentSize = 'w-5/6 h-full';
  const detailSize = 'w-full h-[50%]';

  return (
    <ErrorLayout>
      <div className='container mx-auto flex h-full items-center justify-center'>
        <div className={`hidden xl:flex xl:justify-end ${errorMascotSize}`}>
          <MascotImage type='error' />
        </div>
        <div className={`flex items-center justify-center ${contentContainerSize}`}>
          <div className={`flex flex-col items-center justify-between pb-20 ${contentSize}`}>
            <div className='flex w-full flex-col items-center'>
              <Logo to='/' />
              <h1 className='w-full text-center text-2xl font-extrabold text-primary'>{title}</h1>
            </div>
            <div className={`flex flex-col items-stretch justify-between ${detailSize}`}>{message}</div>
          </div>
        </div>
      </div>
    </ErrorLayout>
  );
};

export default ErrorPage;
