import { Outlet } from "react-router-dom";

const RootLayout = ({ children }) => {
    return <div>
        <Outlet />
        {children && children}
    </div>
}
export default RootLayout;