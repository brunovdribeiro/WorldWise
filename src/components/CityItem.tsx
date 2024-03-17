import { CityModel } from "../App.tsx";
import style from './CityItem.module.css';

const formatDate = (date: string) =>
        new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(new Date(date));

export const CityItem = ({city}: { city: CityModel }) => {
    return (
            <li className={style.cityItem}>
                <span className={style.emoji}>{city.emoji}</span>
                <h3 className={style.name}>{city.cityName}</h3>
                <time className={style.date}>{formatDate(city.date)}</time>
                <button className={style.deleteBtn}>&times;</button>
            </li>
    );
};

export default CityItem;