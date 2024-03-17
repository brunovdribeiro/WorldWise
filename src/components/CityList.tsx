import style from './CityList.module.css';
import { CityModel } from "../App.tsx";
import Spinner from "./Spinner.tsx";
import CityItem from "./CityItem.tsx";
import { useMemo } from "react";
import Message from "./Message.tsx";

type CityListProps = {
    cities: CityModel[],
    isLoading: boolean
}

export const CityList = (props: CityListProps) => {
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