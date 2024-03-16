import Sidebar from "../components/Sidebar.tsx";
import style from './AppLayout.module.css';
import Map from "../components/Map.tsx";

export const AppLayout = () => {
    return (
            <div className={style.app}>
                <Sidebar />
                <Map />
            </div>
    );
};

export default AppLayout;