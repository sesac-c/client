import router from './router';
import { setupAxiosDefaults, setupAuthInterceptor } from './common/services/axios/setupAuth';
import { RouterProvider } from 'react-router-dom';
import ModalProvider from './common/ModalProvider';

setupAxiosDefaults();
setupAuthInterceptor();

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ModalProvider />
    </>
  );
}
export default App;

// TODO: lazy loading 구현
