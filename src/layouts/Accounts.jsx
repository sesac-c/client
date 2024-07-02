import { Outlet } from "react-router-dom";

const AccountsLayout = () => {
    return <>
        <main className="accounts-container">
            <div className="w-full h-3/5">
                <Outlet />
            </div>
        </main>
    </>
}

export default AccountsLayout;