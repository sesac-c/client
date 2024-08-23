import { Outlet } from 'react-router-dom';
import ErrorPage from '../common/pages/Error/Error';
import useAuthStore from '../common/stores/authStore';
import { setupAuthInterceptor, setupAxiosDefaults } from '../common/services/axios/setupAuth';

setupAxiosDefaults();
setupAuthInterceptor();

const Example = () => <p>Hello manager!</p>;

const ManagerLayout = () => {
  const { refreshAccessToken } = useAuthStore();

  useEffect(() => {
    const initializeApp = async () => {
      console.log('====================manager앱 시작으로 토큰 갱신 시도');
      await refreshAccessToken(); // 앱 시작 시 토큰 갱신 시도
      // axios 설정을 앱 시작 시 한 번만 실행하도록 이동
      setupAxiosDefaults();
      setupAuthInterceptor();
    };

    initializeApp(); // 비동기 함수를 호출합니다.
  }, [refreshAccessToken]);

  return (
    <div className='manager-layout'>
      <Outlet />
    </div>
  );
};

const managerRoutes = [
  {
    path: '',
    element: <ManagerLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Example />
      }
    ]
  }
];

export default managerRoutes;
