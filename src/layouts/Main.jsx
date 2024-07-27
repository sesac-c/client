import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return <>
        <main id="main" className="w-full h-full">
            <div className="">
                <Outlet />
            </div>
        </main>
    </>
}

export default MainLayout;