import { Outlet } from 'react-router-dom';

const RootLayout = ({ children }) => {
    return <>
        <Outlet />
        {children}
    </>
}

export default RootLayout;
