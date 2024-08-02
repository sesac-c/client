import { Outlet } from 'react-router-dom';

const RootLayout = ({ children }) => {
    return <div className="root-container">
        <Outlet />
        {children}
    </div>
  );
};

export default RootLayout;
