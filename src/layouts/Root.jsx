import { Outlet } from "react-router-dom";

const RootLayout = ({ children }) => {
    return <div className="w-full h-screen text-gray-basic">
        <Outlet />
        {children}
    </div>
}

export default RootLayout;