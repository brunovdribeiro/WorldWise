import {NavLink} from "react-router-dom";
import style from "./PageNav.module.css";
import Logo from "./Logo.tsx";

export const PageNav = () => {

    return (
        <div className={style.nav}>
            <Logo/>
            <ul>
                <li>
                    <NavLink to="/products">Products</NavLink>
                </li>
                <li>
                    <NavLink to="/pricing">Printing</NavLink>
                </li>

                <li>
                    <NavLink to="/login" className={style.ctaLink}>Login</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default PageNav;