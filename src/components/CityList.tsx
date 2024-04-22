import style from './CityList.module.css';
import Spinner from "./Spinner.tsx";
import CityItem from "./CityItem.tsx";
import { useMemo } from "react";
import Message from "./Message.tsx";
import { useCities } from '../contexts/CitiesContext.tsx';

export const CityList = () => {
    const props = useCities();

    const loader = useMemo(() => <Spinner />, []);
    const cities = useMemo(() => <ul className={style.cityList}>
        {props.cities.map(city => <CityItem key={city.id} city={city} />)}
    </ul>, [props.cities]);
    const noCities = useMemo(() => <Message message="Add your first city by clicking on a city on the map" />, [])

    if (props.isLoading) return loader;

    if (props.cities.length) return cities;

    return noCities;
};

export default CityList;