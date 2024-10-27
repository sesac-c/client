import { RouterProvider } from 'react-router-dom';
import ModalProvider from '@/ModalProvider';

import { setUpAxios } from '@/services/setupAxios';
import router from '@/routes/router';

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
