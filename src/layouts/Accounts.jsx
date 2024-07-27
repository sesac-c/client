import { Outlet } from "react-router-dom";

const AccountsLayout = () => {
    return (
        <main id="main" className="w-full h-full flex items-center justify-center">
            <div className="w-full h-3/5">
                <Outlet />
            </div>
        </main>
    )
}

export default AccountsLayout;