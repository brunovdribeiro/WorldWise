import { CityModel, useCities } from '../contexts/CitiesContext';
import style from './CityItem.module.css';
import { Link } from "react-router-dom";

const formatDate = (date: string) =>
        new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(new Date(date));

export const CityItem = ({city}: { city: CityModel }) => {
    const {currentCity} = useCities()

    return (
            <li>
                <Link to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`} className={`${style.cityItem} ${city.id === currentCity.id ? style['cityItem--active'] : ''}`}>
                    <span className={style.emoji}>{city.emoji}</span>
                    <h3 className={style.name}>{city.cityName}</h3>
                    <time className={style.date}>{formatDate(city.date)}</time>
                    <button className={style.deleteBtn}>&times;</button>
                </Link>
            </li>
    );
};

export default CityItem;