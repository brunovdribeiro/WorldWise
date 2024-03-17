import style from './CityList.module.css';
import { CityModel } from "../App.tsx";
import Spinner from "./Spinner.tsx";

type CityListProps = {
    cities: CityModel[],
    isLoading: boolean
}

export const CityList = (props: CityListProps) => {
    const loader = <Spinner />
    const cities = <ul className={style.cityList}>
        {props.cities.map(city => <li>{city.cityName}</li>)}
    </ul>

    return props.isLoading ? loader : cities
};

export default CityList;