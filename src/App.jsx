import router from './router';
import { setUpAxios } from './common/services/axios/setupAuth';
import { RouterProvider } from 'react-router-dom';
import ModalProvider from './common/ModalProvider';

setUpAxios();

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
