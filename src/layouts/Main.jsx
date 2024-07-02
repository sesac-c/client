import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return <>
        <main className="main-container">
            <div>
                <Outlet />
            </div>
        </main>
    </>
}

export default MainLayout;