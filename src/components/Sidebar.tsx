import style from './Sidebar.module.css';
import AppNav from "./AppNav.tsx";
import Logo from "./Logo.tsx";
import { Outlet } from "react-router-dom";

export const Sidebar = () => {
    return (
            <div className={style.sidebar}>
                <Logo />
                <AppNav />

                <Outlet />

                <footer className={style.footer}>
                    <p className={style.copyright}>
                        &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
                    </p>
                </footer>
            </div>
    );
};

export default Sidebar;